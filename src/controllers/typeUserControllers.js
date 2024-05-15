const TypeUser = require("../models/Type_user");


exports.getUserTypes = async (req, res) => {
  try {
    const userTypes = await TypeUser.find();
    res.status(200).json(userTypes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.typeUser = async (req, res) => {
try {
    const newUserType = new TypeUser(req.body);
    await newUserType.save();
    res.status(201).json({ message: 'User type created successfully!', data: newUserType });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user type:', error });
  }
}