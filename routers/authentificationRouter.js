import express from "express";
import { registerController, loginController, logoutController, checkIfAdminController } from "../controllers/authentificationControllers.js";
import { antiBruteForce } from "../middleware/antiBruteForce.js";

const authentificationRouter = express.Router();

authentificationRouter.post("/register", registerController);
authentificationRouter.post("/login", antiBruteForce, loginController);
authentificationRouter.post("/logout", logoutController);
authentificationRouter.get("/checkIfAdmin", checkIfAdminController)

export default authentificationRouter;
