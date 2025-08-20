import express from "express";
import {
  createCompetence,
  getAllCompetences,
  deleteCompetence,
  getCompetence,
  updateCompetence,
} from "../../controllers/edtionController/editionCompetenceController.js";
import verifyToken from "../../middleware/verifyToken.js";
import authorizedRoles from "../../middleware/authorizedRole.js";

const cvCompetenceRouter = express.Router();

cvCompetenceRouter.post("/", verifyToken, createCompetence);
cvCompetenceRouter.get("/", getAllCompetences);
cvCompetenceRouter.delete("/:id", verifyToken, authorizedRoles("admin"), deleteCompetence);
cvCompetenceRouter.get("/:id", getCompetence);
cvCompetenceRouter.put("/:id", verifyToken, authorizedRoles("admin"), updateCompetence);

export default cvCompetenceRouter;
