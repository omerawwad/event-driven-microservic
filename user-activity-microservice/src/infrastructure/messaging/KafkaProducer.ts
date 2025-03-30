import { Kafka, Producer } from "kafkajs";
import { logger } from "../../shared/utils/logger";

export class KafkaProducer {
  private producer: Producer;

  constructor(private kafka: Kafka) {
    this.producer = this.kafka.producer();
  }

  async connect(): Promise<void> {
    try {
      await this.producer.connect();
    } catch (error) {
      logger.error("Failed to connect Kafka producer", error);
      throw error;
    }
  }

  async send(topic: string, message: any): Promise<void> {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: JSON.stringify(message) }],
      });
    } catch (error) {
      logger.error(`Failed to send message to topic ${topic}`, error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    await this.producer.disconnect();
  }
}