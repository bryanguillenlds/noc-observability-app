import { LogEntity, LogSeverityLevel } from "./log.entity";

describe("LogEntity", () => {
  const testObject = {
    message: "test",
    level: LogSeverityLevel.LOW,
    origin: "log.entity.test.ts",
    createdAt: new Date("2021-01-01T00:00:00.000Z"),
  };

  it("should create a log entity", () => {
    const log = new LogEntity(testObject);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log.message).toBe(testObject.message);
    expect(log.level).toBe(testObject.level);
    expect(log.origin).toBe(testObject.origin);
    expect(log.createdAt).toBeInstanceOf(Date);
  });

  it("should create a log entity from json", () => {
    const log = LogEntity.fromJson(
      '{"message":"test","level":"low","origin":"test","createdAt":"2021-01-01T00:00:00.000Z"}'
    );

    expect(log).toBeInstanceOf(LogEntity);
    expect(log).toHaveProperty("message", "test");
    expect(log).toHaveProperty("level", LogSeverityLevel.LOW);
    expect(log).toHaveProperty("origin", "test");
    expect(log).toHaveProperty(
      "createdAt",
      new Date("2021-01-01T00:00:00.000Z")
    );
  });

  it("should create a log entity from object", () => {
    const log = LogEntity.fromObject(testObject);

    expect(log).toBeInstanceOf(LogEntity);
    expect(log).toHaveProperty("message", testObject.message);
    expect(log).toHaveProperty("level", testObject.level);
    expect(log).toHaveProperty("origin", testObject.origin);
    expect(log).toHaveProperty("createdAt", testObject.createdAt);
  });
});
