'use strict'
var User = require('../../models/user.model')

var actions = {
  addUser: async function (value) {
    let user = await User.find({ email: value.email }).exec();
    if (user.length == 0) {
      user = new User(value);
      user.image ="image"; //imagen por defecto
      user.status = 3; //cuenta congelada
      await user.save()
        .then(document => document)
        .catch(error => error);
      return {};
    }
    else {
      throw Error('El correo electrónico ya está registrado');
    }
  },
}

module.exports = actions;
