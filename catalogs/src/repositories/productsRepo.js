import { ddb } from "../config/dynamoClient.js";
import { ENV } from "../config/env.js";
import { PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";

const TABLE = ENV.productsTable;

export async function createProduct({ nombre, precio }) {
  const id = `PROD#${cryptoRandomId()}`;

  const item = {
    id,
    nombre,
    precio,
    createdAt: new Date().toISOString(),
  };

  await ddb.send(
    new PutCommand({
      TableName: TABLE,
      Item: item,
    })
  );

  return item;
}

export async function listProducts() {
  const res = await ddb.send(
    new ScanCommand({
      TableName: TABLE,
    })
  );
  return res.Items || [];
}

function cryptoRandomId() {
  return Math.random().toString(36).substring(2, 10);
}
