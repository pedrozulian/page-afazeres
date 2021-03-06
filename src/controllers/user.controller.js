const { User } = require('../models');

class UserController {
    async create(req, res) {
        try {
            const user = await User.create(req.body);
            return res.status(201).send({ message: 'User created' });
        } catch (error) {
            if (error.name == 'SequelizeUniqueConstraintError') {
                return res.status(400).send({ message: 'E-mail already used' });
            }
            return res.status(500).send({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const user = await User.findOne({ where: { id: Number(req.params.idUser) }});
            return res.status(200).send({
                id: user.id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt
            });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            if (req.body) {
                await User.update(req.body, { where: { id: Number(req.params.idUser) }});
                return res.status(200).send({ message: 'User updated' });
            }
            return res.status(400).send({ error: 'Please, give data needed to update' });
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const user = await User.destroy({ where: { id: Number(req.params.idUser) }});
            return res.status(200).send({ message: 'User deleted', idUser: req.params.idUser});
        } catch (error) {
            return res.status(500).send({ error: error.message });
        }
    }
}

module.exports = new UserController();