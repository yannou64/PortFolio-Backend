import Interet from "../../models/Interet.js"

export async function createInteretController(req, res) {
  const { interet } = req.body;
  try {
    await Interet.create({ interet });
    res.status(200).json({ message: `new interet create` });
  } catch (e) {
    res.status(400).json({ message: `Error in createInteretController : ${e.message}` });
  }
}

export async function getInteretsController(req, res) {
  try {
    const interets = await Interet.find();
    res.status(200).json({ message: `getInterets success`, data: interets });
  } catch (e) {
    res.status(400).json({ message: `Error in getInteretsController : ${e.message}` });
  }
}

export async function deleteInteretController(req, res) {
  const { id } = req.params;
  try {
    await Interet.findByIdAndDelete(id);
    res.status(200).json({ message: `Delete success` });
  } catch (e) {
    res.status(400).json({ message: `Error in deleteInteretController : ${e.message}` });
  }
}

export async function getInteretController(req, res) {
  const { id } = req.params;
  try {
    const interet = await Interet.findById(id);
    res.status(200).json({ message: `get interet success`, interet });
  } catch (e) {
    res.status(400).json({ message: `Error in getInteretController : ${e.message}` });
  }
}

export async function updateInteretController(req, res) {
  try {
    const { id } = req.params;
    const data = req.body;
    const interet = data.interet;
    await Interet.findOneAndUpdate({ _id: id }, { interet });
    res.status(200).json({ message: `update success` });
  } catch (e) {
    res.status(400).json({ message: `Error in updateInteretController : ${e.message}` });
  }
}
