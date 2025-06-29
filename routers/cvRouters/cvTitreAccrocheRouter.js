import express from "express"
import {getTitreAccrocheController, updateTitreAccrocheController} from "../../controllers/cvController/cvTitreAccrocheController.js"
import verifyToken from "../../middleware/verifyToken.js"

const cvTitreAccrocheRouter = express.Router()

cvTitreAccrocheRouter.get("/", getTitreAccrocheController)
cvTitreAccrocheRouter.put("/:id", verifyToken, authorizedRoles("admin"), updateTitreAccrocheController)

export default cvTitreAccrocheRouter 