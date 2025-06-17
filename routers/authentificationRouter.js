import express from "express"
import { registerController, loginController, logoutController } from "../controllers/authentificationControllers.js"

const authentificationRouter = express.Router()

authentificationRouter.post("/register", registerController)
authentificationRouter.post("/login", loginController)
authentificationRouter.post("/logout", logoutController)

export default authentificationRouter