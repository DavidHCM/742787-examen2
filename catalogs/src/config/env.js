import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  nodeEnv: process.env.NODE_ENV || "local",
  port: process.env.PORT || 3001,
  awsRegion: process.env.AWS_REGION || "us-east-1",
  customersTable: process.env.CUSTOMERS_TABLE,
  addressesTable: process.env.ADDRESSES_TABLE,
  productsTable: process.env.PRODUCTS_TABLE,
  salesServiceUrl: process.env.SALES_SERVICE_URL,
  notificationsServiceUrl: process.env.NOTIFICATIONS_SERVICE_URL,
};

["customersTable", "addressesTable", "productsTable"].forEach((key) => {
  if (!ENV[key]) {
    console.warn(`ENV  ${key} not set`);
  }
});
