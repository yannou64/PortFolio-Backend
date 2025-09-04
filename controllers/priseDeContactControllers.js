import mail from "../utils/mail.js"

export async function sendMessage(req, res){
    try {
        const {emailContact, message} = req.body
        // Pas de await pour ne pas avoir un lag avant la redirection vers la page de remerciement
        mail(emailContact, message)
        res.status(200).json({message: "Mail sent"})
    } catch (e) {
        res.status(500).json({message: "network error for send a message"})
    }
    res.status(200).json({message: "alors ?"})
}

