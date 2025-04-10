## Scalable Event-driven Microservice
> scalable event-driven microservice using Nodejs and Kafka

This project implements a scalable event-driven microservice architecture using Node.js, TypeScript, Kafka for event streaming, MongoDB for data persistence, Docker for containerization, and Kubernetes for orchestration. The service processes user activity logs in real-time and provides REST APIs for querying processed data.


### Installation

#### Docker Images

```bash
docker-compose up -d --build
```

#### Kubernetes

```bash
kubectl apply -f k8s/
```

### Technology Stack
- Language: TypeScript (Node.js)
- Event Streaming: Apache Kafka
- Database: MongoDB (Mongoose ODM)
- Containerization: Docker
- Orchestration: Kubernetes
- API Framework: Express.js



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
    - Service publishes events to Kafka topics

- Event Consumption:
    - Kafka consumers process events in real-time
    - Processed data is stored in MongoDB with proper indexing

- Data Querying:
    - Clients fetch processed data via REST API with pagination/filtering

### Kafka Broker

> A Kafka Broker is a server in an Apache Kafka cluster that handles the storage, processing, and distribution of messages.
> Brokers are responsible for receiving, storing, and forwarding data between producers and consumers.

![system design](https://github.com/omerawwad/event-driven-microservic/blob/main/designs/kafka.jpg)

### Available Endpoints

|Method|Endpoint|Description
|---|---|---|
|POST|/api/activities|Submit new activity event|
|GET|/api/activities|List activities with pagination|
|GET|/api/activities/:userId|Get activities by user ID| 

### Key Features
- Event-Driven Architecture: Real-time processing with Kafka
- Domain-Driven Design: Clean separation of concerns
- Scalability: Horizontal scaling with Kubernetes
- Type Safety: Full TypeScript support
- Observability: Logging and metrics integration

### Notes

Best practice for deployment is to use AWS EKS (Elastic Kubernetes Service), but not in the free tier.
> Amazon Elastic Kubernetes Service (EKS) is a managed Kubernetes service by AWS that allows you to deploy, scale, and operate containerized applications using Kubernetes without having to manage the control plane.

### Deployment

The app is already deployed on AWS EC2 Free Tier Server, but Kafka requiers 16 GB RAM or more and using `t2.micro` incountered jvm memory issues.  

#### NGINX

Act as 
- server with secured SSL to scure HTTPS communication
- proxy 
- internal load balancer

> SSL Self Certificate Using OpenSSL

![NGINX](https://github.com/omerawwad/event-driven-microservic/blob/main/designs/NGINX.jpg)

#### AWS Load Balancer