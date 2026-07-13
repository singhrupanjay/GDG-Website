import { EventModel } from "./Event.Schema";

class EventUtils {
  FindEventById = async (eventId: string) => {
    const event = await EventModel.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    return event;
  };

  FIND_PAST_EVENTS = async () => {
    const currentDate = new Date();
    const pastEvents = await EventModel.find({
      VISIBILITY: "PUBLIC",
      endDate: { $lt: currentDate },
    })
      .select(
        "coverImageUrl title shortDescription redirectUrl tags registrationStartAt registrationEndAt",
      )
      .lean();
    return pastEvents;
  };

  FIND_UPCOMING_EVENTS = async () => {
    const currentDate = new Date();
    const upcomingEvents = await EventModel.find({
      VISIBILITY: "PUBLIC",
      registrationStartAt: { $gt: currentDate },
    })
      .select(
        "coverImageUrl title shortDescription redirectUrl tags registrationStartAt registrationEndAt",
      )
      .lean();
    return upcomingEvents;
  };
}

export const eventUtils = new EventUtils();
