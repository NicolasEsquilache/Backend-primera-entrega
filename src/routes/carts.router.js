import express from 'express';
import { ManagerCart} from '../managerCarts.js';

const cartsRouter = express.Router();
const managerCart = new ManagerCart();

// Ruta para crear un nuevo carrito
cartsRouter.post('/', async (req, res) => {
  try {
    const newCart = await managerCart.createCart();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

// Ruta para obtener un carrito por ID
cartsRouter.get('/:cid', async (req, res) => {
  const cartId = parseInt(req.params.cid,10);
  const cart = await managerCart.getCart(cartId);
  if (cart) {
    res.json(cart);
  } else {
    res.status(404).json({ error: 'Carrito no encontrado' });
  }
});

// Ruta para agregar un producto a un carrito
cartsRouter.post('/:cid/product/:pid', async (req, res) => {
  const cartId = parseInt(req.params.cid,10);
  const productId = parseInt(req.params.pid,10);

  try {
    const updatedCart = await managerCart.addProductToCart(cartId, productId);
    if (updatedCart) {
      res.json(updatedCart);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar producto al carrito' });
  }
});

export { cartsRouter };
