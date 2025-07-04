import express from "express"
import {createTechno, getAllTechnos, deleteTechno, updateTechno} from "../../controllers/cvController/cvTechnoController.js"
import multer from "multer"
import verifyToken from "../../middleware/verifyToken.js"

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/")
    },
    filename: (req, file, cb)=> {
        const uniqueName = Date.now() + "_" + file.originalname
        cb(null, uniqueName)
    }
})
const upload = multer({storage})
const cvTechnoRouter = express.Router()

cvTechnoRouter.post("/", verifyToken, upload.single("logo"), createTechno)
cvTechnoRouter.get("/", getAllTechnos)
cvTechnoRouter.delete("/:id", deleteTechno)
cvTechnoRouter.put("/:id", upload.single("logo"), updateTechno)

export default cvTechnoRouter