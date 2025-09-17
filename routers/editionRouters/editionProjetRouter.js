import express from "express";
import {
  createProjet,
  getAllProjet,
  getProjet,
  deleteProjet,
  updateProjet,
  getProjetsFavoris,
} from "../../controllers/edtionController/editionProjetController.js";
import multer from "multer";
import verifyToken from "../../middleware/verifyToken.js";
import authorizedRoles from "../../middleware/authorizedRole.js";

const projetRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/img_projet/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

projetRouter.post("/", verifyToken, upload.single("image_projet"), createProjet);
projetRouter.get("/", getAllProjet);
projetRouter.get("/favoris", getProjetsFavoris);
projetRouter.get("/:id", getProjet);
projetRouter.delete("/:id", verifyToken, authorizedRoles("admin"), deleteProjet);
projetRouter.put("/:id", verifyToken, authorizedRoles("admin"), upload.single("image_projet"), updateProjet);

export default projetRouter;
