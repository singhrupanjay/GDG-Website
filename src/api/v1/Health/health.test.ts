import { describe, expect, it } from "@jest/globals";

import request from "supertest";
import app from "../../../app";

describe("Health Check API", () => {
  it("should return status UP", async () => {
    const response = await request(app).get("/api/v1/health");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ status: "UP" });
  });
});
