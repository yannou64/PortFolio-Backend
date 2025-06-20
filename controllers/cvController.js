import Coordonnees from "../models/Coordonnees.js";
import TitreAccroche from "../models/TitreAccroche.js";
import Interet from "../models/Interet.js";

export async function getCvController(req, res) {
  res.status(200).json({ message: "donnée du cv bien reçu" });
}

export async function getCoordonneesController(_req, res) {
  try {
    let data = await Coordonnees.findOne();
    if (!data || data.length == 0) {
      await Coordonnees.create({
        numberPhone: "",
        email: "",
        birthday: "",
        nationalite: "",
        permis: "",
        adresse: "",
        linkLinkedin: "",
        linkGithub: "",
        linkPortfolio: "",
      });
      data = await Coordonnees.findOne();
    }
    res.status(200).json({ message: `fetch getCoordonneesController ok`, data });
  } catch (e) {
    res.status(400).json({ message: `Error while fetch getCoordonnesController : ${e.message}` });
  }
}

export async function updateCoordonneesController(req, res) {
  try {
    const { id } = req.params;
    const { numberPhone, email, birthday, nationalite, permis, adresse, linkLinkedin, linkGithub, linkPortfolio } =
      req.body;
    await Coordonnees.findOneAndUpdate(
      { _id: id },
      {
        numberPhone,
        email,
        birthday,
        nationalite,
        permis,
        adresse,
        linkLinkedin,
        linkGithub,
        linkPortfolio,
      }
    );
    res.status(200).json({ message: `Update coordonnees ok` });
  } catch (e) {
    res.status(400).json({ message: `Error while fetch updateCoordonneesController : ${e.message}` });
  }
}

export async function getTitreAccrocheController(req, res) {
  try {
    // On teste si l'enregistrement existe
    let data = await TitreAccroche.findOne();
    if (!data || data.length == 0) {
      // si enregistrement n'existe pas on le créé
      await TitreAccroche.create({
        title: "",
        nameAndSurname: "",
        accroche: "",
      });
      data = await TitreAccroche.findOne();
    }
    res.status(200).json({ message: "get TitreAccroche ok", data });
  } catch (e) {
    res.status(400).json({ message: `Erreur while fetch getTitreAccrocheController : ${e.message}` });
  }
}

export async function updateTitreAccrocheController(req, res) {
  console.log("i m here !");
  try {
    const { title, nameAndSurname, accroche } = req.body;
    const { id } = req.params;
    const data = await TitreAccroche.findOneAndUpdate(
      { _id: id },
      {
        title,
        nameAndSurname,
        accroche,
      }
    );
    if (!data) return res.status(400).json({ message: "Error with update data is falsy" });
    res.status(200).json({ message: `Update titreAccroche ok` });
  } catch (e) {
    res.status(400).json({ message: `Error in updateTitreAccrocheController : ${e.message}` });
  }
}

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
