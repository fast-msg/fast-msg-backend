var actions_chat = require('./database-actions/chats');

var controller = {
    addGroupChat: async function (req, res) {
        try {
           var body = req.body;
            console.log(body)
            var response = await actions_chat.addGroupChat(body);
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
            var response = await actions_chat.getChatsOfUser(id);
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
    getChatById: async function (req,res) {  
        try {
            var id = req.query.id;
            var response = await actions_chat.getChat(id);
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