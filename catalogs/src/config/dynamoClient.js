// src/config/dynamoClient.js
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { ENV } from "./env.js";

const client = new DynamoDBClient({
  region: ENV.awsRegion,
  ...(ENV.nodeEnv !== 'production' && {
    endpoint: "http://dynamodb-local:8000"
  })
});

export const ddb = DynamoDBDocumentClient.from(client);
