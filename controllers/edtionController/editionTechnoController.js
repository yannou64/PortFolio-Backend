import Techno from "../../models/Techno.js";

export async function createTechno(req, res) {
  let { titre, categorie, niveau, alt_img } = req.body;
  ({ titre, categorie, niveau, alt_img } = checkDataIntegrity(titre, categorie, niveau, alt_img));

  // On récupère l'url du fichier image récupérer par multer s'il existe
  let logoPath = "";
  if (req.file) logoPath = req.file.path;

  // On créé notre enregistrement et on envoi la réponse
  try {
    await Techno.insertOne({
      titre,
      image: logoPath,
      alt_img,
      categorie,
      niveau,
    });
    res.status(200).json({ message: "CreateTechno success" });
  } catch (e) {
    console.error(`CatchError in createTechno : ${e}`);
    res.status(500).json({ message: `Network Error in createTechno` });
  }
}

export async function getAllTechnos(req, res) {
  try {
    let data = await Techno.find();
    res.status(200).json({ data });
  } catch (e) {
    res.status(500).json({ message: `CatchError in getAllTechnos : ${e}` });
  }
}

export async function getAllTechnosByCategories(req, res) {
  try {
    const data = await Techno.aggregate([
      { $sort: { titre: 1, _id: 1 } },

      {
        $group: {
          _id: "$categorie",
          technos: { $push: "$$ROOT" }, // pousse le document entier
        },
      },
      {
        $project: {
          _id: 0,
          categorie: "$_id",
          technos: 1,
        },
      },
      { $sort: { categorie: 1 } }, // ordre des groupes
    ]);
    res.status(200).json({ message: "getAllTechnosByCategories request successfull", data });
  } catch (e) {
    console.error(`CatchError in getAllTechnosByCategories : ${e}`);
    res.status(500).json({ message: "Network Error in getAllTechnosByCategorie" });
  }
}

export async function deleteTechno(req, res) {
  const { id } = req.params;
  try {
    await Techno.findByIdAndDelete(id);
    res.status(200).json({ message: "Delete success" });
  } catch (e) {
    console.error(`CatchError in deleteTechnos : ${e}`);
    res.status(500).json({ message: "Network Error in deleteTechno" });
  }
}

export async function updateTechno(req, res) {
  console.log("test");
  const { id } = req.params;
  let { niveau, categorie, titre, alt_img } = req.body;

  // Controle de sécurité des données
  ({ titre, categorie, niveau, alt_img } = checkDataIntegrity(titre, categorie, niveau, alt_img));

  const updatingTechno = { niveau, categorie, titre, alt_img };
  if (req.file) updatingTechno.image = req.file.path;

  try {
    await Techno.findByIdAndUpdate(id, updatingTechno);
    res.status(200).json({ message: "Update Success" });
  } catch (e) {
    console.error(`CatchError in updatetechno : ${e}`);
    res.status(500).json({ message: "Network Error in updateTechno" });
  }
}

function checkDataIntegrity(titre, categorie, niveau, alt_img) {
  // Normalisation et Sanitization
  function normamliseAndSanitize(data) {
    if (typeof data !== "string") return null;
    return data
      .trim()
      .replace(/<\/?[^>]+(>|$)/g, "") // retire les balises html, complément à mongoose
      .replace(/[\x00-\x1F\x7F]/g, ""); // retire les caractères de contrôle invisible, complément à mongoose
  }

  titre = normamliseAndSanitize(titre);
  categorie = normamliseAndSanitize(categorie);
  niveau = normamliseAndSanitize(niveau);
  alt_img = normamliseAndSanitize(alt_img);

  // validation brut
  if (!titre || !alt_img || !niveau || !categorie) return res.status(400).json({ message: `Inputs missings` });

  // Validation métier
  if (
    categorie !== "Langage / Framework" &&
    categorie !== "Outil de développement" &&
    categorie !== "Design / Organisation"
  )
    return res.status(400).json({ message: "categorie not authorized" });
  if (niveau !== "Debutant" && niveau !== "Maitrise" && niveau !== "Expertise")
    return res.status(400).json({ message: "niveau not authorized" });

  return { titre, categorie, niveau, alt_img };
}
