import amqp from "amqplib";
import { sendOnboardingType } from "./Member.type";
import { getChannel } from "../../../infrastructure/rabitmq/RabitMQ.GlobalChannel";

class MemberChannel {
  async sendOnboardingEmail(Data: sendOnboardingType) {
    const channel = await getChannel();
    const queueName = "onboarding_email_queue";
    const message = JSON.stringify(Data);

    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(message), { persistent: true });
  }
}

export default new MemberChannel();
