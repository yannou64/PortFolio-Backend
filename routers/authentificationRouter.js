import express from "express"
import { registerController } from "../controllers/authentificationControllers.js"

const authentificationRouter = express.Router()

authentificationRouter.post("/register", registerController)

export default authentificationRouter