import Coordonnees from "../models/Coordonnees.js"

export async function getCvController(req, res){
    res.status(200).json({message: "donnée du cv bien reçu"})
}

export async function getCoordonneesController(_req, res){
    try {
        let coordonnees = await Coordonnees.find()
        if(!coordonnees){
            await Coordonnees.create()
            coordonnees = await Coordonnees.find()
        }
        if(!coordonnees) return res.status(400).json({message: "Status error while fetch getCoordonneesController"})
        console.log("all seems good")  
        res.status(200).json({message: `fetch getCoordonneesController ok`, coordonnees})
    } catch (e) {
        res.status(400).json({message: `Error while fetch getCoordonnesController : ${e.message}`})
    }
}