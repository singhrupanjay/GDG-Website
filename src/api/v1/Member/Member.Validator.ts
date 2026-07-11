import { z } from "zod";

import { ROLE_CONSTANT } from "../Auth/Auth.Constant";
import { Roles } from "./Role.constant";

const onboardingSourceEnum = z.enum([
  "website",
  "referral",
  "social_media",
  "event",
  "direct_invitation",
  "other",
]);

const membershipStatusEnum = z.enum([
  "On Boarding",
  "inactive",
  "Active",
  "Suspended",
  "Banned",
]);

export const MemberValidationSchema = z.object({
  Slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),

  firstName: z.string().min(1, "First name is required"),

  lastName: z.string().min(1, "Last name is required"),

  Bio: z.string().min(1, "Bio is required"),

  socialLinks: z.object({
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    twitter: z.string().url().optional(),
    website: z.string().url().optional(),
    instagram: z.string().url().optional(),
    youtube: z.string().url().optional(),
    portfolio: z.string().url().optional(),
    medium: z.string().url().optional(),
  }),

  location: z.object({
    city: z.string().optional(),
    state: z.string().optional(),
    country: z.string().optional(),
    pinCode: z.string().optional(),
  }),

  imageUrl: z.string().url(),



  email: z.string().email().trim().toLowerCase(),

  AuthId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .optional(),

  membershipStatus: membershipStatusEnum.default("On Boarding").optional(),

  onboardingSource: onboardingSourceEnum.default("website").optional(),

  primaryRole: z.enum(Roles).default(ROLE_CONSTANT.PARTICIPANT),

  skills: z.array(z.string()).optional(),

  areaOfInterest: z.array(z.string()).optional(),

  internalNotes: z.string().optional(),

  createdAt: z.date().optional(),

  updatedAt: z.date().optional(),
});

export type MemberType = z.infer<typeof MemberValidationSchema>;
