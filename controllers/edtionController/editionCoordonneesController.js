import Coordonnees from "../../models/Coordonnees.js"

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
