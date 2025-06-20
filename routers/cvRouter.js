import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  getCvController,
  getCoordonneesController,
  updateCoordonneesController,
  getTitreAccrocheController,
  updateTitreAccrocheController
} from "../controllers/cvController.js";

const cvRouter = express.Router();

cvRouter.get("/", getCvController);
cvRouter.get("/coordonnees", getCoordonneesController);
cvRouter.put("/coordonnees/:id", updateCoordonneesController);
cvRouter.get("/titreAccroche", getTitreAccrocheController);
cvRouter.put("/titreAccroche/:id", updateTitreAccrocheController)

export default cvRouter;
