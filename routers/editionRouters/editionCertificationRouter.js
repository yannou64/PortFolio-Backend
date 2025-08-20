import express from "express";
import multer from "multer";
import {
  getAllCertifications,
  createCertification,
  deleteCertification,
  getCertification,
  updateCertification,
} from "../../controllers/edtionController/editionCertificationController.js";
import verifyToken from "../../middleware/verifyToken.js";
import authorizedRoles from "../../middleware/authorizedRole.js";

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
cvCertificationRouter.post("/", verifyToken, upload.single("imageUrl"), createCertification);
cvCertificationRouter.delete("/:id", verifyToken, authorizedRoles("admin"), deleteCertification);
cvCertificationRouter.get("/:id", getCertification);
cvCertificationRouter.put("/:id", verifyToken, authorizedRoles("admin"), upload.single("imageUrl"), updateCertification);

export default cvCertificationRouter;
