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

    return await EventModel.find({
      VISIBILITY: "PUBLIC",
      timeline: {
        $elemMatch: {
          title: "Event",
          endAt: { $lt: currentDate },
        },
      },
    })
      .select("coverImageUrl title shortDescription redirectUrl tags timeline")
      .lean();
  };

  FIND_UPCOMING_EVENTS = async () => {
    const currentDate = new Date();

    return await EventModel.find({
      VISIBILITY: "PUBLIC",
      timeline: {
        $elemMatch: {
          title: "Event",
          startAt: { $gt: currentDate },
        },
      },
    })
      .select("coverImageUrl title shortDescription redirectUrl tags timeline")
      .lean();
  };

  FIND_ONGOING_EVENTS = async () => {
    const currentDate = new Date();

    return await EventModel.find({
      VISIBILITY: "PUBLIC",
      timeline: {
        $elemMatch: {
          title: "Event",
          startAt: { $lte: currentDate },
          endAt: { $gte: currentDate },
        },
      },
    })
      .select("coverImageUrl title shortDescription redirectUrl tags timeline")
      .lean();
  };

  FIND_REGISTRATION_OPEN_EVENTS = async () => {
    const currentDate = new Date();

    return await EventModel.find({
      VISIBILITY: "PUBLIC",
      timeline: {
        $elemMatch: {
          title: "Registration",
          startAt: { $lte: currentDate },
          endAt: { $gte: currentDate },
        },
      },
    }).lean();
  };

  FIND_REGISTRATION_CLOSED_EVENTS = async () => {
    const currentDate = new Date();

    return await EventModel.find({
      VISIBILITY: "PUBLIC",
      timeline: {
        $elemMatch: {
          title: "Registration",
          endAt: { $lt: currentDate },
        },
      },
    }).lean();
  };
}

export const eventUtils = new EventUtils();
