import dotenv from "dotenv";
dotenv.config();

interface KafkaConfig {
  brokers: string[];
  topic: string;
  groupId: string;
  connectionTimeout: number;
  retry: {
    initialRetryTime: number;
    retries: number;
  };
}

interface ServerConfig {
  port: number;
}

interface DatabaseConfig {
  mongoUri: string;
}

export const config = {
  kafka: {
    brokers: process.env.KAFKA_BROKERS?.split(",") || ["localhost:9092"],
    topic: process.env.KAFKA_TOPIC || "user-activities",
    groupId: process.env.KAFKA_GROUP_ID || "activity-service-group",
    connectionTimeout: 10000,
    retry: {
      initialRetryTime: 5000,
      retries: 10
    },
  } as KafkaConfig,
  server: {
    port: parseInt(process.env.PORT || "3000"),
  } as ServerConfig,
  database: {
    mongoUri:
      process.env.MONGO_URI || "mongodb://localhost:27017/user-activities",
  } as DatabaseConfig,
};