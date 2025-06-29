import express from "express"
import {getTitreAccrocheController, updateTitreAccrocheController} from "../../controllers/cvController/cvTitreAccrocheController.js"

const cvTitreAccrocheRouter = express.Router()

cvTitreAccrocheRouter.get("/", getTitreAccrocheController)
cvTitreAccrocheRouter.put("/:id", updateTitreAccrocheController)

export default cvTitreAccrocheRouter 