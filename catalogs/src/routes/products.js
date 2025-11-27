import express from "express";
import { createProduct, listProducts } from "../repositories/productsRepo.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { nombre, precio } = req.body;

    if (!nombre || typeof precio !== "number") {
      return res
        .status(400)
        .json({ error: "nombre y precio (number) son obligatorios" });
    }

    const product = await createProduct({ nombre, precio });
    return res.status(201).json(product);
  } catch (err) {
    console.error("Error creando producto:", err);
    return res.status(500).json({ error: "Error interno creando producto" });
  }
});

router.get("/", async (req, res) => {
  try {
    const products = await listProducts();
    return res.json(products);
  } catch (err) {
    console.error("Error listando productos:", err);
    return res.status(500).json({ error: "Error interno listando productos" });
  }
});

export default router;
