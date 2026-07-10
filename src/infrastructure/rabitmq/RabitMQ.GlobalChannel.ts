import { getConnection } from "./RabitMQ.connection";
import amqp from "amqplib";

let channel: amqp.Channel | null = null;

export const getChannel = async () => {
  if (channel) {
    return channel;
  }

  const connection = await getConnection();
  if (!connection) {
    throw new Error("Failed to establish RabbitMQ connection");
  }

  channel = await (connection as any).createChannel();

  if (!channel) {
    throw new Error("Failed to create channel");
  }

  return channel;
};
