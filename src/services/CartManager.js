import fs from "fs/promises";
import path from "path";

export default class CartManager {
  constructor() {
    this.cartsFilePath = path.resolve("data", "cart.json");
  }

  async readCarts() {
    try {
      const data = await fs.readFile(this.cartsFilePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async writeCarts(carts) {
    await fs.writeFile(this.cartsFilePath, JSON.stringify(carts, null, 2));
  }

  async createCart() {
    const carts = await this.readCarts();
    const newCart = {
      id: Date.now().toString(),
      products: [],
    };
    carts.push(newCart);
    await this.writeCarts(carts);
    return newCart;
  }

  async getCartById(cartId) {
    const carts = await this.readCarts();
    return carts.find((cart) => cart.id === cartId);
  }

  async addProductToCart(cartId, productId) {
    const carts = await this.readCarts();
    const cart = carts.find((c) => c.id === cartId);
    if (cart) {
      const productIndex = cart.products.findIndex(
        (p) => p.product === productId
      );
      if (productIndex > -1) {
        cart.products[productIndex].quantity += 1;
      } else {
        cart.products.push({ product: productId, quantity: 1 });
      }
      await this.writeCarts(carts);
      return cart;
    } else {
      throw new Error("Carrito no encontrado");
    }
  }
}
