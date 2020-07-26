'use strict'
var User = require('../../models/user.model')

var actions = {
  addUser: async function (value) {
    let user = await User.find({ email: value.email }).exec();
    if (user.length == 0) {
      user = new User(value);
      user.image ="image"; //imagen por defecto
      user.status = 3; //cuenta congelada
      let res = await user.save()
        .then(document => document)
        .catch(error => error);
      return res;
    }
    else {
      return new Error('El correo electrónico ya está registrado');
    }
  },
  getUserByEmail: async function (email) {
    return await User.find({email}).select('password').exec()
        .then(document => document)
        .catch(error => error);
},
}

module.exports = actions;
