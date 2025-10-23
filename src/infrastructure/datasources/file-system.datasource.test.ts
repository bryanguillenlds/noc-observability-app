import path from "path";
import { FileSystemDatasource } from "./file-system.datasource";
import fs from "fs";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";

describe("FileSystem Datasource", () => {
  const logPath = path.join(__dirname, "../../../logs");

  console.log("PATH:", logPath);

  beforeEach(() => {
    fs.rmSync(logPath, { recursive: true, force: true });
  });

  it("should create log folder and files if they do not exist", () => {
    new FileSystemDatasource();

    const files = fs.readdirSync(logPath);

    expect(files).toEqual(["logs-all.log", "logs-high.log", "logs-medium.log"]);
  });

  it("should exit creation of log files if they already exist", () => {
    // Clean up first to ensure fresh state
    fs.rmSync(logPath, { recursive: true, force: true });

    const writeFileSyncSpy = jest.spyOn(fs, "writeFileSync");

    // First instantiation should create all 3 files
    new FileSystemDatasource();
    expect(writeFileSyncSpy).toHaveBeenCalledTimes(3);

    // Reset the spy to count only the second instantiation
    writeFileSyncSpy.mockClear();

    // Second instantiation should not create any files
    new FileSystemDatasource();
    expect(writeFileSyncSpy).toHaveBeenCalledTimes(0);

    writeFileSyncSpy.mockRestore();
  });

  it("should throw error if severity level is invalid", async () => {
    const fileSystemDatasource = new FileSystemDatasource();

    try {
      await fileSystemDatasource.getLogs("invalid" as LogSeverityLevel);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(`${error}`).toContain("Invalid severity level");
    }
  });

  it("should save a log in logs-all.log file", () => {
    const fileSystemDatasource = new FileSystemDatasource();

    const log = new LogEntity({
      message: "test",
      level: LogSeverityLevel.LOW,
      origin: "file-system.datasource.test.ts",
      createdAt: new Date(),
    });

    fileSystemDatasource.saveLog(log);

    const logContent = fs.readFileSync(
      path.join(logPath, "logs-all.log"),
      "utf-8"
    );

    expect(logContent).toContain(JSON.stringify(log));
  });

  it("should save a log in logs-all.log file and logs-medium.log file", () => {
    const fileSystemDatasource = new FileSystemDatasource();

    const log = new LogEntity({
      message: "test",
      level: LogSeverityLevel.MEDIUM,
      origin: "file-system.datasource.test.ts",
      createdAt: new Date(),
    });

    fileSystemDatasource.saveLog(log);

    const allLogContent = fs.readFileSync(
      path.join(logPath, "logs-all.log"),
      "utf-8"
    );

    const mediumLogContent = fs.readFileSync(
      path.join(logPath, "logs-medium.log"),
      "utf-8"
    );

    expect(allLogContent).toContain(JSON.stringify(log));
    expect(mediumLogContent).toContain(JSON.stringify(log));
  });

  it("should save a log in logs-all.log file and logs-high.log file", () => {
    const fileSystemDatasource = new FileSystemDatasource();

    const log = new LogEntity({
      message: "test",
      level: LogSeverityLevel.HIGH,
      origin: "file-system.datasource.test.ts",
      createdAt: new Date(),
    });

    fileSystemDatasource.saveLog(log);

    const allLogContent = fs.readFileSync(
      path.join(logPath, "logs-all.log"),
      "utf-8"
    );

    const highLogContent = fs.readFileSync(
      path.join(logPath, "logs-high.log"),
      "utf-8"
    );

    expect(allLogContent).toContain(JSON.stringify(log));
    expect(highLogContent).toContain(JSON.stringify(log));
  });

  it("should get logs from logs-all.log file", async () => {
    const fileSystemDatasource = new FileSystemDatasource();

    const log = new LogEntity({
      message: "test",
      level: LogSeverityLevel.LOW,
      origin: "file-system.datasource.test.ts",
      createdAt: new Date(),
    });

    await fileSystemDatasource.saveLog(log);

    const logs = await fileSystemDatasource.getLogs(LogSeverityLevel.LOW);

    expect(logs).toEqual([log]);
  });
});
