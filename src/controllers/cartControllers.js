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


/* exports.addToCart = async (req, res) => {
  try {
    const { userId, productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Si no existe un carrito para el usuario, crea uno nuevo
      cart = new Cart({ userId, products: [] });
    }

    // Busca si el producto ya está en el carrito
    const existingProductIndex = cart.products.findIndex(p => p.productId.equals(productId));

    if (existingProductIndex !== -1) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      // Si el producto no está en el carrito, agrégalo
      cart.products.push({productId: productId, quantity: quantity });
    }

    await cart.save();
    return res.status(200).json({ message: 'Producto agregado al carrito' });
  } catch (error) {
    console.error('Error al agregar producto al carrito:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
} */
  
  /* exports.addToCart = async (req, res) => {
    try {
      const { userId, productId } = req.body;
  
      let cart = await Cart.findOne({ userId: userId });

      if (!cart) {
        cart = new Cart({ userId: userId });
        await cart.save();
      }
  
       const existingItem = await Cart.find({productId: productId});
      if (existingItem) {
        existingItem.quantity++;
        await cart.save();
      } else {
        
        const product = await Product.findById(productId);
        if (!product) {
          return res.status(400).json({ ok: false, msg: 'Product not found' });
        }

        const newItem = new CartItem({
          quantity: 1,
          products: [product],
          cartOrderId: cart._id,
        });
  
        cart.push(newItem);
        await cart.save();
      }
      console.log(cart)
      return res.status(201).json([cart ]);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ ok: false, msg: 'Error adding to cart' });
    }
  }; */


   exports.addToCart = async (req, res) => {
    const { userId, productId, quantity, cartOrderId } = req.body;

    if (!userId || !productId || !quantity || !cartOrderId) {
        return res.status(400).json({ message: 'Datos de entradassss inválidos' });
    }

    try {
        const userExists = await User.findById(userId);
        if (!userExists) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const productExists = await Product.findById(productId);
          console.log(productExists)
        if (!productExists) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        let existingCartOrder;
        if (cartOrderId) {
            existingCartOrder = await CartOrder.findById(cartOrderId);
        }
        if (!existingCartOrder) {
            existingCartOrder = new CartOrder({
                date: new Date(),
                total: 0,
                status: 'En proceso',
                carts: [],
            });
            await existingCartOrder.save();
        }
        
         let productoArr;

        if (productExists) {
          productExists.quantity += quantity;
          console.log(productExists.quantity);
          console.log(quantity);
        productoArr = await productExists.save();
            /* existingCartItem.quantity = quantity;
            await existingCartItem.save(); */
        } else {
            const newCartItem = new Cart({
               /*  quantity, */
                cartOrder: existingCartOrder._id,
                products: [{productoArr}],
            });

            const savedCartItem = await newCartItem.save();

           
            existingCartOrder.carts.push(savedCartItem._id);
            productoArr = savedCartItem;
        }
        
      
        /* existingCartOrder.total = existingCartOrder.carts.reduce((total, cartItem) => total + (cartItem.quantity * productExists.price), 0);
        console.log(existingCartOrder);
        await existingCartOrder.save(); */

        return res.status(200).json(productoArr);
    } catch (err) {
        return res.status(500).json({ message: err.message });
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