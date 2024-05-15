const Category = require('../models/Category');

exports.categoryList = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching categories');
      }
}

exports.categoryListId = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId);
    
        if (!category) {
          return res.status(404).send('Category not found');
        }
    
        res.json(category); // Send the category data
      } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching category');
      }
}

exports.categoryAdd = async (req, res) => {
    try {
        const { name, status } = req.body;
        const newCategory = new Category({ name, status });
        await newCategory.save();
        res.status(201).json(newCategory);
      } catch (error) {
        console.error(error);
        res.status(500).send('Error creating category');
      }
}

exports.categoryUpdate = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const { name, status } = req.body;
    
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, { name, status }, { new: true });
        if (!updatedCategory) {
          return res.status(404).send('Category not found');
        }
    
        res.json(updatedCategory)
      } catch (error) {
        console.error(error);
        res.status(500).send('Error updating category');
      }
}

exports.categoryDelete = async (req, res) => {
    try {
        const categoryId = req.params.id;
        await Category.findByIdAndDelete(categoryId);
    
        res.status(204).send();
      } catch (error) {
        console.error(error);
        res.status(500).send('Error deleting category');
      }
}