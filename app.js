import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectionBDD from "./config/dbConnecion.js";
import authentificationRouter from "./routers/authentificationRouter.js";
import priseDeContactRouter from "./routers/priseDeContactRouter.js";
import editionRouter from "./routers/editionRouter.js";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// Connection à la bdd
connectionBDD();

// Production 
// Pour render/heroku/vercel à mettre avant logique protocole/cookies
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

// Middlewares Sécurité
// Sécurité : forcer le https en prod
app.use((req, res, next) => {
  if (process.env.NODE_ENV === "production" && req.header("x-forwarded-proto") !== "https") {
    return res.redirect(`https://${req.header("host")}${req.url}`);
  }
  next();
});

// Sécurité Helmet: Ajout des entêtes de sécurité et du contentSecurityPolicy, attention si j'utilise des CDN il faudra les déclarer
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "default-src": ["'self'"],
      "script-src": ["'self'"],
      "style-src": ["'self'"],
      "img-src": ["'self'", "data:"],
      "font-src": ["'self'", "data:"],
      "connect-src": ["'self'"], // ajoute le domaine du front si le front appelle cette API depuis un autre origin
      "frame-ancestors": ["'self'"],
    },
  })
);

// Sécurtié : CORS Les différentes origin autorisées, avec filtre si n'est pas défini dans .env
const originAuthorise = ["http://localhost:5173", process.env.FRONTEND_ORIGIN].filter(Boolean);
app.use(
  cors({
    origin: originAuthorise,
    credentials: true,
  })
);

// Sécurité : Rate limit
// Limite : max 100 requêtes par IP toutes les 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // 1000 requêtes
  message: "Trop de requêtes, réessayez plus tard.",
});
// On applique le rate limit à toutes les routes
app.use(limiter);


// Lancement du serveur
app.listen(port, () => {
  console.log(`Le serveur est démarré sur http://localhost:${port}`);
});

// santé
app.get("/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});


// middlewares de préparation de la requête
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// routes du projet
app.use("/api/auth", authentificationRouter);
app.use("/api/edition", editionRouter);
app.use("/priseDeContact", priseDeContactRouter);
