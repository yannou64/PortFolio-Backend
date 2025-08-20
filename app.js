import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectionBDD from "./config/dbConnecion.js";
import authentificationRouter from "./routers/authentificationRouter.js";
import editionActionRouter from "./routers/editionRouters/editionActionRouter.js";
import editionCompetenceRouter from "./routers/editionRouters/editionCompetenceRouter.js";
import editionCoordonneesRouter from "./routers/editionRouters/editionCoordonneesRouter.js";
import editionExperienceRouter from "./routers/editionRouters/editionExperienceRouter.js";
import editionInteretRouter from "./routers/editionRouters/editionInteretRouter.js";
import editionLangueRouter from "./routers/editionRouters/editionLangueRouter.js";
import editionTechnoRouter from "./routers/editionRouters/editionTechnoRouter.js";
import editionTitreAccrocheRouter from "./routers/editionRouters/editionTitreAccrocheRouter.js";
import editionCertificationRouter from "./routers/editionRouters/editionCertificationRouter.js";
import priseDeContactRouter from "./routers/priseDeContactRouter.js";
import projetRouter from "./routers/projetRouter.js";
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Connection à la bdd
connectionBDD();

// Lancement du serveur
app.listen(port, () => {
  console.log(`Le serveur est démarré sur http://localhost:${port}`);
});

// middlewares de préparation de la requête
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// routes du projet
app.use("/api/auth", authentificationRouter);
app.use("/api/edition/actions", editionActionRouter);
app.use("/api/edition/certifications", editionCertificationRouter);
app.use("/api/edition/competences", editionCompetenceRouter);
app.use("/api/edition/coordonnees", editionCoordonneesRouter);
app.use("/api/edition/experiences", editionExperienceRouter);
app.use("/api/edition/interets", editionInteretRouter);
app.use("/api/edition/langues", editionLangueRouter);
app.use("/api/edition/technos", editionTechnoRouter);
app.use("/api/edition/titreAccroche", editionTitreAccrocheRouter);
app.use("/api/portfolio/projet", projetRouter);
app.use("/priseDeContact", priseDeContactRouter);
