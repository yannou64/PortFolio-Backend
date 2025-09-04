import Projet from "../../models/Projet.js";

export async function createProjet(req, res) {
  try {
    const { titre_projet, description_projet, technos_projet, is_favoris_projet, alt_img_projet } = req.body;
    let image = "";
    if (req.file) image = req.file;
    await Projet.create({
      titre_projet,
      image_projet: image.path,
      alt_img_projet,
      description_projet,
      is_favoris_projet,
      technos_projet: JSON.parse(technos_projet),
    });
    res.status(200).json({ message: "good" });
  } catch (e) {
    res.status(500).json({ message: `Error in createProjet in backend : ${e.message}` });
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
    res.status(200).json({ message: "all is good for getAllProjet", data });
  } catch (e) {
    res.status(500).json({ message: `Error in getAllProjet : ${e.message}` });
  }
}

export async function getProjetsFavoris(req, res) {
  try {
    // const data = await Projet.find();
    const data = await Projet.aggregate([
      {
        $match: { is_favoris_projet: true }
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
    console.log(data)
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

export async function updateProjet(req, res) {
  const { id } = req.params;
  const { titre_projet, description_projet, technos_projet, is_favoris_projet, alt_img_projet } = req.body;
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
    res.status(200).json({ message: `update success` });
  } catch (e) {
    res.status(500).json({ message: `Error in updateProjet : ${e.message}` });
  }
}
