import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export default function verifyToken(req, res, next) {
  // On vérifie que le client possède un token
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: `You are not allowed to access token` });
  }
  // On vérifie la validité du token
  try {
    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: `Session expired please login` });
  }
}
