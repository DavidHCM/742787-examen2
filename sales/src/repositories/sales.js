import { ddb } from "../config/dynamoClient.js";
import { ENV } from "../config/env.js";
import { PutCommand, ScanCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const TABLE = ENV.salesTable;

export async function createSale({ clienteId, items, total }) {
  const id = `SALE#${cryptoRandomId()}`;

  const item = {
    id,
    clienteId,
    items,
    total,
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

export async function listSales() {
  const res = await ddb.send(
    new ScanCommand({
      TableName: TABLE,
    })
  );
  return res.Items || [];
}

export async function getSaleById(id) {
  const res = await ddb.send(
    new GetCommand({
      TableName: TABLE,
      Key: { id },
    })
  );
  return res.Item || null;
}

function cryptoRandomId() {
  return Math.random().toString(36).substring(2, 10);
}
