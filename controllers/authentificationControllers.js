import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerController(req, res) {
  const { identifiant, mdp, role} = req.body;
  if (!identifiant || !mdp) return res.status(400).json({ message: "Missing data" });

  try {
    // On vérifie si le user existe déjà
    const user = await User.findOne({ identifiant });
    if (user) return res.status(400).json({ message: "This user already exist" });

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
  const { identifiant, mdp } = req.body;
  if (!identifiant || !mdp) return res.status(400).json({ message: "Missing data" });

  try {
    // On récupère le user dans la bdd et on vérifie que le mot de passe est bon
    const user = await User.findOne({ identifiant });
    if (!user) return res.status(400).json({ message: "bad connection parameters" });

    const isPasswordValid = await bcrypt.compare(mdp, user.mdp);
    if (!isPasswordValid) return res.status(400).json({ message: "bad connection parameters" });

    // Le user existe, on génère un token qu'on lui communique, comme j'utilise jwt je rajoute un payload mais il sera inutile en front avec httponly
    const token = jwt.sign({ identifiant: user.identifiant, role: user.role }, process.env.SECRET, { expiresIn: "1h" });

    // Réponse
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    res.status(200).json({ message: "login success" });
  } catch (e) {
    res.status(500).json({ message: `Problem whith login the user : ${e.message}` });
  }
}

export async function logoutController(req, res) {
  try {
    // Nettoyer le cookie
    res.clearCookie("token");
    // Réponse
    res.status(200).json({ message: "logout successful" });
  } catch (e) {
    res.status(500).json({ message: `Error with logout: ${e}` });
  }
}
