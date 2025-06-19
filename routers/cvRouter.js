import express from "express"
import verifyToken from "../middleware/verifyToken.js"
import {getCvController, getCoordonneesController} from "../controllers/cvController.js"

const cvRouter = express.Router()

cvRouter.get("/", getCvController)
cvRouter.get("/coordonnees",getCoordonneesController)

export default cvRouter