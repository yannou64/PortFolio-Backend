import Techno from "../../models/Techno.js";

export async function createTechno(req, res) {
  const { titre, categorie, niveau, alt_img } = req.body;
  console.log(alt_img)
  let logoPath = "";
  if (req.file) logoPath = req.file.path;
  try {
    await Techno.create({
      titre,
      image: logoPath,
      alt_image: alt_img,
      categorie,
      niveau,
    });
    res.status(200).json({ message: `creation de techno success` });
  } catch (e) {
    res.status(500).json({ message: `Erreur dans createTechno : ${e.message}` });
  }
}

export async function getAllTechnos(req, res) {
  try {
    let data = await Techno.find();
    res.status(200).json({ message: `Backend: getAllTechnos success`, data });
  } catch (e) {
    res.status(500).json({ message: `CatchError backend in getAllTechnos : ${e.message}` });
  }
}

export async function deleteTechno(req, res) {
  const { id } = req.params;
  console.log("here");
  try {
    await Techno.findByIdAndDelete(id);
    res.status(200).json({ message: `Backend: deleteTechno success` });
  } catch (e) {
    res.status(500).json({ message: `CatchError backend in deleteTechnos : ${e.message}` });
  }
}

export async function updateTechno(req, res) {
  const { id } = req.params;
  const { niveau, categorie, titre, alt_img } = req.body;
  const updatingTechno = {niveau, categorie, titre, alt_img}
  if(req.file) updatingTechno.image = req.file.path

  try {
    await Techno.findByIdAndUpdate(id, updatingTechno)
    res.status(200).json({ message: `Backend: updateTechno success` });
  } catch (e) {
    res.status(500).json({ message: `CatchError backend in updatetechno : ${e.message}` });
  }
}
