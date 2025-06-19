import mongoose from "mongoose";

const CoordonneesSchema = new mongoose.Schema({
    numberPhone: {
        type: String,
    },
    email: {
        type: String,
    },
    birthday: {
        type: String,
    },
    nationalite: {
        type: String,
    },
    permis: {
        type: String,
    },
    adresse: {
        type: String,
    },
    linkLinkedin: {
        type: String,
    },
    linkGithub: {
        type: String,
    },
    linkPortfolio: {
        type: String,
    }
}, {timestamps: true})

const Coordonnees = mongoose.model('Coordonnees', CoordonneesSchema)

export default Coordonnees