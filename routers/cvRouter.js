import express from "express"
import verifyToken from "../middleware/verifyToken.js"
import {getCvController} from "../controllers/cvController.js"

const cvRouter = express.Router()

cvRouter.get("/", verifyToken, getCvController)

export default cvRouter