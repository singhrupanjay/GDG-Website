type onBoardingSourceType =
  | "website"
  | "referral"
  | "social_media"
  | "event"
  | "direct_invitation"
  | "other";

type memberStatusType =
  "On Boarding" | "inactive" | "Active" | "Suspended" | "Banned";

export type MemberType = {
  firstName: string;
  lastName: string;
  imageUrl?: string;
  Bio: string;
  AuthId?: string;
  email: string;
  Slug: string;
  membershipStatus?: memberStatusType;
  onboardingSource?: onBoardingSourceType;
  primaryRole?: string;
  location: {
    city: String;
    state: String;
    country: String;
    pinCode: String;
  };
  skills?: string[];
  areaOfInterest?: string[];
  socialLinks: {
    linkedin: String;
    github: String;
    twitter: String;
    website: String;
    instagram: String;
    youtube: String;
    portfolio: String;
    medium: String;
  };
  internalNotes?: string;
  createdAt?: Date;
  updatedAt?: Date;
};

export type sendOnboardingType = {
  email: string;
  firstName: string;
  lastName: string;
  primaryRole: string;
  randomPassword: string;
};
