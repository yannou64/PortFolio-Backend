import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function registerController(req, res) {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: "Missing data" });

  try {
    // On vérifie si le user existe déjà
    const user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "This user already exist" });

    // On hash le mot de passe
    const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));

    //On créé un user
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // reponse
    res.status(200).json({ message: "User enregistrement successful" });
  } catch (e) {
    res.status(500).json({ message: `Problem whith register new user : ${e.message}` });
  }
}

export async function loginController(req, res) {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: "Missing data" });

  try {
    // On récupère le user dans la bdd et on vérifie que le mot de passe est bon
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "bad connection parameters" });

    const isPasswordValid = bcrypt.compare(password, user.password);
    if (!isPasswordValid) res.status(400).json({ message: "bad connection parameters" });

    // Le user existe, on génère un token qu'on lui communique
    const token = jwt.sign({ username: user.username, email }, process.env.SECRET, { expiresIn: "1h" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV || "production",
      samSite: "strict",
    });

    // Réponse
    res.status(200).json({ message: "User login successfull" });
  } catch (e) {
    res.status(500).json({ message: `Problem whith login the user : ${e.message}` });
  }
}

export async function logoutController(req, res) {
  // vérifier la présence du token
  const token = req.cookies.token;
  if (!token) return res.status(400).json({ message: "No token provided" });

  // Nettoyer le cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    samSite: "strict",
  });

  // Réponse
  res.status(200).json({ message: "logout successful" });
}
