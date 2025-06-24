import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  getCvController,
  getCoordonneesController,
  updateCoordonneesController,
  getTitreAccrocheController,
  updateTitreAccrocheController,
  createInteretController,
  getInteretsController,
  deleteInteretController,
  getInteretController,
  updateInteretController,
  createLangueController,
  getLanguesController,
  deleteLangueController,
  getLangueController,
  updateLangueController
} from "../controllers/cvController.js";

const cvRouter = express.Router();

cvRouter.get("/", getCvController);
cvRouter.get("/coordonnees", getCoordonneesController);
cvRouter.put("/coordonnees/:id", updateCoordonneesController);
cvRouter.get("/titreAccroche", getTitreAccrocheController);
cvRouter.put("/titreAccroche/:id", updateTitreAccrocheController);
cvRouter.get("/interet/:id", getInteretController);
cvRouter.get("/interets", getInteretsController);
cvRouter.post("/newInteret", createInteretController);
cvRouter.delete("/interet/:id", deleteInteretController);
cvRouter.put("/interet/:id", updateInteretController);
cvRouter.post("/langues", createLangueController);
cvRouter.get("/langues", getLanguesController);
cvRouter.delete("/langue/:id", deleteLangueController);
cvRouter.get("/langue/:id", getLangueController);
cvRouter.put("/langue/:id", updateLangueController)

export default cvRouter;
