export enum LogSeverityLevel {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
}

export class LogEntity {
  public level: LogSeverityLevel;
  public message: string;
  public createdAt: Date;

  constructor(message: string, level: LogSeverityLevel, createdAt: Date) {
    this.message = message;
    this.level = level;
    this.createdAt = createdAt;
  }
}
