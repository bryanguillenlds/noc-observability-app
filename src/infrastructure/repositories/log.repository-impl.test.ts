import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepositoryImpl } from "./log.repository.-impl";

describe("LogRepositoryImplementation", () => {
  const mockLogDatasource = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const logRepository = new LogRepositoryImpl(mockLogDatasource);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call the data source to save a log", async () => {
    const log = new LogEntity({
      message: "test",
      level: LogSeverityLevel.LOW,
      origin: "test",
      createdAt: new Date(),
    });

    await logRepository.saveLog(log);

    expect(mockLogDatasource.saveLog).toHaveBeenCalledWith(log);
  });

  it("should call the data source to get logs", async () => {
    await logRepository.getLogs(LogSeverityLevel.LOW);

    expect(mockLogDatasource.getLogs).toHaveBeenCalledWith(
      LogSeverityLevel.LOW
    );
  });
});
