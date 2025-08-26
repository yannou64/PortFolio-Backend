import Projet from "../../models/Projet.js";

export async function createProjet(req, res) {
  try {
    const { titre, description, technos } = req.body;
    let image = "";
    if (req.file) image = req.file;
    await Projet.create({
      titre,
      description,
      image: image.path,
      technos: JSON.parse(technos)
    });
    res.status(200).json({ message: "good" });
  } catch (e) {
    res.status(500).json({ message: `Error in createProjet in backend : ${e.message}` });
  }
}

export async function getAllProjet(req, res) {
  try {
    const data = await Projet.find();
    res.status(200).json({ message: "all is good for getAllProjet", data });
  } catch (e) {
    res.status(500).json({ message: `Error in getAllProjet : ${e.message}` });
  }
}

export async function getProjet(req, res) {
  try {
    const { id } = req.params;
    const data = await Projet.findById(id);
    if (!data) return res.status(400).json({ message: "Error projet doesn't exist" });
    res.status(200).json({ message: "all is goodi for getProjet", data });
  } catch (e) {
    res.status(500).json({ message: `Error in getProjet : ${e.message}` });
  }
}

export async function deleteProjet(req, res) {
  const { id } = req.params;
  try {
    await Projet.findByIdAndDelete(id);
    res.status(200).json({ message: `projet delete` });
  } catch (e) {
    res.status(500).json({ message: `Error in deleteProjet : ${e.message}` });
  }
}

export async function updateProjet(req, res){
  const {id} = req.params
  const {titre, description, technos} = req.body
  const updatedProjet = {titre, description, technos: JSON.parse(technos)}
  if(req.file) updatedProjet.image = req.file.path
  try{
    await Projet.findByIdAndUpdate(id, updatedProjet)
    res.status(200).json({message: `update success`})
  } catch(e) {
    res.status(500).json({message: `Error in updateProjet : ${e.message}`})
  }
}


