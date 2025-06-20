const { sequelize } = require('../models');
const bcrypt = require('bcrypt');
const { User, UserType } = require('../models');

class UserDAO {

    static async createUser(userData) {
        const transaction = await sequelize.transaction();
        try {
            const { email, name, lastname, password, typeUser } = userData;
            if (!email || !name || !lastname || !password || !typeUser) {
                throw new Error('Todos los campos son obligatorios');
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                email,
                name,
                lastname,
                password: hashedPassword,
                typeUser
            }, { transaction });
            await transaction.commit();
            return newUser;

        } catch (error) {
            await transaction.rollback();
            throw new Error('No se pudo crear el usuario: ' + error.message);
        }
    }

    static async findUserByEmail(email) {
        try {
            const user = await User.findOne({
                where: { email }
            });
            return !!user; // true si existe, false si no
        } catch (error) {
            throw new Error('Error al buscar el usuario por email');
        }
    }


    static async updateUser(idUser, updatedData) {
        const transaction = await sequelize.transaction();
        try {
            const user = await User.findByPk(idUser);
            if (!user) {
                throw new Error('Usuario no encontrado');
            }
            if (updatedData.password) {
                updatedData.password = await bcrypt.hash(updatedData.password, 10);
            }

            await user.update(updatedData, { transaction });
            await transaction.commit();
            return user;

        } catch (error) {
            await transaction.rollback();
            throw new Error('No se pudo actualizar el usuario: ' + error.message);
        }
    }

    static async login(email, password) {
        try {
            if (!email || !password) {
                throw new Error('El usuario y la contraseña son obligatorios');
            }

            const foundUser = await User.findOne({
                where: { email },
                attributes: ['idUser', 'email', 'name', 'lastname', 'password', 'typeUser'],
                include: [{ model: UserType, as: 'userType' }]
            });

            console.log(' foundUser:', foundUser ? foundUser.toJSON() : 'No se encontró usuario');
            console.log(' password en modelo:', foundUser?.password);

            if (!foundUser) {
                throw new Error('Usuario incorrecto');
            }

            const passwordMatch = await bcrypt.compare(password, foundUser.password);
            if (!passwordMatch) {
                throw new Error('Contraseña no coincide');
            }

            return foundUser;

        } catch (error) {
            console.error(' Error interno en login:', error.message);
            throw new Error('Cae en catch');
        }
    }
}

module.exports = UserDAO;