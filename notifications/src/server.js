import express from "express";
import { ENV } from "./config/env.js";
import notificationsRouter from "./routes/notifications.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "notifications",
    env: ENV.nodeEnv,
  });
});

app.use("/notificaciones", notificationsRouter);

app.listen(ENV.port, () => {
  console.log(
    `notifications-service escuchando en http://localhost:${ENV.port} (env=${ENV.nodeEnv})`
  );
});
