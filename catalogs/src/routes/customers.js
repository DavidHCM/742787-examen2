import express from "express";
import {
  createCustomer,
  listCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../repositories/customersRepo.js";

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

router.get("/:id", async (req, res) => {
  try {
    const customer = await getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }
    return res.json(customer);
  } catch (err) {
    console.error("Error obteniendo cliente:", err);
    return res.status(500).json({ error: "Error interno obteniendo cliente" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { nombre, email } = req.body;

    if (!nombre || !email) {
      return res.status(400).json({ error: "nombre y email son obligatorios" });
    }

    const updated = await updateCustomer(req.params.id, { nombre, email });

    if (!updated) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    return res.status(200).json({
      message: "Cliente actualizado",
      cliente: updated,
    });
  } catch (err) {
    console.error("Error actualizando cliente:", err);
    return res.status(500).json({ error: "Error interno actualizando cliente" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await deleteCustomer(req.params.id);
    return res.status(204).send();
  } catch (err) {
    console.error("Error eliminando cliente:", err);
    return res.status(500).json({ error: "Error interno eliminando cliente" });
  }
});

export default router;
