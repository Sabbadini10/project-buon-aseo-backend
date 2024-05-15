const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');


const handleError = (err, res) => {
  console.error(err);
  res.status(500).json({ message: 'Error processing request' });
};


exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    handleError(err, res);
  }
};


exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.status(200).json(user);
  } catch (err) {
    handleError(err, res);
  }
};


exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  
  if (!updates.name || !updates.email) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const allowedUpdates = ['name', 'email', 'phone', 'dni', 'birthday', 'nationality', 'postal_code', 'address', 'city', 'avatar'];
  const validUpdates = Object.keys(updates).filter(field => allowedUpdates.includes(field));

  try {
    const user = await User.findByIdAndUpdate(id, validUpdates, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).json({ message: 'User no encontrado' });
    }
    res.status(200).json(user);
  } catch (err) {
    handleError(err, res);
  }
};
