import UserModel from "../../../Models/UserModel.js";

const baseDir = "/public/storage/images"

export default async (req, res) => {
  const idUser = req.params.id;

  try {
    const user = await UserModel.findByPk(idUser);

    if (!user || !user.photo) {
      return res.status(404).json({ error: "Usuário ou foto não encontrada" });
    }

    const path = baseDir+"/"+user.photo;

    return res.status(200).json({ path });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar imagem do usuário" });
  }
};
