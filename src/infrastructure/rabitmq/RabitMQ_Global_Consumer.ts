import MemberConsumers from "../../api/v1/Member/Member.consumers";

const RabitMQ_Global_Consumer = async () => {
  await MemberConsumers.sendOnboardingEmail();
};

export default RabitMQ_Global_Consumer;
