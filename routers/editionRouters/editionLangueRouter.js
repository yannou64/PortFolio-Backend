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

cvLangueRouter.post("/", createLangueController);
cvLangueRouter.get("/", getLanguesController);
cvLangueRouter.delete("/:id", deleteLangueController);
cvLangueRouter.get("/:id", getLangueController);
cvLangueRouter.put("/:id", updateLangueController);

export default cvLangueRouter;
