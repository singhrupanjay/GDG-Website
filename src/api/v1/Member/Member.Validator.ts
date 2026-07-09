import { z } from "zod";
import { MemberType } from "./Member.type";
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

export const MemberValidationSchema: z.ZodType<MemberType> = z.object({
  Slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Invalid slug format"),

  firstName: z.string().min(1, "First name is required"),

  lastName: z.string().min(1, "Last name is required"),

  imageUrl: z.string().url("Invalid image URL"),

  publicProfileUrl: z.string().url("Invalid public profile URL").optional(),

  email: z.string().email("Invalid email format").toLowerCase().trim(),

  AuthId: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid Mongo ObjectId")
    .optional(),

  membershipStatus: membershipStatusEnum.default("On Boarding").optional(),

  onboardingSource: onboardingSourceEnum.default("website").optional(),

  primaryRole: z.enum(Roles).default(ROLE_CONSTANT.PARTICIPANT),

  location: z.string().optional(),

  skills: z.array(z.string()).optional(),

  areaOfInterest: z.array(z.string()).optional(),

  internalNotes: z.string().optional(),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
