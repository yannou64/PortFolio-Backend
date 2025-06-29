import express from "express";
import verifyToken from "../../middleware/verifyToken.js";

import {
  createInteretController,
  deleteInteretController,
  getInteretController,
  getInteretsController,
  updateInteretController
} from "../../controllers/cvController/cvInteretController.js";
import authorizedRoles from "../../middleware/authorizedRole.js";

const cvInteretRouter = express.Router();

cvInteretRouter.get("/:id",verifyToken, authorizedRoles("admin"), getInteretController);
cvInteretRouter.get("/", getInteretsController);
cvInteretRouter.post("/", verifyToken, authorizedRoles("admin"), createInteretController);
cvInteretRouter.delete("/:id", verifyToken, authorizedRoles("admin"), deleteInteretController);
cvInteretRouter.put("/:id", verifyToken, authorizedRoles("admin"), updateInteretController);

export default cvInteretRouter
