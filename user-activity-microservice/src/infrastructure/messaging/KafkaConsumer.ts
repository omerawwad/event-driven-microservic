import { Kafka, Consumer } from "kafkajs";
import { logger } from "../../shared/utils/logger";

export class KafkaConsumer {
  private consumer: Consumer;

  constructor(
    private kafka: Kafka,
    private groupId: string,
    private topic: string
  ) {
    this.consumer = this.kafka.consumer({ groupId });
  }

  async connect(): Promise<void> {
    try {
      await this.consumer.connect();
      await this.consumer.subscribe({ topic: this.topic });
    } catch (error) {
      logger.error("Failed to connect Kafka consumer", error);
      throw error;
    }
  }

  async run(
    eachMessage: (message: any) => Promise<void>
  ): Promise<void> {
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        try {
          const value = message.value?.toString();
          if (value) {
            await eachMessage(JSON.parse(value));
          }
        } catch (error) {
          logger.error("Error processing Kafka message", error);
        }
      },
    });
  }

  async disconnect(): Promise<void> {
    await this.consumer.disconnect();
  }
  async connectWithRetry(retries = 5, delay = 5000): Promise<void> {
    for (let i = 0; i < retries; i++) {
      try {
        await this.connect();
        return;
      } catch (error) {
        if (i === retries - 1) throw error;
        logger.warn(`Connection attempt ${i + 1} failed, retrying in ${delay}ms...`);
        await new Promise(res => setTimeout(res, delay));
      }
    }
  }
}

