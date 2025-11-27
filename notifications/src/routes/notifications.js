import express from "express";
import { publishNotification } from "../services/snsPublisher.js";

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { tipo, ventaId, clienteId, total, fecha } = req.body;

    if (!tipo) {
      return res.status(400).json({ error: "tipo es obligatorio" });
    }

    const payload = {
      tipo,
      ventaId,
      clienteId,
      total,
      fecha,
    };

    await publishNotification(payload);

    return res.status(200).json({
      status: "publicado_en_sns",
      tipo,
      ventaId,
    });
  } catch (err) {
    console.error("Error en notifications-service /notificaciones:", err);
    return res
      .status(500)
      .json({ error: "Error interno en notifications-service" });
  }
});

export default router;
