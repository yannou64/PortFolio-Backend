import Projet from "../../models/Projet.js";

export async function createProjet(req, res) {
  try {
    const { intitule, synthese, year, technos } = req.body;
    let img = "";
    if (req.file) img = req.file;
    await Projet.create({
      intitule,
      synthese,
      year,
      img: img.path,
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
  const {intitule, year, synthese, technos} = req.body
  console.log(technos)
  const updatedProjet = {intitule, year, synthese, technos: JSON.parse(technos)}
  console.log(req.file)
  if(req.file) updatedProjet.img = req.file.path
  try{
    await Projet.findByIdAndUpdate(id, updatedProjet)
    res.status(200).json({message: `update success`})
  } catch(e) {
    res.status(500).json({message: `Error in updateProjet : ${e.message}`})
  }
}


