import Competence from "../../models/Competence.js";

export async function createCompetence(req, res) {
  try {
    const { competence, categorie } = req.body;
    await Competence.create({
      competence,
      categorie,
    });
    res.status(200).json({ message: "competence créé" });
  } catch (e) {
    res.status(500).json({ message: `Erreur dans la création d'une compétence : ${e.message} ` });
  }
}

export async function getAllCompetences(req, res){
    try {
        const data = await Competence.find()
        res.status(200).json({message: `Toutes les compétences envoyés`, data})
    } catch (e) {
        res.status(500).json({ message: `Erreur pour obtenir toutes les compétences : ${e.message} ` });
    }
}

export async function deleteCompetence(req, res){
    try {
        const {id} = req.params
        await Competence.findByIdAndDelete(id)
        res.status(200).json({ message: `Suppression de compétence success`})
    } catch (e) {
        res.status(500).json({ message: `Erreur pour supprimer une compétence : ${e.message}`})
    }
}

export async function getCompetence(req, res){
    try {
        const {id} = req.params
        const competence = await Competence.findById(id)
        if(!competence) return res.status(400).json({message: `La compétence n'existe pas`})
        res.status(200).json({message : "Get competence success", data: competence})
    } catch (e) {
        res.status(500).json({message: `Erreur pour get une compétence : ${e.message}`})
    }
}

export async function updateCompetence(req, res){
    try{
        const {id} = req.params
        const {competence, categorie} = req.body
        await Competence.findByIdAndUpdate(id, {competence, categorie})
        res.status(200).json({message: `Update de la competence success`})
    } catch(e) {
        res.status(500).json({message: `Erreur update competence : ${e.message}`})
    }
}