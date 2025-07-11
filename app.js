import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectionBDD from "./config/dbConnecion.js";
import authentificationRouter from "./routers/authentificationRouter.js";
import cvActionRouter from "./routers/cvRouters/cvActionRouter.js";
import cvCompetenceRouter from "./routers/cvRouters/cvCompetenceRouter.js"
import cvCoordonneesRouter from "./routers/cvRouters/cvCoordonneesRouter.js";
import cvExperienceRouter from "./routers/cvRouters/cvExperienceRouter.js";
import cvInteretRouter from "./routers/cvRouters/cvInteretRouter.js";
import cvLangueRouter from "./routers/cvRouters/cvLangueRouter.js";
import cvTechnoRouter from "./routers/cvRouters/cvTechnoRouter.js";
import cvTitreAccrocheRouter from "./routers/cvRouters/cvTitreAccrocheRouter.js";
import cvCertificationRouter from "./routers/cvRouters/cvCertificationRouter.js";
import priseDeContactRouter from "./routers/priseDeContactRouter.js"
import projetRouter from "./routers/portfolioRouters/projetRouter.js";
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
app.use("/api/cv/actions", cvActionRouter);
app.use("/api/cv/certifications", cvCertificationRouter);
app.use("/api/cv/competences", cvCompetenceRouter);
app.use("/api/cv/coordonnees", cvCoordonneesRouter);
app.use("/api/cv/experiences", cvExperienceRouter);
app.use("/api/cv/interets", cvInteretRouter);
app.use("/api/cv/langues", cvLangueRouter);
app.use("/api/cv/technos", cvTechnoRouter);
app.use("/api/cv/titreAccroche", cvTitreAccrocheRouter);
app.use("/api/portfolio/projet", projetRouter)
app.use("/priseDeContact", priseDeContactRouter)

