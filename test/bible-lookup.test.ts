import request from "supertest";
import app from "../api/index";
import { Server } from "http";

let server: Server;

beforeAll((done) => {
  server = app.listen(() => done());
});

afterAll((done) => {
  server.close(done);
});

describe("Bible API Endpoints", () => {
  describe("GET /lookup", () => {
    it("should return a Bible verse for a valid reference", async () => {
      const response = await request(app).get("/lookup").query({ reference: "John 3:16" });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(typeof response.body.message).toBe("string");
    });

    it("should return 400 if reference is missing", async () => {
      const response = await request(app).get("/lookup");
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty("error", "Bible reference is required");
    });
  });

  describe("GET /integration-spec", () => {
    it("should return the integration spec", async () => {
      const response = await request(app).get("/integration-spec");
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });

  describe("POST /bible", () => {
    it("should return the passage for a valid message", async () => {
      const response = await request(app)
        .post("/bible")
        .send({ message: "<p>John 3:16</p>" });
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("message");
      expect(typeof response.body.message).toBe("string");
    });

    it("should handle invalid references gracefully", async () => {
      const response = await request(app)
        .post("/bible")
        .send({ message: "<p>InvalidReference</p>" });
      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty("message", "<p>InvalidReference</p>");
    });
  });
});
