import AuthConsumers from "../../api/v1/Auth/Auth.Consumers";
import MemberConsumers from "../../api/v1/Member/Member.consumers";

const RabitMQ_Global_Consumer = async () => {
  await MemberConsumers.sendOnboardingEmail();
  await AuthConsumers.OtpConsumer();
};

export default RabitMQ_Global_Consumer;
