import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserModel from '../../Models/UserModel.js';

export default async (request, response) => {

    const email = request.body.email;
    const password = request.body.password;

    if (password === "" || password === null) {
        return response.status(401).json({ error: 'Credenciais inválidas' });
    }

    const JWT_SECRET = process.env.JWT_SECRET;

    const JWT_EXPIRES_IN_MINUTES = 10;

    const JWT_EXPIRES_IN = JWT_EXPIRES_IN_MINUTES + "m";

    try {
        // Aqui iremos buscar
        const userModel = await UserModel.findOne(
            {
                where: {
                    email: email
                }
            }
        );

        if (!userModel) {
            return response.status(401).json({ error: 'Credenciais inválidas' });
        }

        // 2. Comparar password
        const senhaValida = await bcrypt.compare(password, userModel.password);

        if (!senhaValida) {
            return response.status(401).json({ error: 'Credenciais inválidas' });
        }

        // 3. Gerar JWT
        const payload = {
            id: userModel.id,
            email: userModel.email,
            name: userModel.nome
        };

        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

        return response.json({
            token: token,
            expires_in_seconds: JWT_EXPIRES_IN_MINUTES * 60
        });
    } catch (error) {
        console.error('Erro no login:', error);
        return response.status(500).json({ error: 'Erro interno no servidor' });
    }

}