import dotenv from "dotenv";

dotenv.config();

export const ENV = {
  nodeEnv: process.env.NODE_ENV || "local",
  port: process.env.PORT || 3003,
  awsRegion: process.env.AWS_REGION || "us-east-1",
  snsTopicArn: process.env.SNS_TOPIC_ARN,
};

if (!ENV.snsTopicArn) {
  console.warn("WARN: SNS_TOPIC_ARN no está configurado. No se podrán enviar notificaciones.");
}
