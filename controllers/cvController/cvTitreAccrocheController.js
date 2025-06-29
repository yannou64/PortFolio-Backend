import TitreAccroche from "../../models/TitreAccroche.js"

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
