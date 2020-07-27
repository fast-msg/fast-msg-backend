'use strict'
var User = require('../../models/user.model');
const AuthError = require('../../errors/auth-error');

var actions = {
  addUser: async function (value) {
    let user = await User.find({ email: value.email }).exec();
    if (user.length == 0) {
      user = new User(value);
      user.image ="image"; //imagen por defecto
      user.status = 3; //cuenta congelada
      //generar hash y asignar a cuentas por confirmar
      let res = await user.save()
      return res;
    }
    else {
      throw new AuthError(400,'El correo electrónico ya está registrado en Fast Messages');
    }
  },
  getUserByEmail: async function (email) {
    return await User.find({email}).select('password').exec();
},
}

module.exports = actions;
