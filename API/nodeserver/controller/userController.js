const { response } = require('express');
const UserDAO = require('../dataaccessobjects/UserDAO');

const registerUser = async (req, res = response) => {
    try {
        const { email, name, lastname, password, typeUser } = req.body;

        if (!email || !name || !lastname || !password || !typeUser) {
            return res.status(400).json({
                message: 'Todos los campos son obligatorios',
            });
        }

        const existingUser = await UserDAO.findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({
                message: 'El correo electrónico ya está registrado',
            });
        }

        await UserDAO.createUser({ email, name, lastname, password, typeUser });
        return res.status(201).json({
            message: 'Usuario registrado exitosamente',
        });

    } catch (error) {
        console.error('Error en registerUser:', error.message);
        return res.status(500).json({
            message: 'Error al registrar el usuario',
            error: error.message,
        });
    }
};

const updateUser = async (req, res = response) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        if (!id || Object.keys(updatedData).length === 0) {
            return res.status(400).json({
                message: 'ID y datos actualizados son requeridos',
            });
        }

        const updatedUser = await UserDAO.updateUser(id, updatedData);

        return res.status(200).json({
            message: 'Usuario actualizado exitosamente',
            user: updatedUser
        });

    } catch (error) {
        console.error('Error en updateUser:', error.message);
        return res.status(500).json({
            message: 'Error al actualizar el usuario',
            error: error.message,
        });
    }
};

const JWT_SECRET = 'DesarrolloSistemasWebTeamRocket';
const generateJWT = (userId, email, roleId) => {
    if (!userId || !email || !roleId) {
        throw new Error('Todos los campos son obligatorios');
    }
    const payload = {
        userId,
        email,
        roleId
    };
    const token = jwt.sign(payload, JWT_SECRET, {
        expiresIn: '1h'
    });

    return token;
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log(email, "", password);
        const user = await UserDAO.login(email, password);
        const token = generateJWT(user.idUser, user.email, user.typeUser);
        console.log(token);
        res.status(200).json({
            message: 'Token generado',
            token
        });
        
    } catch (error) {
        console.error('Error al validar usuario:', error.message);
        res.status(400).json({ message: error.message });
    }
};

module.exports = {
    registerUser,
    updateUser,
    loginUser,
};
