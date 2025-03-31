## Scalable Event-driven Microservice
> scalable event-driven microservice using Nodejs and Kafka

This project implements a scalable event-driven microservice architecture using Node.js, TypeScript, Kafka for event streaming, MongoDB for data persistence, Docker for containerization, and Kubernetes for orchestration. The service processes user activity logs in real-time and provides REST APIs for querying processed data.

### Architecture

The Project has 3 core components
- Rest API 
    Express Restful API server to manage services.
- Kafka event broker
    Queue stream of events.
- MongoDB
    Store logs in a presistent storage. 

![system design](https://github.com/omerawwad/event-driven-microservic/blob/main/designs/archt.jpg)

### Data Flow
- Event Production:

 - Client applications send user activity events via REST API

> - Service publishes events to Kafka topics

- Event Consumption:

-- Kafka consumers process events in real-time

-- Processed data is stored in MongoDB with proper indexing

- Data Querying:

- - Clients fetch processed data via REST API with pagination/filtering