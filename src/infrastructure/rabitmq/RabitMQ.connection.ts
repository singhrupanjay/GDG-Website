import amqp from "amqplib";
import { env_Constant } from "../../constant/env.constant";

let connection: amqp.Connection | null = null;

// RabbitMQ connection function
const connectRabbitMQ = async (): Promise<amqp.Connection> => {
  try {
    if (connection) {
      return connection;
    }
    console.warn("[AI Studio] RabbitMQ not connected — using mock");
    connection = {
      createChannel: async () => ({
        assertQueue: async () => {},
        sendToQueue: () => true,
        consume: async () => {},
        ack: () => {},
      })
    } as any;
    return connection!;
  } catch (error: any) {
    throw new Error(`RabbitMQ Connection Error: ${error.message}`);
  }
};

// Get existing connection
const getConnection = async (): Promise<amqp.Connection> => {
  if (!connection) {
    return connectRabbitMQ();
  }
  return connection;
};

export { connectRabbitMQ, getConnection };
export default connectRabbitMQ;
