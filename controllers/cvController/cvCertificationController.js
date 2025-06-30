import Certification from "../../models/Certification.js";

export async function getAllCertifications(req, res) {
  try {
    const certifications = await Certification.find();
    res.status(200).json({ message: `success for certifications sending`, data: certifications });
  } catch (e) {
    res.status(500).json({ message: `Error in getAllCertifications : ${e.message}` });
  }
}

export async function createCertification(req, res) {
  const { title, urlImage, categorie, dateObtention, lieu, organisme } = req.body;
  try {
    await Certification.create({
      title,
      urlImage,
      categorie,
      dateObtention,
      lieu,
      organisme,
    });
    res.status(200).json({ message: `Certificat créé success` });
  } catch (e) {
    res.status(500).json({ message: `Error in createCertification : ${e.message}` });
  }
}

export async function deleteCertification(req, res) {
  const { id } = req.params;
  try {
    await Certification.findByIdAndDelete(id);
    res.status(200).json({ message: "delete success" });
  } catch (e) {
    res.status(500).json({ message: `Error in deleteCertificatin: ${e.message}` });
  }
}

export async function getCertification(req, res){
    const {id} = req.params
    try {
        const certification = await Certification.findById(id)
        res.status(200).json({message : `get competence success`, data: certification})
    } catch (e) {
        res.status(500).json({message: `Error in getCertification: ${e.message}`})
    }
}

export async function updateCertification(req, res){
    const {id} = req.params
    const {title, urlImage, categorie, dateObtention, lieu, organisme} = req.body
    try {
        await Certification.findByIdAndUpdate(id, {
            title,
            urlImage,
            categorie,
            dateObtention,
            lieu,
            organisme
        })
        res.status(200).json({message: `Update certification sucess`})
    } catch (e) {
        res.status(500).json({ message: `Error in updateCertification: ${e.message}` });
    }
}
