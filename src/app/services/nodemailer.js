"use strict";
const nodemailer = require("nodemailer");
const settings = require("../../../settings");

async function sendConfirmMail(email, link) {
  var mailOptions = {
    from: 'Fast Messages',
    to: email,
    subject: 'Bienvenido a Fast Messages',
    html: `<h1>¡Bienvenido a Fast Messages!</h1></br>
      <h2>¡Ya casi terminamos!</h2></br><p>Confirma tu cuenta visitando el
      siguiente enlace:<br/> ${link}</p><br/>
      <small>Nota: Este enlace expirará en 10 minutos. </small>`
  };
  return await sendMail(mailOptions);
}

async function sendResetPasswordMail(email, newPasswd) {
  var mailOptions = {
    from: 'Fast Messages',
    to: email,
    subject: 'Cambio de contraseña',
    html: `<h1>¡Cambiando contraseña!</h1></br>
      <p>Estimado usuario,<br/>
      Has solicitado un cambio de contraseña, visita el siguiente enlace e 
      inicia sesión:<br/>${settings.host_client}/login</p><br/>
      Usuario: ${email}<br/>
      Contraseña: ${newPasswd}<br/><br/>
      Si no has solicitado un cambio de contraseña ignora este enlace y si sospechas que alguien
      intenta utilizar tu cuenta, contacta con nosotros enviando un correo eléctronico a aliesell2020@gmail.com.
      <br/>
      <small>Nota: Su contraseña provisional expirará en 2 minutos. </small>`
  };
  return await sendMail(mailOptions);
}

async function sendResetPasswordMailHash(email, link) {
  var mailOptions = {
    from: 'Fast Messages',
    to: email,
    subject: 'Cambio de contraseña',
    html: `<h1>¡Cambiando contraseña!</h1></br>
      <p>Estimado usuario,<br/>
      Has solicitado un cambio de contraseña, visita el siguiente enlace para 
      establecer una nueva contaseña:<br/> ${link}</p><br/>
      Si no has solicitado un cambio de contraseña ignora este enlace y si sospechas que alguien
      intenta utilizar tu cuenta, contacta con nosotros enviando un correo eléctronico a aliesell2020@gmail.com.
      <br/>
      <small>Nota: Este link expirará en 10 minutos. </small>`
  };
  return await sendMail(mailOptions);
}

async function sendMail(mailOptions){
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'aliesell2020@gmail.com',
      pass: 'zsevpsw2FjNE73qaa'
    },
  });

  return await transporter.sendMail(mailOptions).
    then(res => {
      return {message:'ok'}
    })
    .catch(err => {
      console.log("ERROR AL ENVIAR CORREO", err);
    })
}


module.exports = {
  sendConfirmMail,
  sendResetPasswordMail,
  sendResetPasswordMailHash
}
