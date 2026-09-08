import { EventModel } from "./Event.Schema";
import { EventVisibility } from "./event.type";

class EventUtils {
  private readonly SELECT_FIELDS =
    "Slug coverImageUrl title shortDescription redirectUrl tags registrationStartAt registrationEndAt";

  async FindEventById(eventId: string) {
    const event = await EventModel.findById(eventId).lean();

    if (!event) {
      throw new Error("Event not found");
    }

    return event;
  }

  async FindAllEventName() {
    return EventModel.find().select("-_id title").lean();
  }

  async FIND_ALL_EVENT(page: number, limit: number) {
    const pageNumber = page - 1;

    console.log("limit", limit);

    const events = await EventModel.find()
      .select(
        "Slug registrationStartAt title category venue.venueName venue.address visibility coverImageUrl status",
      )
      .limit(limit)
      .skip(pageNumber * limit)
      .lean();

    return events;
  }

  async FIND_ALL_EVENT_With_Filter(
    page: number,
    limit: number,
    filters: {
      search?: string;
      tags?: string[];
      category?: string;
      status?: string;
      visibility?: string;
    },
  ) {
    const currentPage = Math.max(1, Number(page) || 1);
    const currentLimit = Math.min(50, Math.max(1, Number(limit) || 10));
    const skip = (currentPage - 1) * currentLimit;

    const query: Record<string, unknown> = {
      visibility: filters.visibility || "PUBLIC",
    };

    if (filters.status?.trim()) {
      query.status = filters.status;
    }

    if (filters.search?.trim()) {
      const search = new RegExp(filters.search.trim(), "i");

      query.$or = [
        { title: search },
        { shortDescription: search },
        { tags: search },
        { category: search },
      ];
    }

    if (filters.tags?.length) {
      query.tags = {
        $in: filters.tags,
      };
    }

    if (filters.category?.trim()) {
      query.category = filters.category;
    }

    const [events, total] = await Promise.all([
      EventModel.find(query)
        .select(
          [
            "Slug",
            "registrationStartAt",
            "registrationEndAt",
            "title",
            "shortDescription",
            "category",
            "venue.venueName",
            "venue.address",
            "visibility",
            "coverImageUrl",
            "status",
            "tags",
          ].join(" "),
        )
        .sort({
          registrationStartAt: 1,
          _id: -1,
        })
        .skip(skip)
        .limit(currentLimit)
        .lean(),

      EventModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / currentLimit);

    return {
      events,
      pagination: {
        page: currentPage,
        limit: currentLimit,
        total,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      },
    };
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

  async FIND_EVENT_BY_NAME(name: string) {
    return EventModel.findOne({ title: name });
  }

  async FIND_EVENT_BY_SLUG(Slug: string) {
    return EventModel.find({ Slug })
      .populate({
        path: "mentors",
        select: "firstName lastName Bio imageUrl socialLinks",
      })
      .populate({
        path: "judges",
        select: "firstName lastName Bio imageUrl socialLinks",
      })
      .lean();
  }
}

export const eventUtils = new EventUtils();
