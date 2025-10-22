import { SendEmailLogs } from "./send-email-logs";
import { LogEntity } from "../../entities/log.entity";

describe("SendEmailLogs Use Case", () => {
  const mockEmailService = {
    sendEmailWithFSLogs: jest.fn().mockReturnValue(true),
  };

  const mockLogRepository = {
    saveLog: jest.fn(),
    getLogs: jest.fn(),
  };

  const sendEmailLogsUseCase = new SendEmailLogs(
    mockLogRepository,
    mockEmailService as any
  );

  it("should call send email and save log", async () => {
    const result = await sendEmailLogsUseCase.execute(["test@test.com"]);

    expect(result).toBe(true);
    expect(mockEmailService.sendEmailWithFSLogs).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });

  it("should call error if send email fails", async () => {
    mockEmailService.sendEmailWithFSLogs.mockReturnValue(false);
    const result = await sendEmailLogsUseCase.execute(["test@test.com"]);

    expect(result).toBe(false);
    expect(mockEmailService.sendEmailWithFSLogs).toHaveBeenCalled();
    expect(mockLogRepository.saveLog).toHaveBeenCalledWith(
      expect.any(LogEntity)
    );
  });
});
