import nodemailer from "nodemailer";

export default async function mail(fromWho, contacter, sujet, message) {
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
    subject: `Message du Portfolio: ${sujet}`,
    html: `
            <h2 style="color: red;">Quelqu'un souhaite me contacter via le portfolio</h2>
            <p><strong>Envoyé par : </strong> ${fromWho}</p>
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
