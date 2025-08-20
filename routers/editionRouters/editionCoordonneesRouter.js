import express from "express";
import verifyToken from "../../middleware/verifyToken.js";
import authorizedRoles from "../../middleware/authorizedRole.js";

import {
  getCoordonneesController,
  updateCoordonneesController,
} from "../../controllers/cvController/cvCoordonneesController.js";

const cvCoordonneesRouter = express.Router();

cvCoordonneesRouter.get("/", getCoordonneesController);
cvCoordonneesRouter.put("/:id", updateCoordonneesController);

export default cvCoordonneesRouter