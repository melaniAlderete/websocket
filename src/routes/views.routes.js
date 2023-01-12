import { Router } from "express";
import express from "express";
import ProductManager from "../helpers/ProductManager.js";

const router = express.Router();
let productsUploaded = ProductManager.getProducts();

router.get("/", (req, res) => {
  res.render("index", { productsUploaded });
});

export default router;
