import express from "express";

import {
  getCoordonneesController,
  updateCoordonneesController,
} from "../../controllers/cvController/cvCoordonneesController.js";

const cvCoordonneesRouter = express.Router();

cvCoordonneesRouter.get("/", getCoordonneesController);
cvCoordonneesRouter.put("/:id", updateCoordonneesController);

export default cvCoordonneesRouter