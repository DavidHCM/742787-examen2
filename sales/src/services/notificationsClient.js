import { ENV } from "../config/env.js";

export async function sendSaleNotification({ sale }) {
  if (!ENV.notificationsServiceUrl) {
    console.warn("NOTIFICATIONS_SERVICE_URL no está configurada, no se envía notificación");
    return;
  }

  const url = `${ENV.notificationsServiceUrl}/notificaciones`;

  const body = {
    tipo: "venta_creada",
    ventaId: sale.id,
    clienteId: sale.clienteId,
    total: sale.total,
    fecha: sale.createdAt,
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Error al llamar notifications-service:", res.status, text);
    } else {
      console.log("Notificación enviada correctamente para venta", sale.id);
    }
  } catch (err) {
    console.error("Error en conexión con notifications-service:", err);
  }
}
