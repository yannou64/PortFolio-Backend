import express from "express";
import verifyToken from "../../middleware/verifyToken.js";
import authorizedRoles from "../../middleware/authorizedRole.js";

import {
  createInteretController,
  deleteInteretController,
  getInteretController,
  getInteretsController,
  updateInteretController
} from "../../controllers/cvController/cvInteretController.js";

const cvInteretRouter = express.Router();

cvInteretRouter.get("/:id", getInteretController);
cvInteretRouter.get("/", getInteretsController);
cvInteretRouter.post("/", createInteretController);
cvInteretRouter.delete("/:id", deleteInteretController);
cvInteretRouter.put("/:id", updateInteretController);

export default cvInteretRouter
