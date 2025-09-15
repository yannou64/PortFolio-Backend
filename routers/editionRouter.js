import express from "express"
import editionTechnoRouter from "./editionRouters/editionTechnoRouter.js";
import editionProjetRouter from "./editionRouters/editionProjetRouter.js";

const editionRouter = express.Router()

editionRouter.use("/technos", editionTechnoRouter);
editionRouter.use("/projets", editionProjetRouter);

export default editionRouter