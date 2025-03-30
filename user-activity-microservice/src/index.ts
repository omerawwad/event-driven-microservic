import { Server } from "./interfaces/server";
import { KafkaConsumer } from "./infrastructure/messaging/KafkaConsumer";
import { Kafka } from "kafkajs";
import { config } from "./shared/config";
import { ActivityService } from "./application/services/ActivityService";
import { MongoActivityRepository } from "./infrastructure/persistence/MongoActivityRepository";
import { logger } from "./shared/utils/logger";

async function startKafkaConsumer() {
  const kafka = new Kafka({
    brokers: config.kafka.brokers,
    connectionTimeout: config.kafka.connectionTimeout,
    retry: config.kafka.retry
  });

  const repository = new MongoActivityRepository();
  const service = new ActivityService(repository);


  const consumer = new KafkaConsumer(kafka, config.kafka.groupId, config.kafka.topic);
  
  try {
    await consumer.connectWithRetry();
    await consumer.run(async (message) => {
      await service.processActivity(message);
    });
  } catch (error) {
    logger.error("Failed to start Kafka consumer after retries", error);
    process.exit(1);
  }
  }

async function main() {
  const server = new Server();
  await server.start();
  await startKafkaConsumer();
}

main().catch((error) => {
  console.error("Failed to start application:", error);
  process.exit(1);
});