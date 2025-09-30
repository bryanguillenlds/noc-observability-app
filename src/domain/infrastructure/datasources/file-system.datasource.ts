import { LogDatasource } from "../../datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";

import fs from "fs";

export class FileSystemDatasource implements LogDatasource {
  private readonly logPath = "logs/";
  private readonly allLogsPath = "logs/logs-all.log";
  private readonly mediumLogsPath = "logs/logs-medium.log";
  private readonly highLogsPath = "logs/logs-high.log";

  constructor() {
    this.createLogsFiles();
  }

  //Ensure folders exist upon instantiation
  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath, { recursive: true });
    }

    [this.allLogsPath, this.mediumLogsPath, this.highLogsPath].forEach(
      (path) => {
        if (fs.existsSync(path)) {
          return;
        }

        fs.writeFileSync(path, "");
      }
    );
  };

  async saveLog(newLog: LogEntity): Promise<void> {
    const logAsJson = JSON.stringify(newLog);

    fs.appendFileSync(this.allLogsPath, `${logAsJson}\n`);

    if (newLog.level === LogSeverityLevel.LOW) return;

    if (newLog.level === LogSeverityLevel.MEDIUM) {
      fs.appendFileSync(this.mediumLogsPath, `${logAsJson}\n`);
    }

    if (newLog.level === LogSeverityLevel.HIGH) {
      fs.appendFileSync(this.highLogsPath, `${logAsJson}\n`);
    }
  }

  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }
}
