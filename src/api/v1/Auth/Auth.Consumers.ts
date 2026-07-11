import { env_Constant } from "../../../constant/env.constant";
import { getChannel } from "../../../infrastructure/rabitmq/RabitMQ.GlobalChannel";
import EmailUtils from "../../../utils/Email.utils";
import { OtpTemplateType } from "./Auth.type";
import { authUtils } from "./Auth.Utils";

class AuthConsumers {
  public OtpConsumer = async () => {
    const channel = await getChannel();

    const queueName = "otp_queue";
    channel?.assertQueue(queueName, { durable: true });

    channel?.consume(queueName, async (message) => {
      if (message) {
        const messageContent = message.content.toString();
        const data: OtpTemplateType = JSON.parse(messageContent);

        let OtpTemplate = authUtils.getOtpTemplate(data);

        await EmailUtils.transporter().sendMail({
          from: env_Constant.SMTP_USER,
          to: data.email,
          subject: `${data.purpose} • Your Verification Code | GDG Ranchi`,

          html: OtpTemplate,
        });

        channel?.ack(message); // Acknowledge the message after processing
      }
    });
  };
}

export default new AuthConsumers();
