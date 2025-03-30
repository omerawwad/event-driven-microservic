import express from "express";
import helmet from "helmet";
import cors from "cors";
import { connectMongoDB } from "../infrastructure/persistence/mongoose/database";
import { MongoActivityRepository } from "../infrastructure/persistence/MongoActivityRepository";
import { ActivityService } from "../application/services/ActivityService";
import { ActivityController } from "./rest/ActivityController";
import { config } from "../shared/config";
import { logger } from "../shared/utils/logger";
import { ProducerController } from "./rest/ProducerController";
import { Kafka } from "kafkajs";
import { produceMessage } from "../domain/entities/UserActivity";


export class Server {
  private app: express.Application;
  private port: number;

  constructor() {
    this.app = express();
    this.port = config.server.port;
    this.configureMiddleware();
    this.configureRoutes();
  }

  private configureMiddleware(): void {
    this.app.use(helmet());
    this.app.use(cors());
    this.app.use(express.json());
  }

  private configureRoutes(): void {
    const repository = new MongoActivityRepository();
    const service = new ActivityService(repository);
    const controller = new ActivityController(service);

    this.app.get(
      "/activities/user/:userId",
      controller.getActivitiesByUser.bind(controller)
    );
    this.app.get(
      "/activities/action/:action",
      controller.getActivitiesByAction.bind(controller)
    );
    this.app.post("/produce", async (req, res) => {
      console.log(req.body);
      const { topic, message } = req.body;
      // const message = JSON.parse(req.body.message);
      try {
        await this.produceMessage('user-activities', message);
        res.status(200).json({ status: "Message produced successfully"});
      } catch (error) {
        logger.error("Error producing message:", error);
        res.status(500).json({ error: "Failed to produce message" });
      }
    });
  }

  public async start(): Promise<void> {
    await connectMongoDB(config.database.mongoUri);
    this.app.listen(this.port, () => {
      logger.info(`Server running on port ${this.port}`);
    });
  }
  public async produceMessage(topic: string, message: produceMessage): Promise<void> {
    const kafka = new Kafka({
      brokers: config.kafka.brokers,
    });
    const producerController = new ProducerController(kafka);
    await producerController.produceMessage(topic, message);
  }
}