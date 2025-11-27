import express from "express";
import { createCustomer, listCustomers } from "../repositories/customersRepo.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { nombre, email } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({ error: "nombre y email son obligatorios" });
    }

    const customer = await createCustomer({ nombre, email });
    return res.status(201).json(customer);
  } catch (err) {
    console.error("Error creando cliente:", err);
    return res.status(500).json({ error: "Error interno creando cliente" });
  }
});

router.get("/", async (req, res) => {
  try {
    const customers = await listCustomers();
    return res.json(customers);
  } catch (err) {
    console.error("Error listando clientes:", err);
    return res.status(500).json({ error: "Error interno listando clientes" });
  }
});

export default router;
