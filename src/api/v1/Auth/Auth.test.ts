import { beforeAll, afterAll, describe, expect, it } from "@jest/globals";
import mongoose from "mongoose";
import { randomUUID } from "node:crypto";
import supertest from "supertest";

import app from "../../../app";
import connectToMongoDB from "../../../infrastructure/db/mongo.db.config";
import { AuthConstant } from "./Auth.Constant";
import { authUtils } from "./Auth.Utils";

const uniqueId = randomUUID().substring(0, 8);

const testCommunity = {
  CommunityName: `Test Community ${uniqueId}`,

  password: "StrongPassword@123",

  Bio: "This community is created automatically during Jest integration testing.",

  City: "Ranchi",

  Country: "India",

  ContactPhone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,

  OfficialEmail: `test-${uniqueId}@example.com`,

  Website: "https://example.com",

  LogoUrl: "https://picsum.photos/300",

  socialLinks: {
    github: "https://github.com/test-community",
    discord: "https://discord.gg/test-community",
    twitter: "https://x.com/test-community",
    linkedin: "https://linkedin.com/company/test-community",
    instagram: "https://instagram.com/test-community",
    youtube: "https://youtube.com/@test-community",
  },
};

let authId = "";

beforeAll(async () => {
  await connectToMongoDB();
});

afterAll(async () => {
  if (authId) {
    try {
      await authUtils.deleteUserById(authId);
    } catch (err) {
      console.error("Cleanup failed:", err);
    }
  }

  await mongoose.connection.close();
});

describe("Auth API Integration Tests", () => {
  it("should create a new community account", async () => {
    const response = await supertest(app)
      .post("/api/v1/auth/community-signup")
      .send(testCommunity);

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe(AuthConstant.COMMUNITY_ACCOUNT_CREATED);

    expect(response.body.data).toBeDefined();

    expect(response.body.data).toHaveProperty("_id");

    expect(response.body.data.CommunityName).toBe(testCommunity.CommunityName);

    expect(response.body.data.OfficialEmail).toBe(testCommunity.OfficialEmail);

    authId = response.body.data.OwnerID;
  });

  it("should not allow duplicate community signup", async () => {
    const response = await supertest(app)
      .post("/api/v1/auth/community-signup")
      .send(testCommunity);

    expect(response.status).not.toBe(200);

    expect(response.body.success).toBe(false);
  });

  it("should login successfully", async () => {
    const response = await supertest(app).post("/api/v1/auth/login").send({
      email: testCommunity.OfficialEmail,
      password: testCommunity.password,
    });

    expect(response.status).toBe(200);

    expect(response.body.success).toBe(true);

    expect(response.body.message).toBe(AuthConstant.LOGIN_SUCCESS);

    expect(response.body.data).toBeDefined();
  });

  it("should reject invalid password", async () => {
    const response = await supertest(app).post("/api/v1/auth/login").send({
      email: testCommunity.OfficialEmail,
      password: "WrongPassword123",
    });

    expect(response.status).not.toBe(200);

    expect(response.body.success).toBe(false);
  });

  it("should delete the created user", async () => {
    await expect(authUtils.deleteUserById(authId)).resolves.not.toThrow();

    authId = "";
  });
});
