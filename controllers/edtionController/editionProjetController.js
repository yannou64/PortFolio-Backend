import Projet from "../../models/Projet.js";

export async function createProjet(req, res) {
  try {
    let { titre_projet, description_projet, technos_projet, is_favoris_projet, alt_img_projet } = req.body;
    let image = "";
    if (req.file) image = req.file;

    // sanitization complémentaire du shéma mongoose
    titre_projet = sanitization(titre_projet)
    description_projet = sanitization(description_projet)
    alt_img_projet = sanitization(alt_img_projet)

    await Projet.create({
      titre_projet,
      image_projet: image.path,
      alt_img_projet,
      description_projet,
      is_favoris_projet,
      technos_projet: JSON.parse(technos_projet),
    });
    res.status(200).json({ message: "CreateProjet success" });
  } catch (e) {
    console.error(`CatchError in createProjet : ${e}`)
    res.status(500).json({ message: `Network Error in createProjet` });
  }
}

export async function getProjet(req, res) {
  try {
    const { id } = req.params;
    const data = await Projet.findById(id);
    res.status(200).json({ message: "GetProjet success", data });
  } catch (e) {
    console.error(`CatchError in getProjet : ${e}`)
    res.status(500).json({ message: `Network Error in getProjet` });
  }
}

export async function getAllProjet(req, res) {
  try {
    // const data = await Projet.find();
    const data = await Projet.aggregate([
      {
        $lookup: {
          from: "technos",
          localField: "technos_projet",
          foreignField: "_id",
          as: "ListeTechnos",
        },
      },
    ]);
    res.status(200).json({ message: "GetAllProjet success", data });
  } catch (e) {
    console.error(`CatchError in getAllProjet : ${e}`)
    res.status(500).json({ message: `Network Error in getAllProjet` });
  }
}

export async function getProjetsFavoris(req, res) {
  try {
    const data = await Projet.aggregate([
      {
        $match: { is_favoris_projet: true },
      },
      {
        $lookup: {
          from: "technos",
          localField: "technos_projet",
          foreignField: "_id",
          as: "ListeTechnos",
        },
      },
    ]);
    res.status(200).json({ message: "GetAllProjet success", data });
  } catch (e) {
    console.error(`CatchError in getProjetsFavoris : ${e}`)
    res.status(500).json({ message: `Network Error in getAllProjet` });
  }
}

export async function deleteProjet(req, res) {
  const { id } = req.params;
  try {
    await Projet.findByIdAndDelete(id);
    res.status(200).json({ message: `DeleteProjet success` });
  } catch (e) {
    console.error(`CatchError in deleteProjet : ${e}`)
    res.status(500).json({ message: `Network Error in deleteProjet` });
  }
}

export async function updateProjet(req, res) {
  const { id } = req.params;
  const { titre_projet, description_projet, technos_projet, is_favoris_projet, alt_img_projet } = req.body;

  // sanitizatin complémentaire du shéma mongoose
  titre_projet = sanitization(titre_projet)
  description_projet = sanitization(description_projet )
  alt_img_projet = sanitization(alt_img_projet)

  const updatedProjet = {
    titre_projet,
    description_projet,
    technos_projet: JSON.parse(technos_projet),
    is_favoris_projet,
    alt_img_projet,
  };
  if (req.file) updatedProjet.image_projet = req.file.path;
  try {
    await Projet.findByIdAndUpdate(id, updatedProjet);
    res.status(200).json({ message: `UpdateProjet success` });
  } catch (e) {
    console.error(`CatchError in updateProjet : ${e}`)
    res.status(500).json({ message: `Network Error in updateProjet` });
  }
}

function sanitization(data){
  return data
  .replace(/<\/?[^>]+(>|$)/g, "") // retire les balises html, complément à mongoose
  .replace(/[\x00-\x1F\x7F]/g, ""); // retire les caractères de contrôle invisible, complément à mongoose 
 
}