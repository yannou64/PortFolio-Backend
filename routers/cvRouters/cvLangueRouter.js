import express from "express";
import verifyToken from "../../middleware/verifyToken.js";

import {
  createLangueController,
  getLanguesController,
  deleteLangueController,
  getLangueController,
  updateLangueController,
} from "../../controllers/cvController/cvLangueController.js";

const cvLangueRouter = express.Router();

cvLangueRouter.post("/", verifyToken, authorizedRoles("admin"), createLangueController);
cvLangueRouter.get("/", getLanguesController);
cvLangueRouter.delete("/:id", verifyToken, authorizedRoles("admin"), deleteLangueController);
cvLangueRouter.get("/:id", verifyToken, authorizedRoles("admin"), getLangueController);
cvLangueRouter.put("/:id", verifyToken, authorizedRoles("admin"), updateLangueController);

export default cvLangueRouter;
