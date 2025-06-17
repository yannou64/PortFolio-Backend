import express from "express"
import { registerController, loginController } from "../controllers/authentificationControllers.js"

const authentificationRouter = express.Router()

authentificationRouter.post("/register", registerController)
authentificationRouter.post("/login", loginController)

export default authentificationRouter