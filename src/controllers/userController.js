// Controller para Criação de Usuários;

const fs = require('fs');
const { join } = require('path');

const filePath = join(__dirname, 'users.json');

const getUsers = () => {
    const data = fs.existsSync(filePath) ? fs.readFileSync(filePath) : [];

    try {
        return JSON.parse(data);
    }catch (error) {
        return [];
    }
};

const saveUser = (users) => fs.writeFileSync(filePath,  JSON.stringify(users, null, '\t'));

class UserController {
    showAllUsers (req, res) {
        const users = getUsers();

        res.send({ users });
    };

    createUser (req, res) {
        const users = getUsers();

        const { id, name, city, UF } = req.body;
        if (!id) return res.status(400).send({ error: 'O ID é OBRIGATÓRIO!' });
        else if(!name) return res.status(400).send({ error: 'O nome é OBRIGATÓRIO!' });
        else if (!city) return res.status(400).send({ error: 'A cidade é OBRIGATÓRIA!' });
        else if (!UF) return res.status(400).send({ error: 'O estado é OBRIGATÓRIO!' });
        
        users.push(req.body);
        saveUser(users);

        res.status(201).send('Usuário cadastrado com sucesso!');
    };

    updateUser (req, res) {
        const users = getUsers();

        saveUser(users.map(user => {
            if (user.id === req.params.id) {
                return {
                    ...user,
                    ...req.body
                };
            };
            return user;
        }));
        res.status(200).send('Usuário atualizado com sucesso!');
    };

    deleteUser(req, res) {
        const users = getUsers();

        saveUser(users.filter(user => user.id !== req.query.id));

        res.status(200).send('Usuário deletado com sucesso!');
    };
};

module.exports = new UserController();