import { EventModel } from "./Event.Schema";
import { EventType, EventValidate } from "./Event.Validate";

class EventService {
  createNewEvent(eventData: EventType): Promise<unknown> {
    EventValidate.parse(eventData);

    let CreateEvent = EventModel.create(eventData);

    return CreateEvent;
  }
}

export const eventService = new EventService();
