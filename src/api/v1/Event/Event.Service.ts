import { EventModel } from "./Event.Schema";
import {
  EventType,
  EventValidate,
  UpdateEventType,
  updateEventValidator,
} from "./Event.Validate";

class EventService {
  createNewEvent(eventData: EventType): Promise<unknown> {
    EventValidate.parse(eventData);

    let CreateEvent = EventModel.create(eventData);

    return CreateEvent;
  }

  async updateEvent(
    Slug: string,
    eventData: UpdateEventType,
  ): Promise<unknown> {
    const updates = updateEventValidator.parse(eventData);

    return await EventModel.findOneAndUpdate(
      { Slug },
      { $set: updates },
      {
        returnDocument: "after",
        runValidators: true,
      },
    ).lean();
  }
}

export const eventService = new EventService();
