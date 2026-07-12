import AuthConsumers from "../../api/v1/Auth/Auth.Consumers";
import EventRegistrationConsumers from "../../api/v1/EventRegister/EventRegistration.Consumers";
import MemberConsumers from "../../api/v1/Member/Member.consumers";

const RabitMQ_Global_Consumer = async () => {
  await MemberConsumers.sendOnboardingEmail();
  await AuthConsumers.OtpConsumer();
  await EventRegistrationConsumers.sendEventRegistrationConsumer1();
  await EventRegistrationConsumers.sendEventRegistrationConsumer2();
};

export default RabitMQ_Global_Consumer;
