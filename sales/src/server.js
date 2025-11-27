// src/server.js
import express from "express";
import { ENV } from "./config/env.js";
import salesRouter from "./routes/sales.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "sales",
    env: ENV.nodeEnv,
  });
});

app.use("/notas-venta", salesRouter);

app.listen(ENV.port, () => {
  console.log(
    `sales en http://localhost:${ENV.port} (env=${ENV.nodeEnv})`
  );
});
