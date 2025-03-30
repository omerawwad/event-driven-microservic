import { Kafka } from "kafkajs";
import { produceMessage } from "../../domain/entities/UserActivity";

export class ProducerController {
    constructor(private kafka: Kafka) {}
    async produceMessage(topic: string, message: produceMessage): Promise<void> {
        const producer = this.kafka.producer();
        await producer.connect();
        await producer.send({ 
            topic: topic,
            messages: [{
                value: JSON.stringify(message), 
            }] 
        });
        await producer.disconnect();
    }
}