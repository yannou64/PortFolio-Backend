import express from "express";
import verifyToken from "../../middleware/verifyToken.js";
import authorizedRoles from "../../middleware/authorizedRole.js";
import {
  createLangueController,
  getLanguesController,
  deleteLangueController,
  getLangueController,
  updateLangueController,
} from "../../controllers/edtionController/editionLangueController.js";

const cvLangueRouter = express.Router();

cvLangueRouter.post("/", verifyToken, createLangueController);
cvLangueRouter.get("/", getLanguesController);
cvLangueRouter.delete("/:id", verifyToken, authorizedRoles("admin"), deleteLangueController);
cvLangueRouter.get("/:id", getLangueController);
cvLangueRouter.put("/:id", verifyToken, authorizedRoles("admin"), updateLangueController);

export default cvLangueRouter;
