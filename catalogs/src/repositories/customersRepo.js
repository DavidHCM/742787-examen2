import { ddb } from "../config/dynamoClient.js";
import { ENV } from "../config/env.js";
import { PutCommand, ScanCommand, GetCommand } from "@aws-sdk/lib-dynamodb";

const TABLE = ENV.customersTable;

export async function createCustomer({ nombre, email }) {
  const id = `CUST#${cryptoRandomId()}`;

  const item = {
    id,
    nombre,
    email,
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

export async function listCustomers() {
  const res = await ddb.send(
    new ScanCommand({
      TableName: TABLE,
    })
  );
  return res.Items || [];
}

export async function getCustomerById(id) {
  const res = await ddb.send(
    new GetCommand({
      TableName: TABLE,
      Key: { id },
    })
  );
  return res.Item || null;
}

// ID simple, suficiente para el proyecto
function cryptoRandomId() {
  return Math.random().toString(36).substring(2, 10);
}
