import express from "express";
import {
  createTechno,
  getAllTechnos,
  deleteTechno,
  updateTechno,
} from "../../controllers/edtionController/editionTechnoController.js";
import multer from "multer";
import verifyToken from "../../middleware/verifyToken.js";
import authorizedRoles from "../../middleware/authorizedRole.js";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "_" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });
const cvTechnoRouter = express.Router();

cvTechnoRouter.post("/", verifyToken, upload.single("image"), createTechno);
cvTechnoRouter.get("/", getAllTechnos);
cvTechnoRouter.delete("/:id", verifyToken, authorizedRoles("admin"), deleteTechno);
cvTechnoRouter.put("/:id", verifyToken, authorizedRoles("admin"), upload.single("image"), updateTechno);

export default cvTechnoRouter;
