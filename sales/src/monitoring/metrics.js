import { CloudWatchClient, PutMetricDataCommand } from "@aws-sdk/client-cloudwatch";
import { ENV } from "../config/env.js";

const cw = new CloudWatchClient({ region: ENV.awsRegion });
const NAMESPACE = "Examen2/Sales";

export function metricsMiddleware(req, res, next) {
  const start = process.hrtime.bigint(); 

  res.on("finish", async () => {
    try {
      const end = process.hrtime.bigint();
      const durationMs = Number(end - start) / 1e6;
      const status = res.statusCode;
      const statusGroup = `${Math.floor(status / 100)}xx`;

      const baseDimensions = [
        { Name: "Service", Value: "sales" },
        { Name: "Env", Value: ENV.nodeEnv }, 
        { Name: "Route", Value: req.route?.path || req.path },
        { Name: "Method", Value: req.method },
      ];

      const metricData = [
        {
          MetricName: "RequestCount",
          Dimensions: [
            ...baseDimensions,
            { Name: "StatusGroup", Value: statusGroup },
          ],
          Unit: "Count",
          Value: 1,
        },
        {
          MetricName: "LatencyMs",
          Dimensions: baseDimensions,
          Unit: "Milliseconds",
          Value: durationMs,
        },
      ];

      await cw.send(
        new PutMetricDataCommand({
          Namespace: NAMESPACE,
          MetricData: metricData,
        })
      );
    } catch (err) {
      console.error("Error enviando métricas a CloudWatch:", err);
    }
  });

  next();
}
