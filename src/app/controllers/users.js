var actions_users = require('./database-actions/users');

var controller = {
    getUser: async (req, res) => {
        try {
            var id = req.query.id;
            var response = await actions_users.getUser(id);
            if (response) {
                res.status(200).send(response);
            } else {
                res.status(404).send();
            }
        } catch (e) {
            console.log(e)
            res.status(500).send();
        }
    },
    getContacts: async function (req, res) {
        try {
            var id = req.query.id;
            var response = await actions_users.getContactsOfUser(id);
            if (response) {
                res.status(200).send(response);
            } else {
                res.status(404).send();
            }
        } catch (e) {
            console.log(e)
            res.status(500).send();
        }
    },
    getChats: async function (req, res) {
        try {
            var id = req.query.id;
            var response = await actions_users.getChatsOfUser(id);
            if (response) {
                res.status(200).send(response);
            } else {
                res.status(404).send();
            }
        } catch (e) {
            console.log(e)
            res.status(500).send();
        }
    },

    addContact: async function (req, res) {
        try {
            var body = req.body;
            console.log(body)
            var response = await actions_users.addContactToUser(body);
            if (response) {
                res.status(200).send(response);
            } else {
                res.status(404).send();
            }
        } catch (e) {
            console.log(e)
            res.status(500).send();
        }
    }
};

module.exports = controller;