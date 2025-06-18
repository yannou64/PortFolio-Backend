import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export default function verifyToken(req, res, next) {
    // On vérifie que le client possède un token
    const token = req.cookies.token
    if(!token) return res.status(401).json({message: `You are not allowed to access token : ${req.cookies}`})

    // On vérifie la validité du token
    const decoded = jwt.verify(token, process.env.SECRET)

    // On créé user dans la requête
    req.user = decoded

    //On continu
    next()
}
