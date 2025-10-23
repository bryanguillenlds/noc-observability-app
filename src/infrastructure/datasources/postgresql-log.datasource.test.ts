import { PostgresqlLogDatasource } from "./postgresql-log.datasource";
import { PrismaClient } from "@prisma/client";

import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

const prisma = new PrismaClient();

describe("PostgresqlLogDatasource", () => {
  afterEach(async () => {
    await prisma.logModel.deleteMany();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  const postgresqlLogDatasource = new PostgresqlLogDatasource();

  const testLog = new LogEntity({
    message: "test",
    level: LogSeverityLevel.LOW,
    origin: "postgresql-log.datasource.test.ts",
    createdAt: new Date(),
  });

  it("should create and get a log in postgresql DB", async () => {
    await postgresqlLogDatasource.saveLog(testLog);

    const logs = await postgresqlLogDatasource.getLogs(LogSeverityLevel.LOW);

    expect(logs).toHaveLength(1);
    expect(logs[0]).toEqual({
      ...testLog,
      level: testLog.level.toUpperCase(),
    });
    expect(logs[0]).toBeInstanceOf(LogEntity);
  });
});
