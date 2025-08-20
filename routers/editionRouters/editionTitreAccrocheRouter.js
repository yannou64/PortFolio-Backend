import express from "express";
import {
  getTitreAccrocheController,
  updateTitreAccrocheController,
} from "../../controllers/edtionController/editionTitreAccrocheController.js";
import verifyToken from "../../middleware/verifyToken.js";
import authorizedRoles from "../../middleware/authorizedRole.js";

const cvTitreAccrocheRouter = express.Router();

cvTitreAccrocheRouter.get("/", getTitreAccrocheController);
cvTitreAccrocheRouter.put("/:id", verifyToken, authorizedRoles("admin"), updateTitreAccrocheController);

export default cvTitreAccrocheRouter;
