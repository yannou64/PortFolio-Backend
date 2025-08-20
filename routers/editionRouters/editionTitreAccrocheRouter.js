import express from "express"
import {getTitreAccrocheController, updateTitreAccrocheController} from "../../controllers/cvController/cvTitreAccrocheController.js"
import verifyToken from "../../middleware/verifyToken.js"
import authorizedRoles from "../../middleware/authorizedRole.js"

const cvTitreAccrocheRouter = express.Router()

cvTitreAccrocheRouter.get("/", getTitreAccrocheController)
cvTitreAccrocheRouter.put("/:id", updateTitreAccrocheController)

export default cvTitreAccrocheRouter 