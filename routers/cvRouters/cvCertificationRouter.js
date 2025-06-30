import express from "express";

import {getAllCertifications, createCertification, deleteCertification, getCertification, updateCertification} from "../../controllers/cvController/cvCertificationController.js";

const cvCertificationRouter = express.Router();

cvCertificationRouter.get('/', getAllCertifications)
cvCertificationRouter.post('/', createCertification)
cvCertificationRouter.delete('/:id', deleteCertification)
cvCertificationRouter.get('/:id', getCertification)
cvCertificationRouter.put('/:id', updateCertification)

export default cvCertificationRouter