import { getChannel } from "../../../infrastructure/rabitmq/RabitMQ.GlobalChannel";
import { sendOnboardingType } from "./Member.type";
import amqp from "amqplib";
import { memberUtils } from "./Member.Utils";
import EmailUtils from "../../../utils/Email.utils";

class MemberConsumers {
  sendOnboardingEmail = async () => {
    const channel = await getChannel();

    const queueName = "onboarding_email_queue";
    channel?.assertQueue(queueName, { durable: true });

    channel?.consume(queueName, async (message) => {
      if (message) {
        const messageContent = message.content.toString();
        const data: sendOnboardingType = JSON.parse(messageContent);
        console.log("Received message:", data);

        let emailTemplate = await memberUtils.INVITE_MEMBER_TEMPORARY(
          data.firstName,
          data.lastName,
          data.primaryRole,
          data.randomPassword,
        );

        await EmailUtils.transporter().sendMail({
          from: process.env.SMTP_USER,
          to: data.email,
          subject:
            "Invitation to Join GDG Ranchi — Empower, Learn, and Innovate Together!",

          html: emailTemplate,
        });

        // Process the message here (e.g., send email)
        channel?.ack(message); // Acknowledge the message after processing
      }
    });
  };
}

export default new MemberConsumers();
