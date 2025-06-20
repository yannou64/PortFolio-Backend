import Coordonnees from "../models/Coordonnees.js";
import TitreAccroche from "../models/TitreAccroche.js";

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
