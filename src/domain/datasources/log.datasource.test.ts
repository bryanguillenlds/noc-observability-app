import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogDatasource } from "./log.datasource";

class MockLogDatasource implements LogDatasource {
  async saveLog(log: LogEntity): Promise<void> {
    return Promise.resolve();
  }
  async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    return Promise.resolve([mockLog]);
  }
}

const mockLog = new LogEntity({
  message: "test",
  level: LogSeverityLevel.LOW,
  origin: "test",
  createdAt: new Date(),
});

describe("LogDatasource", () => {
  it("should test abstract class correct implementation", async () => {
    const mockLogDatasource = new MockLogDatasource();

    expect(mockLogDatasource).toHaveProperty("saveLog");
    expect(mockLogDatasource).toHaveProperty("getLogs");
    expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);

    await mockLogDatasource.saveLog(mockLog);

    const logs = await mockLogDatasource.getLogs(LogSeverityLevel.LOW);

    expect(logs[0]).toEqual(mockLog);
    expect(logs[0]).toBeInstanceOf(LogEntity);
    expect(logs).toHaveLength(1);
  });
});
