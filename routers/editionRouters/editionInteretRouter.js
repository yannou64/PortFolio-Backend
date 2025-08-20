import express from "express";
import verifyToken from "../../middleware/verifyToken.js";
import authorizedRoles from "../../middleware/authorizedRole.js";
import {
  createInteretController,
  deleteInteretController,
  getInteretController,
  getInteretsController,
  updateInteretController,
} from "../../controllers/edtionController/editionInteretController.js";

const cvInteretRouter = express.Router();

cvInteretRouter.get("/:id", getInteretController);
cvInteretRouter.get("/", getInteretsController);
cvInteretRouter.post("/", verifyToken, authorizedRoles("admin"), createInteretController);
cvInteretRouter.delete("/:id", verifyToken, authorizedRoles("admin"), deleteInteretController);
cvInteretRouter.put("/:id", verifyToken, authorizedRoles("admin"), updateInteretController);

export default cvInteretRouter;
