import request from "supertest";
import app from "../../app.js";

describe("GET /posts", () => {
  it("should return an array of posts", async () => {
    const { body, status } = await request(app).get("/v1/posts");
    expect(status).toBe(200);
    expect(body.data.length).toBeGreaterThan(0);
    expect(body.data[0]).toHaveProperty("_id");    expect(body.data[0]).toHaveProperty("_id");
  });
});
