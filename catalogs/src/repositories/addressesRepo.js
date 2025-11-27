import { ddb } from "../config/dynamoClient.js";
import { ENV } from "../config/env.js";
import { PutCommand, ScanCommand, QueryCommand } from "@aws-sdk/lib-dynamodb";

const TABLE = ENV.addressesTable;

export async function createAddress({ clienteId, calle, ciudad, cp }) {
  const id = `ADDR#${cryptoRandomId()}`;

  const item = {
    id,
    clienteId,
    calle,
    ciudad,
    cp,
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

export async function listAddresses() {
  const res = await ddb.send(
    new ScanCommand({
      TableName: TABLE,
    })
  );
  return res.Items || [];
}

export async function listAddressesByCustomer(clienteId) {
  const res = await ddb.send(
    new QueryCommand({
      TableName: TABLE,
      IndexName: "clienteId-index",
      KeyConditionExpression: "clienteId = :cid",
      ExpressionAttributeValues: {
        ":cid": clienteId,
      },
    })
  );
  return res.Items || [];
}

function cryptoRandomId() {
  return Math.random().toString(36).substring(2, 10);
}
