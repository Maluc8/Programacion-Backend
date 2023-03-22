import express from "express";
import { productManager } from "./productsManager.js";

const app = express();
const manager = new productManager();

app.get(`/products`, async (req, res) => {
  try {
    await manager.loadProducts();
  } catch (e) {
    console.error(e);
  }
  res.send(manager.getProducts());
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
