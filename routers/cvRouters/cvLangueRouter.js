import express from "express";

import {
  createLangueController,
  getLanguesController,
  deleteLangueController,
  getLangueController,
  updateLangueController,
} from "../../controllers/cvController/cvLangueController.js";

const cvLangueRouter = express.Router();

cvLangueRouter.post("/", createLangueController);
cvLangueRouter.get("/", getLanguesController);
cvLangueRouter.delete("/:id", deleteLangueController);
cvLangueRouter.get("/:id", getLangueController);
cvLangueRouter.put("/:id", updateLangueController);

export default cvLangueRouter;
