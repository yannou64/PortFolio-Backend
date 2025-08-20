import Langue from "../../models/Langue.js"

export async function createLangueController(req, res) {
  const { langue, level } = req.body;
  try {
    await Langue.create({ langue, level });
    res.status(200).json({ message: "create langue success" });
  } catch (e) {
    res.status(400).json({ message: `Erreur for create langue : ${e.message}` });
  }
}

export async function getLanguesController(req, res) {
  try {
    const data = await Langue.find();
    res.status(200).json({ message: "getLangue success", data });
  } catch (e) {
    res.status(400).json({ message: `Erreur in getLanguesController : ${e.message}` });
  }
}

export async function deleteLangueController(req, res) {
  const { id } = req.params;
  try {
    await Langue.findByIdAndDelete(id);
    res.status(200).json({ message: `deleteLangue success` });
  } catch (e) {
    res.status(400).json({ message: `Error in deleteLangueController : ${e.message}` });
  }
}

export async function getLangueController(req, res){
  const { id } = req.params
  try {
    const langue = await Langue.findById(id)
    res.status(200).json({message: "getLangue success", data: langue})
  } catch (e) {
    res.status(400).json({message: "Error in getLangueController"})
  }
}

export async function updateLangueController(req, res){
  const { id } = req.params
  const { langue, level } = req.body
  console.log(`la langue : ${langue} et le niveau : ${level}`)
  try {
    await Langue.findByIdAndUpdate({_id: id}, {langue, level})
    res.status(200).json({message: "update success"})
  } catch (e) {
    res.status(400).json({message: `Error in updateLangueController : ${e.message}`})
  }
}