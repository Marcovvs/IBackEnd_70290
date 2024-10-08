import fs from "fs/promises";
import path from "path";

const productsPath = path.resolve("data", "products.json");

export default class ProductManager {
  constructor() {
    this.products = [];
    this.init();
  }
  async init() {
    try {
      const data = await fs.readFile(productsPath, "utf8");
      this.products = JSON.parse(data);
    } catch (err) {
      this.products = [];
    }
  }

  saveToFile() {
    fs.writeFile(productsPath, JSON.stringify(this.products, null, 2));
  }

  getAllProducts(limit) {
    if (limit) {
      return this.products.slice(0, limit);
    }
    return this.products;
  }

  getProductById(productId) {
    return this.products.find((product) => product.id === productId);
  }

  addProduct(product) {
    const newProduct = {
      id: this.products.length + 1,
      ...product,
      status: true,
    };
    this.products.push(newProduct);
    this.saveToFile();
    return newProduct;
  }

  updateProduct(id, updateFields) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex === -1) return null;

    const updatedProduct = {
      ...this.products[productIndex],
      ...updateFields,
      id: this.products[productIndex].id,
    };
    this.products[productIndex] = updatedProduct;
    this.saveToFile();
    return updatedProduct;
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id
    );
    if (productIndex === -1) return null;

    const deleteProduct = this.products.splice(productIndex, 1);
    this.saveToFile();

    return deleteProduct[0];
  }
}
