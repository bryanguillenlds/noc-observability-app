import mongoose from "mongoose";
import { envs } from "../../config/plugins/env.plugin";
import { LogModel, MongoDatabase } from "../../data/mongo";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { MongoLogDatasource } from "./mongo-log.datasource";

describe("MongoLogDatasource", () => {
  beforeAll(async () => {
    await MongoDatabase.connect({
      mongoUrl: envs.MONGO_URL,
      dbName: envs.MONGO_DB_NAME,
    });
  });

  afterEach(async () => {
    await LogModel.deleteMany({});
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const mongoLogDatasource = new MongoLogDatasource();

  const testLog = new LogEntity({
    message: "test",
    level: LogSeverityLevel.LOW,
    origin: "mongo-log.datasource.test.ts",
    createdAt: new Date(),
  });

  it("should create and get a log in mongo DB", async () => {
    await mongoLogDatasource.saveLog(testLog);

    const logs = await mongoLogDatasource.getLogs(LogSeverityLevel.LOW);

    expect(logs).toHaveLength(1);
    expect(logs[0]).toEqual(testLog);
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
