import mongoose from "mongoose";
import { MongoDatabase } from "../init";
import { LogModel } from "./log.model";
import { envs } from "../../../config/plugins/env.plugin";

describe("LogModel", () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });

  afterAll(() => {
    mongoose.connection.close();
  });

  it("should create log model with correct structure", async () => {
    const logData = {
      origin: "log.mode.test.ts",
      message: "test-message",
      level: "low",
    };

    const log = await LogModel.create(logData);

    expect(log).toEqual(
      expect.objectContaining({
        ...logData,
        id: expect.any(String),
        createdAt: expect.any(Date),
      })
    );

    await LogModel.findByIdAndDelete(log.id); //delete from DB after using.
  });

  it("should return a schema with the correct constraints", () => {
    const schema = LogModel.schema.obj;

    expect(schema).toEqual(
      expect.objectContaining({
        message: {
          type: String,
          required: true,
        },
        origin: {
          type: String,
        },
        level: {
          type: String,
          enum: ["low", "medium", "high"],
          default: "low",
        },
        createdAt: {
          type: Date,
          default: expect.any(Date),
        },
      })
    );
  });
});
