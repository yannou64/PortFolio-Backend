import express from "express"
import editionActionRouter from "./editionRouters/editionActionRouter.js";
import editionCompetenceRouter from "./editionRouters/editionCompetenceRouter.js";
import editionCoordonneesRouter from "./editionRouters/editionCoordonneesRouter.js";
import editionExperienceRouter from "./editionRouters/editionExperienceRouter.js";
import editionInteretRouter from "./editionRouters/editionInteretRouter.js";
import editionLangueRouter from "./editionRouters/editionLangueRouter.js";
import editionTechnoRouter from "./editionRouters/editionTechnoRouter.js";
import editionTitreAccrocheRouter from "./editionRouters/editionTitreAccrocheRouter.js";
import editionCertificationRouter from "./editionRouters/editionCertificationRouter.js";
import editionProjetRouter from "./editionRouters/editionProjetRouter.js";


const editionRouter = express.Router()

editionRouter.use("/actions", editionActionRouter);
editionRouter.use("/certifications", editionCertificationRouter);
editionRouter.use("/competences", editionCompetenceRouter);
editionRouter.use("/coordonnees", editionCoordonneesRouter);
editionRouter.use("/experiences", editionExperienceRouter);
editionRouter.use("/interets", editionInteretRouter);
editionRouter.use("/langues", editionLangueRouter);
editionRouter.use("/technos", editionTechnoRouter);
editionRouter.use("/titreAccroche", editionTitreAccrocheRouter);
editionRouter.use("/projet", editionProjetRouter);

export default editionRouter