import { SNSClient } from "@aws-sdk/client-sns";
import { ENV } from "./env.js";

export const snsClient = new SNSClient({
  region: ENV.awsRegion,
});
