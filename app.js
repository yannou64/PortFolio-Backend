import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectionBDD from "./config/dbConnecion.js";
import authentificationRouter from "./routers/authentificationRouter.js";
import cvRouter from "./routers/cvRouter.js"
import cors from "cors";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Connection à la bdd
connectionBDD();

// Lancement du serveur
app.listen(port, () => {
  console.log(`Le serveur est démarré sur http://localhost:${port}`);
});

// middlewares de préparation de la requête
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// routes du projet
app.use("/auth", authentificationRouter);
app.use("/cv", cvRouter);
