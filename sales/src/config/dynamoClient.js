import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { ENV } from "./env.js";

const client = new DynamoDBClient({
  region: ENV.awsRegion,
});

export const ddb = DynamoDBDocumentClient.from(client);
