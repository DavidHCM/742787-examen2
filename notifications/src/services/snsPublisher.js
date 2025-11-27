import { PublishCommand } from "@aws-sdk/client-sns";
import { snsClient } from "../config/snsClient.js";
import { ENV } from "../config/env.js";

export async function publishNotification(messagePayload) {
  if (!ENV.snsTopicArn) {
    console.warn("SNS_TOPIC_ARN no definido, se omite publicación en SNS");
    return;
  }

  const message = JSON.stringify(messagePayload);

  const params = {
    TopicArn: ENV.snsTopicArn,
    Message: message,
    Subject: messagePayload.tipo || "notificacion",
  };

  await snsClient.send(new PublishCommand(params));
}
