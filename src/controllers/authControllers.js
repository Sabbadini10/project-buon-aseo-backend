const { validationResult } = require('express-validator');
const { createErrorExpress } = require("../helpers/createErrors");
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
const config = require('../config/authConfig')


exports.registerUser = async (req, res) => {
  try {
    const { name, email} = req.body;
    const { password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered');
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
const email = req.body.email.trim()
const password = req.body.password.trim()

    const user = await User.find({email: email});
    if (user.length == 0 ) {
      return res.status(401).json({ error: 'Credenciales Invalidas' });
    }

    const isMatch = await User.find({password: password});
    if (isMatch.length == 0 ) {
      return res.status(401).json({ error: 'Credenciales Invalidas' });
    } 

  /*   const token = jwt.sign({ id: user.id }, 'llave-buon-aseo', { expiresIn: '30m' });
     */
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration
    });


    res.status(200).json({
      message: 'Usuario Logueado con éxito',
      id: user.id,
      username: user.username,
      email: user.email,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.passwordRecover = async (req, res) => {
  try {
    const email = req.body.email.trim();
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // Generar un nuevo token de restablecimiento de contraseña
    const resetToken = jwt.sign({ userId: user._id }, process.env.SECRET_KEY_JWT || config.secret, {
      expiresIn: '1h',
    });

    // Actualizar el campo de token de restablecimiento en el documento del usuario
    user.resetToken = resetToken;

    // Guardar los cambios en la base de datos
    await user.save();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CORREO_SECRET_KEY,
        pass: process.env.PASS_SECRET_KEY,
      },
    });

    // Enviar el correo electrónico con el enlace de restablecimiento de contraseña
    const info = await transporter.sendMail({
      from: 'remitente@ejemplo.com',
      to: email,
      subject: 'Recuperación de contraseña',
      html: `<h2>Password Reset Request</h2>
             <p>You recently requested a password reset for your account associated with this email address.</p>
             <p>Click the link below to reset your password:</p>
             <a href="http://localhost:3000/api/auth/reset/${resetToken}">Reset Password</a>
             <p>This link will expire in 1 hour.</p>`,
    });

    console.log('Message sent:', info.messageId);
  } catch (err) {
    console.error('Error durante la solicitud de recuperación:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

exports.tokenRecover = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const user = await User.find({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() } // Comprobar validez y caducidad del token
    });
    console.log(user);
    console.log(token);
   /*  const token = req.params.token;
    
    const user = await User.find({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } }); */
   
    if (!user) {
      return res.status(400).json({ message: 'Token inválido o caducado' })
    }
  } 
      catch (err) {
        console.error('Error durante la solicitud de recuperación:', err);
        res.status(500).json({ message: 'Error interno del servidor' });
      }
    }


    exports.resetPassword = async (req, res) => {
      const { token } = req.params;
      const { newPassword } = req.body;
    
      try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT || config.secret);
        const userId = decoded.userId;
    
        // Buscar el usuario por su ID
        const user = await User.findById(userId);
    
        if (!user) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }
    
        // Comprobar la validez del token de restablecimiento de contraseña
        if (!user.resetToken || user.resetToken !== token || user.resetTokenExpiration < Date.now()) {
          return res.status(400).json({ message: 'Token inválido o caducado' });
        }
    
        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);
    
        // Actualizar la contraseña del usuario
        user.password = hashedPassword;
        user.resetToken = undefined; // Eliminar el token de restablecimiento de contraseña
        user.resetTokenExpiration = undefined;
    
        // Guardar los cambios en la base de datos
        await user.save();
    
        res.json({ message: 'Contraseña actualizada correctamente' });
      } catch (err) {
        console.error('Error al restablecer la contraseña:', err);
        if (err instanceof jwt.JsonWebTokenError) {
          return res.status(400).json({ message: 'Token inválido' });
        }
        res.status(500).json({ message: 'Error interno del servidor' });
      }
    };
