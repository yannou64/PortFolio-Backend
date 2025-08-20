import express from "express";

import {
  createCompetence,
  getAllCompetences,
  deleteCompetence,
  getCompetence,
  updateCompetence,
} from "../../controllers/edtionController/editionCompetenceController.js";

const cvCompetenceRouter = express.Router();

cvCompetenceRouter.post("/", createCompetence);
cvCompetenceRouter.get("/", getAllCompetences);
cvCompetenceRouter.delete("/:id", deleteCompetence);
cvCompetenceRouter.get("/:id", getCompetence);
cvCompetenceRouter.put("/:id", updateCompetence);

export default cvCompetenceRouter;
