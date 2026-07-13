import { z } from "zod";
import { EventMode, EventStatus, EventVisibility } from "./event.type";
import { EVENT_TYPE } from "./Event.Constant";

export const EventValidate = z.object({
  Slug: z.string().min(3).max(100).optional(),
  communityId: z.string().length(24),
  title: z.string().min(5).max(100),
  shortDescription: z.string().min(10).max(200),
  descriptionMarkdown: z.string().min(20),
  redirectUrl: z.string().url(),
  tags: z.array(z.string()).min(1).max(10),
  category: z.enum(EVENT_TYPE),
  visibility: z.enum(Object.values(EventVisibility)),
  status: z.enum(Object.values(EventStatus)),
  coverImageUrl: z.string().url(),
  introVideoUrl: z.string().url().optional(),
  registrationStartAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  registrationEndAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Invalid date format",
  }),
  venue: z.object({
    mode: z.enum(Object.values(EventMode)),
    venueName: z.string().min(3).max(100).optional(),
    address: z.string().min(5).max(200).optional(),
    city: z.string().min(2).max(50).optional(),
    state: z.string().min(2).max(50).optional(),
    country: z.string().min(2).max(50).optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
  mentors: z.array(z.string().length(24)).optional(),
  judges: z.array(z.string().length(24)).optional(),
  partners: z.array(z.string().length(24)).optional(),
  sponsors: z.array(z.string().length(24)).optional(),
  tickets: z
    .array(
      z.object({
        name: z.string().min(3).max(50),
        price: z.number().min(0),
        quantity: z.number().min(1),
      }),
    )
    .optional(),
  timeline: z
    .array(
      z.object({
        title: z.string().min(3).max(100),
        startAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
          message: "Invalid date format",
        }),
        endAt: z.string().refine((date) => !isNaN(Date.parse(date)), {
          message: "Invalid date format",
        }),
      }),
    )
    .optional(),
  rules: z.array(z.string().min(5).max(200)).optional(),
  requirements: z.array(z.string().min(5).max(200)).optional(),
});

export type EventType = z.infer<typeof EventValidate>;
