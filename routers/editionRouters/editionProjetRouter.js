import express from "express";
import {
  createProjet,
  getAllProjet,
  getProjet,
  deleteProjet,
  updateProjet,
} from "../../controllers/edtionController/editionProjetController.js";
import multer from "multer";

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

projetRouter.post("/", upload.single("img"), createProjet);
projetRouter.get("/", getAllProjet);
projetRouter.get("/:id", getProjet);
projetRouter.delete("/:id", deleteProjet);
projetRouter.put("/:id", upload.single("img"), updateProjet);

export default projetRouter;
