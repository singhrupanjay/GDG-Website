import mongoose from "mongoose";

// Interface defining the Team Member Structure
export interface ITeamMember {
  memberId: mongoose.Types.ObjectId;
  rsvpId?: string; // Optional external tracker ID if needed
  isRSVP: boolean;
  joinedAt: Date;
}

// Interface defining the Registration Document
export interface IEventRegistration {
  eventId: mongoose.Types.ObjectId;
  registrationType: "SOLO" | "TEAM";
  teamName?: string;
  teamCode?: string; // Unique alphanumeric code used to share and join teams
  teamLeaderId: mongoose.Types.ObjectId; // Serves as the Solo participant ID or Team Creator
  members: ITeamMember[];
  maxTeamSize?: number;
  isSubmissionFinalized: boolean; // True when the team lead hits submit
  createdAt: Date;
  updatedAt: Date;
}

export type EventRegistrationTemplateProps = {
  EventName: string;
  TeamName: string;
  email: string;
  fullName: string;
  teamCode: string;
  EventDate: string;
  InviteLink: string;
  QRCodeURL: string;
  ParticipationType: "SOLO" | "TEAM";
};
