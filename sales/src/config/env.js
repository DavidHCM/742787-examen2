import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  nodeEnv: process.env.NODE_ENV || "local",
  port: process.env.PORT || 3002,
  awsRegion: process.env.AWS_REGION || "us-east-1",
  salesTable: process.env.SALES_TABLE,
  notificationsServiceUrl: process.env.NOTIFICATIONS_SERVICE_URL,
};

["salesTable"].forEach((key) => {
  if (!ENV[key]) {
    console.warn(`WARN: ENV variable ${key} is not set`);
  }
});
