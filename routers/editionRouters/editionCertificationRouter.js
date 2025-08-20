import express from "express";
import multer from "multer";
import path from "path";
import {
  getAllCertifications,
  createCertification,
  deleteCertification,
  getCertification,
  updateCertification,
} from "../../controllers/edtionController/editionCertificationController.js";

// Configuration de multer pour la récupération et traitement des images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

const cvCertificationRouter = express.Router();

cvCertificationRouter.get("/", getAllCertifications);
cvCertificationRouter.post("/", upload.single("imageUrl"), createCertification);
cvCertificationRouter.delete("/:id", deleteCertification);
cvCertificationRouter.get("/:id", getCertification);
cvCertificationRouter.put("/:id", upload.single("imageUrl"), updateCertification);

export default cvCertificationRouter;
