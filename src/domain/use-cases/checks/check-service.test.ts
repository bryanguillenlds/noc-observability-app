import { LogEntity } from "../../entities/log.entity";
import { CheckService } from "./check-service";

describe("CheckService Use Case", () => {
  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const mockSuccessCallback = jest.fn();
  const mockErrorCallback = jest.fn();

  const checkService = new CheckService(
    mockLogRepository,
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
    expect(mockLogRepository.saveLog).toHaveBeenCalled();
    expect(mockErrorCallback).not.toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });

  it("should call errorCallback if fetch return is not ok", async () => {
    const checkResult = await checkService.execute(
      "https://www.gorrogle.com.invalid"
    );

    expect(checkResult).toBe(false);
    expect(mockErrorCallback).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalled();
    expect(mockSuccessCallback).not.toHaveBeenCalled();
  });
});
