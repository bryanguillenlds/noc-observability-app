import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { PrismaClient, SeverityLevel } from "@prisma/client";

const prisma = new PrismaClient();

const severityEnum = {
  low: SeverityLevel.LOW,
  medium: SeverityLevel.MEDIUM,
  high: SeverityLevel.HIGH,
};

export class PostgresqlLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await prisma.logModel.create({
      data: {
        message: log.message,
        level: severityEnum[log.level],
        origin: log.origin,
        createdAt: log.createdAt,
      },
    });
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await prisma.logModel.findMany({
      where: {
        level: severityEnum[severityLevel],
      },
    });

    return logs.map((log) => LogEntity.fromObject(log));
  }
}
