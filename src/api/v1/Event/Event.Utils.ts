import { EventModel } from "./Event.Schema";
import { EventVisibility } from "./event.type";

class EventUtils {
  private readonly SELECT_FIELDS =
    "coverImageUrl title shortDescription redirectUrl tags registrationStartAt registrationEndAt";

  async FindEventById(eventId: string) {
    const event = await EventModel.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    return event;
  }

  async FIND_UPCOMING_EVENTS() {
    return EventModel.find({
      visibility: EventVisibility.PUBLIC,
      registrationStartAt: { $gt: new Date() },
    })
      .sort({ registrationStartAt: 1 })
      .select(this.SELECT_FIELDS)
      .lean();
  }

  async FIND_REGISTRATION_OPEN_EVENTS() {
    const now = new Date();

    return EventModel.find({
      visibility: EventVisibility.PUBLIC,
      registrationStartAt: { $lte: now },
      registrationEndAt: { $gte: now },
    })
      .sort({ registrationEndAt: 1 })
      .select(this.SELECT_FIELDS)
      .lean();
  }

  async FIND_REGISTRATION_CLOSED_EVENTS() {
    return EventModel.find({
      visibility: EventVisibility.PUBLIC,
      registrationEndAt: { $lt: new Date() },
    })
      .sort({ registrationEndAt: -1 })
      .select(this.SELECT_FIELDS)
      .lean();
  }

  async FIND_ONGOING_EVENTS() {
    const now = new Date();

    return EventModel.find({
      visibility: EventVisibility.PUBLIC,
      registrationStartAt: { $lte: now },
      registrationEndAt: { $gte: now },
    })
      .sort({ registrationEndAt: 1 })
      .select(this.SELECT_FIELDS)
      .lean();
  }

  async FIND_PAST_EVENTS() {
    return EventModel.find({
      visibility: EventVisibility.PUBLIC,
      registrationEndAt: { $lt: new Date() },
    })
      .sort({ registrationEndAt: -1 })
      .select(this.SELECT_FIELDS)
      .lean();
  }
}

export const eventUtils = new EventUtils();
