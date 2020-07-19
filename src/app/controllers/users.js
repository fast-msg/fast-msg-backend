 var controller = {
     getUser: (req,res)=>{


        res.status(200).send("info de usuario");
    },
    getContacts:async function (req,res){
        console.log('----------------------------------------------')
        console.log(req.query)
        console.log(req.params)
    
        res.status(200).send("Contactos del usuario");
    },
    getChats:async function (req,res){
        console.log('----------------------------------------------')
        console.log(req.query)
        console.log(req.params)
    
        res.status(200).send("chats del usuario");
    }
 };

 module.exports = controller;