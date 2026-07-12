import { getChannel } from "../../../infrastructure/rabitmq/RabitMQ.GlobalChannel";
import { EventRegistrationTemplateProps } from "./EventRegistration.Type";

class EventRegistrationChannel {
  sendEventRegistrationMail = async (
    eventRegistrationProps: EventRegistrationTemplateProps,
  ) => {
    const channel = await getChannel();

    const queueName = "event_registration_queue";
    channel?.assertQueue(queueName, { durable: true });

    channel?.sendToQueue(
      queueName,
      Buffer.from(JSON.stringify(eventRegistrationProps)),
      {
        persistent: true,
      },
    );
  };
}

export default new EventRegistrationChannel();
