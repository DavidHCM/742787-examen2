import express from "express";
import { ENV } from "./config/env.js";
import customersRouter from "./routes/customers.js";
import addressesRouter from "./routes/addresses.js";
import productsRouter from "./routes/products.js";

const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "catalogs",
    env: ENV.nodeEnv,
  });
});

app.use("/clientes", customersRouter);
app.use("/domicilios", addressesRouter);
app.use("/productos", productsRouter);

app.listen(ENV.port, () => {
  console.log(`catalogs en http://localhost:${ENV.port} (env=${ENV.nodeEnv})`
  );
});
