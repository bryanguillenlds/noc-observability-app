import mongoose from "mongoose";
import { envs } from "../../config/plugins/env.plugin";
import { MongoDatabase } from "./init";

describe("init mongo DB", () => {
  afterAll(async () => {
    await mongoose.connection.close();
  });

  it("should connect to mongo DB", async () => {
    const connection = await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
    expect(connection).toBe(true);
  });

  it("should throw an error if the connection fails", async () => {
    await expect(
      MongoDatabase.connect({
        mongoUrl: "invalid-url",
        dbName: envs.MONGO_DB_NAME,
      })
    ).rejects.toThrow("Failed to connect to MongoDB");
  });
});
