import { describe, it, expect, beforeAll } from "@jest/globals";
import supertest from "supertest";
import app from "../../../app";
import connectToMongoDB from "../../../infrastructure/db/mongo.db.config";
import { authUtils } from "./Auth.Utils";
import { AuthConstant } from "./Auth.Constant";
import { communityUtils } from "../Community/Community.Utils";

const data = {
  owner: {
    firstName: "Abhishek",
    lastName: "Gupta",
    email: "abhishek.gupta@devcommunity.org",
    primaryRole: "ADMIN",
    location: "Ranchi, Jharkhand",
    skills: [
      "Node.js",
      "React",
      "TypeScript",
      "Express.js",
      "MongoDB",
      "Docker",
      "RabbitMQ",
      "AWS",
    ],
    areaOfInterest: [
      "OPEN_SOURCE",
      "MENTORSHIP",
      "AI",
      "WEB_DEVELOPMENT",
      "CLOUD",
    ],
    internalNotes:
      "Community founder, organizes monthly hackathons and technical workshops.",
    accessLevel: {
      internalDashboard: true,
      communityForum: true,
      adminControls: true,
      superAdmin: true,
    },
  },

  CommunityName: "CodeVerse Community",

  password: "StrongPassword@123",

  Bio: "A global developer community empowering students and professionals through open source, AI, cloud computing, hackathons, and technical events.",

  City: "Ranchi",

  ContactPhone: "9876543210",

  Country: "India",

  LogoUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500",

  OfficialEmail: "hello@codeverse.dev",

  Website: "https://www.codeverse.dev",

  socialLinks: {
    github: "https://github.com/codeverse-community",
    discord: "https://discord.gg/codeverse",
    twitter: "https://twitter.com/codeverse_dev",
    linkedin: "https://linkedin.com/company/codeverse-community",
    instagram: "https://instagram.com/codeverse.dev",
    youtube: "https://youtube.com/@codeversecommunity",
  },
};

let OrganizationId: string;

beforeAll(async () => {
  connectToMongoDB();
});

describe("Test Auth Api", () => {
  it("create new Organization", async () => {
    const response = await supertest(app)
      .post("/api/v1/auth/community-signup")
      .send(data);

    console.log("Response Body:", response.body); // Log the response body for debugging

    OrganizationId = response.body.data._id;

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      AuthConstant.COMMUNITY_ACCOUNT_CREATED,
    );
    expect(response.body).toHaveProperty("data");
  });
});

describe("Test Auth Utils functions", () => {
  it("should delete an organization by ID", async () => {
    const deletedOrganization =
      await communityUtils.DeleteCommunityById(OrganizationId);
    console.log("Deleted Organization:", deletedOrganization); // Log the deleted organization for debugging
  });
});
