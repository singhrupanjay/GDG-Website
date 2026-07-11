import { getChannel } from "../../../infrastructure/rabitmq/RabitMQ.GlobalChannel";
import { OtpTemplateType } from "./Auth.type";

class AuthChannel {
  public sendOtp = async (otpProps: OtpTemplateType) => {
    const channel = await getChannel();

    const queueName = "otp_queue";
    channel?.assertQueue(queueName, { durable: true });

    channel?.sendToQueue(queueName, Buffer.from(JSON.stringify(otpProps)), {
      persistent: true,
    });
  };
}

export default new AuthChannel();
