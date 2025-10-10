import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

export class MongoLogDatasource implements LogDatasource {
  constructor() {}

  async saveLog(log: LogEntity): Promise<void> {
    const newLog = await LogModel.create(log);
  }

  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    const logs = await LogModel.find({ level: severityLevel });

    // This is so that the inner layers of the architecture
    // don't have to deal with mongodb specific properties that come from the database
    // this will get the log object and return only the properties necessary
    // for the inner layers of the architecture (look like the entity).
    return logs.map((mongoLog) => LogEntity.fromObject(mongoLog));
  }
}
