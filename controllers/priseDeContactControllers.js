import mail from "../utils/mail.js";

export async function sendMessage(req, res) {
  console.log("im here");
  try {
    const { emailContact, message } = req.body;
    // Pas de await pour ne pas avoir un lag avant la redirection vers la page de remerciement
    await mail(emailContact, message);
    return res.status(200).json({ message: "Mail sent" });
  } catch (e) {
    return res.status(500).json({ message: "network error for send a message" });
  }
}
