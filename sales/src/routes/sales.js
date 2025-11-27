import express from "express";
import { createSale, listSales } from "../repositories/sales.js";
import { sendSaleNotification } from "../services/notificationsClient.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { clienteId, items } = req.body;

    if (!clienteId || !Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ error: "clienteId e items (no vacíos) son obligatorios" });
    }

    const total = items.reduce((sum, item) => {
      if (
        !item.productoId ||
        typeof item.cantidad !== "number" ||
        typeof item.precioUnitario !== "number"
      ) {
        throw new Error("Cada item debe tener productoId, cantidad y precioUnitario numéricos");
      }
      return sum + item.cantidad * item.precioUnitario;
    }, 0);

    const sale = await createSale({ clienteId, items, total });

    sendSaleNotification({ sale }).catch((err) =>
      console.error("Error enviando notificación asíncrona:", err)
    );

    return res.status(201).json(sale);
  } catch (err) {
    console.error("Error creando nota de venta:", err);
    return res
      .status(500)
      .json({ error: "Error interno creando nota de venta" });
  }
});

router.get("/", async (req, res) => {
  try {
    const sales = await listSales();
    return res.json(sales);
  } catch (err) {
    console.error("Error listando notas de venta:", err);
    return res
      .status(500)
      .json({ error: "Error interno listando notas de venta" });
  }
});

export default router;
