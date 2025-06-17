import User from "../models/User.js";
import bcrypt from "bcrypt"

export async function registerController(req, res) {
    const {username, email, password} = req.body
    if(!username || !email || !password) return res.status(400).json({message: "Missing data"})
    
    try {
        // On vérifie si le user existe déjà
        const user = await User.findOne( {email} )
        if(user) return res.status(400).json({message: "This user already exist"})
    
        // On hash le mot de passe
        const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT))

        //On créé un user
        await User.create({
            username,
            email,
            password: hashedPassword
        })

        // reponse
        res.status(200).json({message: "User enregistrement successful"})
    } catch (e) {
        res.status(500).json({message: `Problem whith register new user : ${e.message}`})
    }
    
}
