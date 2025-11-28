import { ddb } from "../config/dynamoClient.js";
import { ENV } from "../config/env.js";
import {
  PutCommand,
  ScanCommand,
  GetCommand,
  UpdateCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";

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

function cryptoRandomId() {
  return Math.random().toString(36).substring(2, 10);
}

export async function updateCustomer(id, { nombre, email }) {
  const res = await ddb.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { id },
      UpdateExpression: "SET #n = :n, email = :e",
      ExpressionAttributeNames: { "#n": "nombre" },
      ExpressionAttributeValues: {
        ":n": nombre,
        ":e": email,
      },
      ReturnValues: "ALL_NEW",
    })
  );

  return res.Attributes || null;
}

export async function deleteCustomer(id) {
  await ddb.send(
    new DeleteCommand({
      TableName: TABLE,
      Key: { id },
    })
  );
}
