import { LogEntity } from "../../entities/log.entity";
import { CheckServiceMultiple } from "./check-service-multiple";

describe("CheckService Use Case", () => {
  const mockLogRepositories = [
    {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    },
    {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    },
    {
      saveLog: jest.fn(),
      getLogs: jest.fn(),
    },
  ];

  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();

  const checkService = new CheckServiceMultiple(
    mockLogRepositories,
    mockSuccessCallback,
    mockErrorCallback
  );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call successCallback if fetch return is ok", async () => {
    const checkResult = await checkService.execute("https://www.google.com");

    expect(checkResult).toBe(true);
    expect(mockSuccessCallback).toHaveBeenCalled();
    expect(mockLogRepositories[0]?.saveLog).toHaveBeenCalled();
    expect(mockErrorCallback).not.toHaveBeenCalled();
    expect(mockLogRepositories[0]?.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });

  it("should call errorCallback if fetch return is not ok", async () => {
    const checkResult = await checkService.execute(
      "https://www.gorrogle.com.invalid"
    );

    expect(checkResult).toBe(false);
    expect(mockErrorCallback).toHaveBeenCalled();
    expect(mockLogRepositories[0]?.saveLog).toHaveBeenCalled();
    expect(mockSuccessCallback).not.toHaveBeenCalled();
  });
});
