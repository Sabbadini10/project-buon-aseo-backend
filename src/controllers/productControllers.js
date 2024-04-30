const Product = require('../models/Product');


exports.listProducts = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
  
    try {
      const products = await Product.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();
  
      const count = await Product.countDocuments();
  
      res.json({
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

exports.productAdd = async (req, res) => {
    const product = new Product({
      name: req.body.name,
      idCode: req.body.idCode,
      price: req.body.price,
      discount: req.body.discount,
      volume: req.body.volume,
      stock: req.body.stock,
      smell: req.body.smell,
      dimensions: req.body.dimensions,
      quantity: req.body.quantity,
      type: req.body.type,
      description: req.body.description,
      image: req.body.image,
      status: req.body.status,
      category: req.body.category,
    });
  
    try {
      const newProduct = await product.save();
      res.status(201).json(newProduct);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };

  exports.productUpdate = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findByIdAndUpdate(
        id,
        {
          $set: {
            name: req.body.name,
            idCode: req.body.idCode,
            price: req.body.price,
            discount: req.body.discount,
            volume: req.body.volume,
            stock: req.body.stock,
            smell: req.body.smell,
            dimensions: req.body.dimensions,
            quantity: req.body.quantity,
            type: req.body.type,
            description: req.body.description,
            image: req.body.image,
            status: req.body.status,
            category: req.body.category,
          },
        },
        { new: true }
      );
  
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
  exports.getProductById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      res.json(product);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.deleteProductById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const product = await Product.findByIdAndDelete(id);
  
      if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      res.json({ message: 'Producto eliminado correctamente' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };