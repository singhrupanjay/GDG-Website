import { z } from "zod";
import {
  PartnerRelationshipType,
  PartnerStatus,
  PartnerTier,
} from "./Partner.Schema";

const ContactSchema = z.object({
  name: z.string().trim().optional(),
  designation: z.string().trim().optional(),
  email: z.string().email().optional(),
  phone: z.string().trim().optional(),
});

const SocialLinksSchema = z.object({
  linkedin: z.string().url().optional(),
  twitter: z.string().url().optional(),
  github: z.string().url().optional(),
  youtube: z.string().url().optional(),
  instagram: z.string().url().optional(),
  facebook: z.string().url().optional(),
});

const SponsorshipSchema = z.object({
  amount: z.number().min(0).optional(),

  currency: z.string().trim().optional(),

  benefits: z.array(z.string()).optional(),

  deliverables: z.array(z.string()).optional(),

  contractSigned: z.boolean().optional(),
});

const AnalyticsSchema = z.object({
  sponsoredEvents: z.number().min(0).optional(),
  totalContribution: z.number().min(0).optional(),
});

/* -------------------------------------------------------------------------- */
/* Create Partner Validator                                                    */
/* -------------------------------------------------------------------------- */

export const CreatePartnerValidator = z.object({
  organizationId: z.string().trim().min(1),

  companyName: z.string().trim().min(1),

  shortName: z.string().trim().optional(),

  slug: z.string().trim().min(1).toLowerCase(),

  description: z.string().optional(),

  companyLogo: z.string().url(),

  bannerImage: z.string().url().optional(),

  website: z.string().url().optional(),

  industry: z.string().optional(),

  companySize: z.string().optional(),

  foundedYear: z.number().int().optional(),

  relationshipType: z.nativeEnum(PartnerRelationshipType),

  tier: z.nativeEnum(PartnerTier).optional(),

  status: z.nativeEnum(PartnerStatus).optional(),

  contact: ContactSchema.optional(),

  socialLinks: SocialLinksSchema.optional(),

  sponsorship: SponsorshipSchema.optional(),

  events: z.array(z.string()).optional(),

  analytics: AnalyticsSchema.optional(),

  notes: z.string().optional(),

  createdBy: z.string().trim().min(1),

  updatedBy: z.string().optional(),

  isVerified: z.boolean().optional(),

  isDeleted: z.boolean().optional(),

  deletedAt: z.coerce.date().nullable().optional(),
});

/* -------------------------------------------------------------------------- */
/* Update Partner Validator                                                    */
/* -------------------------------------------------------------------------- */

export const UpdatePartnerValidator = CreatePartnerValidator.partial();

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export type CreatePartnerDTO = z.infer<typeof CreatePartnerValidator>;

export type UpdatePartnerDTO = z.infer<typeof UpdatePartnerValidator>;
