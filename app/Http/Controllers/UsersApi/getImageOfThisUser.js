import path from "path";
import fs from "fs";
import UserModel from "../../../Models/UserModel.js";

export default async (req, res) => {
  const idUser = req.params.id;

  try {
    const user = await UserModel.findByPk(idUser);

    if (!user || !user.photo) {
      return res.status(404).json({ error: "Usuário ou foto não encontrada" });
    }

    const imagePath = path.resolve("storage/images", user.photo);

    if (!fs.existsSync(imagePath)) {
      return res.status(404).json({ error: "Arquivo de imagem não encontrado" });
    }

    res.sendFile(imagePath);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar imagem do usuário" });
  }
};
