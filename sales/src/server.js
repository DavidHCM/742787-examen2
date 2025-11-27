import express from "express";
import { ENV } from "./config/env.js";
import salesRouter from "./routes/sales.js";
import { metricsMiddleware } from "./monitoring/metrics.js";

const app = express();

app.use(express.json());

if (ENV.nodeEnv === "production") {
  app.use(metricsMiddleware);
}

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
