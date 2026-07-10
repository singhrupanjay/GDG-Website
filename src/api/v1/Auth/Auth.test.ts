import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import supertest from "supertest";
import app from "../../../app";
import connectToMongoDB from "../../../infrastructure/db/mongo.db.config";
import { authUtils } from "./Auth.Utils";
import { AuthConstant } from "./Auth.Constant";
import { communityUtils } from "../Community/Community.Utils";
import mongoose from "mongoose";

const data = {
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

export let OrganizationId: string;
export let AuthId: string;

beforeAll(async () => {
  connectToMongoDB();
});

afterAll(async () => {
  mongoose.connection.close();
});

describe("Test Auth Api", () => {
  it("create new Organization", async () => {
    const response = await supertest(app)
      .post("/api/v1/auth/community-signup")
      .send(data);

    console.log("Response Body:", response.body); // Log the response body for debugging

    OrganizationId = response.body.data?._id;
    AuthId = response.body.data?._id;

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty(
      "message",
      AuthConstant.COMMUNITY_ACCOUNT_CREATED,
    );
    expect(response.body).toHaveProperty("data");
  });

  it("Login with the created Organization", async () => {
    const response = await supertest(app).post("/api/v1/auth/login").send({
      email: data.OfficialEmail,
      password: data.password,
    });

    console.log("Login Response Body:------>", response.body);

    // expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", AuthConstant.LOGIN_SUCCESS);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("data");
  });
});

// deleteUserById

describe("Test Auth Utils deleteUserById function", () => {
  it("should delete a user by ID", async () => {
    try {
      await authUtils.deleteUserById(AuthId);
      console.log(`User with ID ${AuthId} deleted successfully.`);
    } catch (error) {
      console.error(`Error deleting user with ID ${AuthId}:`, error);
      throw error; // Rethrow the error to fail the test
    }
  });
});
