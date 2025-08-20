import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectionBDD from "./config/dbConnecion.js";
import authentificationRouter from "./routers/authentificationRouter.js";
import priseDeContactRouter from "./routers/priseDeContactRouter.js";
import editionRouter from "./routers/editionRouter.js";
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
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// routes du projet
app.use("/api/auth", authentificationRouter);
app.use("/api/edition", editionRouter);
app.use("/priseDeContact", priseDeContactRouter);
