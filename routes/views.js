import express from "express";
const router = express.Router();

let products = [];

router.get("/home", (req, res) => {
  res.render("home", { products });
});

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", { products });
});

router.post("/addProduct", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.json(newProduct);
});

router.post("/deleteProduct", (req, res) => {
  const { id } = req.body;
  products = products.filter((product) => product.id !== id);
  res.json({ id });
});

export default router;
