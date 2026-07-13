import { EventModel } from "./Event.Schema";
import { EventVisibility } from "./event.type";

class EventUtils {
  async FindEventById(eventId: string) {
    const event = await EventModel.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    return event;
  }

  async FIND_UPCOMING_EVENTS() {
    const now = new Date();

    return await EventModel.find({
      visibility: EventVisibility.PUBLIC,
      registrationStartAt: {
        $gt: now,
      },
    })
      .sort({ registrationStartAt: 1 })
      .select(
        "coverImageUrl title shortDescription redirectUrl tags registrationStartAt registrationEndAt",
      )
      .lean();
  }

  async FIND_REGISTRATION_OPEN_EVENTS() {
    const now = new Date();

    return await EventModel.find({
      visibility: EventVisibility.PUBLIC,
      registrationStartAt: {
        $lte: now,
      },
      registrationEndAt: {
        $gte: now,
      },
    })
      .sort({ registrationStartAt: 1 })
      .select(
        "coverImageUrl title shortDescription redirectUrl tags registrationStartAt registrationEndAt",
      )
      .lean();
  }

  async FIND_REGISTRATION_CLOSED_EVENTS() {
    const now = new Date();

    return await EventModel.find({
      visibility: EventVisibility.PUBLIC,
      registrationEndAt: {
        $lt: now,
      },
    })
      .sort({ registrationEndAt: -1 })
      .select(
        "coverImageUrl title shortDescription redirectUrl tags registrationStartAt registrationEndAt",
      )
      .lean();
  }

  async FIND_ONGOING_EVENTS() {
    const now = new Date();

    return await EventModel.find({
      visibility: EventVisibility.PUBLIC,
      timeline: {
        $elemMatch: {
          title: "Hackathon Begins",
          startAt: {
            $lte: now,
          },
          endAt: {
            $gte: now,
          },
        },
      },
    })
      .select(
        "coverImageUrl title shortDescription redirectUrl tags timeline",
      )
      .lean();
  }

  async FIND_PAST_EVENTS() {
    const now = new Date();

    return await EventModel.find({
      visibility: EventVisibility.PUBLIC,
      timeline: {
        $elemMatch: {
          title: "Hackathon Begins",
          endAt: {
            $lt: now,
          },
        },
      },
    })
      .sort({ updatedAt: -1 })
      .select(
        "coverImageUrl title shortDescription redirectUrl tags registrationStartAt registrationEndAt",
      )
      .lean();
  }
}

export const eventUtils = new EventUtils();