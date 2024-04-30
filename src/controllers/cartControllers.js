const Cart = require('../models/Cart');
const CartOrder = require('../models/Cart_order');
const Product = require('../models/Product');
const User = require('../models/User');

exports.getUserCart = async (req, res) => {
    const { id } = req.params;
    console.log('cartOrderId:', id); 
    try {
      const userCart = await Cart.find({ cartOrder: id })
        .populate('product')
        .populate('cartOrder', CartOrder());
      res.json(userCart);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  exports.addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;

    const existingCartOrder = await CartOrder.findOne({ user: userId });

if (!existingCartOrder) {
    // Si no existe un pedido en el carrito para este usuario, crea uno
    const newCartOrder = new CartOrder({
        date: new Date(),
        total: 0, // Puedes establecerlo en cero o calcularlo según los productos en el carrito
        user: userId,
        status: 'En proceso',
        carts: [],
    });

    await newCartOrder.save();
}
    // Validación de datos de entrada
    if (!userId || !productId || isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ message: 'Datos de entrada inválidos' });
    }

    try {

        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }


        const productExists = await Product.findById(productId);
        if (!productExists) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        } 
        // Buscar si el producto ya está en el carrito del usuario
        const existingCartItem = await Cart.findOne({ cartOrder: userId, product: productId });
            console.log(existingCartItem)
        if (existingCartItem) {
            // Si el producto ya está en el carrito, actualizar la cantidad
           existingCartItem.quantity = quantity;
            await existingCartItem.save();
            return res.status(200).json(existingCartItem);
        } else {
            // Si el producto no está en el carrito, crear un nuevo ítem en el carrito
            const newCartItem = new Cart({
                quantity,
                cartOrder: userId,
                product: productId,
            });
console.log(newCartItem)
            const savedCartItem = await newCartItem.save();
            return res.status(201).json(savedCartItem);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

  exports.updateCartItemQuantity = async (req, res) => {
    const { cartItemId } = req.params;
    const { quantity } = req.body;
  
    try {
      const updatedCartItem = await Cart.findByIdAndUpdate(
        cartItemId,
        { quantity },
        { new: true }
      );
  
      res.json(updatedCartItem);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
}

exports.removeFromCart = async (req, res) => {
    const { cartItemId } = req.params;
  
    try {
      await Cart.findByIdAndDelete(cartItemId);
      res.json({ message: 'Producto eliminado del carrito' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };