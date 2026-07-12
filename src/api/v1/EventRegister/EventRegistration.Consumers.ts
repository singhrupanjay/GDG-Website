import { env_Constant } from "../../../constant/env.constant";
import { getChannel } from "../../../infrastructure/rabitmq/RabitMQ.GlobalChannel";
import EmailUtils from "../../../utils/Email.utils";
import { EventRegistrationTemplateProps } from "./EventRegistration.Type";
import { eventRegistrationUtils } from "./EventRegistration.Utils";

class EventRegistrationConsumers {
  sendEventRegistrationConsumer1 = async () => {
    const channel = await getChannel();

    const queueName = "event_registration_queue";
    channel?.assertQueue(queueName, { durable: true });

    channel?.consume(queueName, async (msg) => {
      if (msg) {
        const messageContent = msg.content.toString();
        const parsedMessage: EventRegistrationTemplateProps =
          JSON.parse(messageContent);

        // Process the parsed message here
        console.log("Received message:", parsedMessage);

        let EventRegistrationTemplate =
          await eventRegistrationUtils.GetEventRegistrationTemplate(
            parsedMessage,
          );

        await EmailUtils.transporter().sendMail({
          from: env_Constant.SMTP_USER,
          to: parsedMessage.email,
          subject: "Your Event Registration Confirmation | GDG Ranchi",

          html: EventRegistrationTemplate,
        });

        // Acknowledge the message after processing
        channel?.ack(msg);
      }
    });
  };

  sendEventRegistrationConsumer2 = async () => {
    const channel = await getChannel();

    const queueName = "event_registration_queue";
    channel?.assertQueue(queueName, { durable: true });

    channel?.consume(queueName, async (msg) => {
      if (msg) {
        const messageContent = msg.content.toString();
        const parsedMessage: EventRegistrationTemplateProps =
          JSON.parse(messageContent);

        // Process the parsed message here
        console.log("Received message:", parsedMessage);

        // Acknowledge the message after processing
        channel?.ack(msg);
      }
    });
  };
}

export default new EventRegistrationConsumers();
