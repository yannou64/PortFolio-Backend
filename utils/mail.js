import nodemailer from "nodemailer";

export default async function mail(contacter, message) {
  // Création du transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // Création de l'email
  const email = {
    to: process.env.MAIL_USER,
    from: process.env.MAIL_USER,
    subject: `Message du Portfolio`,
    html: `
            <h2 style="color: red;">Message via portfolio</h2>
            <p><strong>Contenu du message : </strong> ${message}</p>
            <p><strong>Pour recontacter</strong> : ${contacter}</p>
        `,
  };

  // Envoie de l'email
  try {
    const info = await transporter.sendMail(email);
    console.log("Email envoyé :", info);
    return {success: true, info}
  } catch (error) {
    console.error("Erreur de mail :", error);
    return {success: false, error}
  }
}
