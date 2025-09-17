import rateLimit from "express-rate-limit";

export const antiBruteForce = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 essais max m
  message: "Trop de tentatives de connexion, réessayez plus tard.",
  standardHeaders: true, // Ajoute les headers RateLimit-* (RFC standard)
  legacyHeaders: false, // Désactive les anciens headers X-RateLimit-*
});

// Retourne déjà un middleware, pas besoin de next.