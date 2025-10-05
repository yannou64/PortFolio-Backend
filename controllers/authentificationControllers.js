import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mdpValidation from "../utils/mdpValidation.js";

export async function registerController(req, res) {
  let { identifiant, mdp, role } = req.body;

  // validation brut
  if (!identifiant || !mdp || typeof identifiant !== "string" || typeof mdp !== "string")
    return res.status(400).json({ message: "bad register parameters" });

  // Normalisation
  identifiant = identifiant.trim();

  // validation métier
  if (!mdpValidation.test(mdp)) return res.status(400).json({ message: "bad register parameters" });

  // sanitization
  identifiant = identifiant.replace(/[<>]/g, "");

  try {
    // On vérifie si le user existe déjà
    const user = await User.findOne({ identifiant });
    if (user) return res.status(401).json({ message: "This user already exist" });

    // On hash le mot de passe
    const hashedPassword = await bcrypt.hash(mdp, Number(process.env.SALT));

    //On créé un user
    await User.create({
      identifiant,
      mdp: hashedPassword,
      role,
    });

    // reponse
    res.status(200).json({ message: "User enregistrement successful" });
  } catch (e) {
    res.status(500).json({ message: `Problem whith register new user : ${e.message}` });
  }
}

export async function loginController(req, res) {
  let { identifiant, mdp } = req.body;

  // Validation brut
  if (!identifiant || !mdp || typeof identifiant !== "string" || typeof mdp !== "string")
    return res.status(400).json({ message: "bad connection parameter" });

  // Normalisation
  identifiant = identifiant.trim();

  // Validation métier
  if (!mdpValidation.test(mdp)) return res.status(400).json({ message: "bad connection parameters" });

  // Sanitization
  identifiant = identifiant.replace(/[<>$]/g, ""); // supprimer d'éventuelles balise html (pas trés utile, car pour l'instant je ne l'affiche pas côté front) et les opérateur mongo $

  try {
    // On récupère le user dans la bdd et on vérifie que le mot de passe est bon
    const user = await User.findOne({ identifiant }); // L'utilisatin de mongoose avec User.schema rajoute un controle sur les données
    if (!user) return res.status(401).json({ message: "bad connection parameters" });

    const isPasswordValid = await bcrypt.compare(mdp, user.mdp);
    if (!isPasswordValid) return res.status(401).json({ message: "bad connection parameters" });

    // Le user existe, on génère un token qu'on lui communique, comme j'utilise jwt je rajoute un payload mais il sera inutile en front avec httponly
    const token = jwt.sign({ identifiant: user.identifiant, role: user.role }, process.env.SECRET, { expiresIn: "1h" });

    // Réponse
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
      maxAge: 60 * 60 * 1000, // aligné avec la durée de vie du token
    });
    res.status(200).json({ message: "login success" });
  } catch (e) {
    console.error("Login Error: ", e);
    res.status(500).json({ message: `Internal server error` });
  }
}

export async function logoutController(req, res) {
  try {
    // Nettoyer le cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      path: "/",
    });
    // Réponse
    res.status(200).json({ message: "logout successful" });
  } catch (e) {
    res.status(500).json({ message: `Error with logout: ${e}` });
  }
}

export async function checkIfAdminController(req, res) {
  // Comportement côté front attend un status 200 sauf si erreur réseau, avec précision "auth : Boolean"
  try {
    const token = req.cookies.token;
    if (!token) return res.status(200).json({ message: "User not auth", auth: false });

    const decoded = jwt.verify(token, process.env.SECRET);
    return res.status(200).json({ message: "User already auth admin", auth: true });
  } catch (e) {
    if (e.name === "TokenExpiredError") {
      return res.status(200).json({ message: "Session expired", auth: false });
    }
    res.status(500).json({ message: "Error during checkIfAdmin" });
  }
}
