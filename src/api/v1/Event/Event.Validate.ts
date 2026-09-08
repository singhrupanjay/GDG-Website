import { z } from "zod";
import { EventMode, EventStatus, EventVisibility } from "./event.type";
import { EVENT_TYPE } from "./Event.Constant";

const objectIdSchema = z
  .string()
  .regex(/^[a-f\d]{24}$/i, "Invalid MongoDB ObjectId");

const dateSchema = z
  .string()
  .refine((date) => !Number.isNaN(Date.parse(date)), {
    message: "Invalid date format",
  });

const timelineItemSchema = z
  .object({
    title: z.string().trim().min(3).max(100),
    startAt: dateSchema,
    endAt: dateSchema,
  })
  .superRefine((data, ctx) => {
    const startAt = new Date(data.startAt).getTime();
    const endAt = new Date(data.endAt).getTime();

    if (endAt <= startAt) {
      ctx.addIssue({
        code: "custom",
        message: "Timeline end time must be after start time",
        path: ["endAt"],
      });
    }
  });

const ticketSchema = z.object({
  name: z.string().trim().min(3).max(50),
  price: z.number().min(0),
  quantity: z.number().int().min(1),
});

const venueSchema = z
  .object({
    mode: z.enum(EventMode),
    venueName: z.string().trim().min(3).max(100).optional(),
    address: z.string().trim().min(5).max(200).optional(),
    city: z.string().trim().min(2).max(50).optional(),
    state: z.string().trim().min(2).max(50).optional(),
    country: z.string().trim().min(2).max(50).optional(),
    latitude: z.number().min(-90).max(90).optional(),
    longitude: z.number().min(-180).max(180).optional(),
  })
  .superRefine((data, ctx) => {
    if (data.mode !== EventMode.OFFLINE) {
      return;
    }

    const requiredFields = [
      ["venueName", "Venue name is required for offline events"],
      ["address", "Address is required for offline events"],
      ["city", "City is required for offline events"],
      ["country", "Country is required for offline events"],
    ] as const;

    requiredFields.forEach(([field, message]) => {
      if (!data[field]) {
        ctx.addIssue({
          code: "custom",
          message,
          path: [field],
        });
      }
    });
  });

const eventBaseSchema = z.object({
  Slug: z.string().trim().min(3).max(150).optional(),

  title: z.string().trim().min(3).max(150),

  shortDescription: z.string().trim().max(500).default(""),

  descriptionMarkdown: z.string().trim().min(20),

  redirectUrl: z.string().url().optional(),

  tags: z.array(z.string().trim().min(1).max(50)).max(20).default([]),

  category: z.enum(EVENT_TYPE),

  visibility: z.enum(EventVisibility).default(EventVisibility.PUBLIC),

  status: z.enum(EventStatus).default(EventStatus.REGISTRATION_OPEN),

  coverImageUrl: z.string().url().optional(),

  introVideoUrl: z.string().url().optional(),

  registrationStartAt: dateSchema,

  registrationEndAt: dateSchema,

  venue: venueSchema,

  mentors: z.array(objectIdSchema).max(50).default([]),

  judges: z.array(objectIdSchema).max(50).default([]),

  partners: z.array(objectIdSchema).max(50).default([]),

  sponsors: z.array(objectIdSchema).max(50).default([]),

  tickets: z.array(ticketSchema).max(20).default([]),

  timeline: z.array(timelineItemSchema).max(100).default([]),

  rules: z.array(z.string().trim().min(5).max(500)).max(50).default([]),

  requirements: z.array(z.string().trim().min(3).max(500)).max(50).default([]),
});

type EventDateValidationData = {
  registrationStartAt?: string;
  registrationEndAt?: string;
  timeline?: Array<{
    startAt: string;
    endAt: string;
  }>;
};

const validateDates = (
  data: EventDateValidationData,
  ctx: z.RefinementCtx,
): void => {
  const { registrationStartAt, registrationEndAt, timeline } = data;

  if (!registrationStartAt || !registrationEndAt) {
    return;
  }

  const registrationStart = new Date(registrationStartAt).getTime();
  const registrationEnd = new Date(registrationEndAt).getTime();

  if (registrationEnd <= registrationStart) {
    ctx.addIssue({
      code: "custom",
      message:
        "Registration end date and time must be after registration start date and time",
      path: ["registrationEndAt"],
    });
  }

  if (!timeline?.length) {
    return;
  }

  timeline.forEach((item, index) => {
    const timelineStart = new Date(item.startAt).getTime();
    const timelineEnd = new Date(item.endAt).getTime();

    if (timelineStart < registrationStart) {
      ctx.addIssue({
        code: "custom",
        message:
          "Timeline start cannot be before registration start date and time",
        path: ["timeline", index, "startAt"],
      });
    }

    if (timelineEnd > registrationEnd) {
      ctx.addIssue({
        code: "custom",
        message: "Timeline end cannot be after registration end date and time",
        path: ["timeline", index, "endAt"],
      });
    }
  });
};

export const EventValidate = eventBaseSchema
  .extend({
    createdBy: objectIdSchema,
  })
  .superRefine(validateDates);

export const updateEventValidator = eventBaseSchema
  .partial()
  .extend({
    updatedBy: objectIdSchema,
  })
  .strict()
  .superRefine((data, ctx) => {
    const updateFields = Object.keys(data).filter((key) => key !== "updatedBy");

    if (updateFields.length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Provide at least one field to update",
      });

      return;
    }

    validateDates(data, ctx);
  });

const eventTagsQuerySchema = z
  .union([z.string(), z.array(z.string())])
  .optional()
  .transform((value): string[] | undefined => {
    if (!value) {
      return undefined;
    }

    const tags = Array.isArray(value) ? value : value.split(",");

    const normalizedTags = tags.map((tag) => tag.trim()).filter(Boolean);

    return normalizedTags.length ? normalizedTags : undefined;
  });

export const FindAllEventQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(50).default(10),

  search: z.string().trim().min(1).optional(),

  category: z.enum(EVENT_TYPE).optional(),

  tags: eventTagsQuerySchema,

  status: z.enum(EventStatus).optional(),

  visibility: z.enum(EventVisibility).optional(),
});

export const EventSlugParamsSchema = z.object({
  slug: z.string().trim().min(3).max(150),
});

export const EventIdParamsSchema = z.object({
  eventId: objectIdSchema,
});

export type EventType = z.infer<typeof EventValidate>;

export type UpdateEventType = z.infer<typeof updateEventValidator>;

export type FindAllEventQuery = z.infer<typeof FindAllEventQuerySchema>;

export type TimelineItem = z.infer<typeof timelineItemSchema>;

export type Ticket = z.infer<typeof ticketSchema>;

export type Venue = z.infer<typeof venueSchema>;
