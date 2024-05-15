const Product = require('../models/Product');
const Category = require('../models/Category');

exports.listProducts = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
  
    try {
      const products = await Product.find()
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .exec();

        const productsTotal = await Product.find()
  
      const count = await Product.countDocuments();
  
      res.json({
        count: products.length,
        total: productsTotal.length,
        products,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };


  exports.productAdd = async (req, res) => {
    try {
  
      const { name, category, idCode, price, volume, smell, stock, image, description, discount } = req.body;
  
     /*  const image = req.file ? `/img/fotos-productos/productsAdd/${req.file.filename}` : null; */
  
      const foundCategory = await Category.find({name: category});
  
  
      // Create a new product object
      const newProduct = new Product({
        name: name,
        price: price,
        idCode: idCode,
        volume: volume,
        smell: smell,
        stock: stock,
        discount: discount,
        description: description,
        image: image,
        status: 1,
        category: foundCategory ? foundCategory._id : null,
      });
  
      // Save the new product
      await newProduct.save();
      console.log(newProduct);
      const message = 'Producto registrado con exito';
      res.status(200).json({
        message: message,
        product: newProduct
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
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
  
      const message = 'Producto Actualizado con exito';
      res.status(200).json({
        message: message,
        product: product
      });
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
  
      const message = 'Producto Eliminado con exito';
      res.status(200).json({
        message: message,
        product: product
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };