import express from "express";
import { createAddress, listAddresses } from "../repositories/addressesRepo.js";
import { getCustomerById } from "../repositories/customersRepo.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { clienteId, calle, ciudad, cp } = req.body;

    if (!clienteId || !calle || !ciudad || !cp) {
      return res
        .status(400)
        .json({ error: "clienteId, calle, ciudad y cp son obligatorios" });
    }

    const cliente = await getCustomerById(clienteId);
    if (!cliente) {
      return res.status(404).json({ error: "Cliente no encontrado" });
    }

    const address = await createAddress({ clienteId, calle, ciudad, cp });
    return res.status(201).json(address);
  } catch (err) {
    console.error("Error creando domicilio:", err);
    return res.status(500).json({ error: "Error interno creando domicilio" });
  }
});

router.get("/", async (req, res) => {
  try {
    const addresses = await listAddresses();
    return res.json(addresses);
  } catch (err) {
    console.error("Error listando domicilios:", err);
    return res.status(500).json({ error: "Error interno listando domicilios" });
  }
});

export default router;
