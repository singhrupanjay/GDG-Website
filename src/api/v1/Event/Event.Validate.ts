import { z } from "zod";
import { EventMode, EventStatus, EventVisibility } from "./event.type";
import { EVENT_TYPE } from "./Event.Constant";

const dateSchema = z
  .string()
  .refine((date) => !Number.isNaN(Date.parse(date)), {
    message: "Invalid date format",
  });

const timelineItemSchema = z
  .object({
    title: z.string().min(3).max(100),
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
  name: z.string().min(3).max(50),
  price: z.number().min(0),
  quantity: z.number().int().min(1),
});

const venueSchema = z.object({
  mode: z.enum(EventMode),
  venueName: z.string().min(3).max(100).optional(),
  address: z.string().min(5).max(200).optional(),
  city: z.string().min(2).max(50).optional(),
  state: z.string().min(2).max(50).optional(),
  country: z.string().min(2).max(50).optional(),
  latitude: z.number().min(-90).max(90).optional(),
  longitude: z.number().min(-180).max(180).optional(),
});

const validateDates = (
  data: {
    registrationStartAt?: string;
    registrationEndAt?: string;
    timeline?: Array<{
      startAt: string;
      endAt: string;
    }>;
  },
  ctx: z.RefinementCtx,
) => {
  if (!data.registrationStartAt || !data.registrationEndAt) {
    return;
  }

  const registrationStartAt = new Date(data.registrationStartAt).getTime();

  const registrationEndAt = new Date(data.registrationEndAt).getTime();

  if (registrationEndAt <= registrationStartAt) {
    ctx.addIssue({
      code: "custom",
      message:
        "Registration end date and time must be after registration start date and time",
      path: ["registrationEndAt"],
    });
  }

  if (!data.timeline?.length) {
    return;
  }

  data.timeline.forEach((item, index) => {
    const timelineStartAt = new Date(item.startAt).getTime();
    const timelineEndAt = new Date(item.endAt).getTime();

    if (timelineStartAt < registrationStartAt) {
      ctx.addIssue({
        code: "custom",
        message:
          "Timeline start cannot be before registration start date and time",
        path: ["timeline", index, "startAt"],
      });
    }

    if (timelineEndAt > registrationEndAt) {
      ctx.addIssue({
        code: "custom",
        message: "Timeline end cannot be after registration end date and time",
        path: ["timeline", index, "endAt"],
      });
    }
  });
};

export const EventValidate = z
  .object({
    Slug: z.string().min(3).max(100).optional(),

    title: z.string().min(5).max(100),

    shortDescription: z.string().min(10).max(200),

    descriptionMarkdown: z.string().min(20),

    redirectUrl: z.string().url(),

    tags: z.array(z.string()).min(1).max(10).optional(),

    category: z.enum(EVENT_TYPE),

    visibility: z.enum(Object.values(EventVisibility)),

    status: z.enum(Object.values(EventStatus)),

    coverImageUrl: z.string().url(),

    introVideoUrl: z.string().url().optional(),

    registrationStartAt: dateSchema,

    registrationEndAt: dateSchema,

    venue: venueSchema,

    mentors: z.array(z.string().length(24)).optional(),

    judges: z.array(z.string().length(24)).optional(),

    partners: z.array(z.string().length(24)).optional(),

    sponsors: z.array(z.string().length(24)).optional(),

    tickets: z.array(ticketSchema).optional(),

    timeline: z.array(timelineItemSchema).optional(),

    rules: z.array(z.string().min(5).max(200)).optional(),

    requirements: z.array(z.string().min(5).max(200)).optional(),
  })
  .superRefine(validateDates);

export const updateEventValidator = z
  .object({
    Slug: z.string().min(3).max(100).optional(),

    title: z.string().min(5).max(100).optional(),

    shortDescription: z.string().min(10).max(200).optional(),

    descriptionMarkdown: z.string().min(20).optional(),

    redirectUrl: z.string().url().optional(),

    tags: z.array(z.string()).min(1).max(10).optional(),

    category: z.enum(EVENT_TYPE).optional(),

    visibility: z.enum(Object.values(EventVisibility)).optional(),

    status: z.enum(Object.values(EventStatus)).optional(),

    coverImageUrl: z.string().url().optional(),

    introVideoUrl: z.string().url().optional(),

    registrationStartAt: dateSchema.optional(),

    registrationEndAt: dateSchema.optional(),

    venue: venueSchema.partial().optional(),

    mentors: z.array(z.string().length(24)).optional(),

    judges: z.array(z.string().length(24)).optional(),

    partners: z.array(z.string().length(24)).optional(),

    sponsors: z.array(z.string().length(24)).optional(),

    tickets: z.array(ticketSchema).optional(),

    timeline: z.array(timelineItemSchema).optional(),

    rules: z.array(z.string().min(5).max(200)).optional(),

    requirements: z.array(z.string().min(5).max(200)).optional(),
  })
  .strict()
  .superRefine((data, ctx) => {
    if (Object.keys(data).length === 0) {
      ctx.addIssue({
        code: "custom",
        message: "Provide at least one field to update",
      });

      return;
    }

    validateDates(data, ctx);
  });

export type EventType = z.infer<typeof EventValidate>;
export type UpdateEventType = z.infer<typeof updateEventValidator>;
