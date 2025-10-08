import { EmailService } from "../../../presentation/email/email.service";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface SendEmailLogsUseCase {
  execute: (to: string | string[]) => Promise<boolean>;
}

export class SendEmailLogs implements SendEmailLogsUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly emailService: EmailService
  ) {}

  async execute(to: string | string[]): Promise<boolean> {
    try {
      const sent = await this.emailService.sendEmailWithFSLogs(to);

      if (!sent) {
        throw new Error("Failed to send email with logs");
      }

      const log = new LogEntity({
        message: `Email with logs sent to ${to}`,
        level: LogSeverityLevel.LOW,
        origin: "send-email-logs.ts",
      });

      this.logRepository.saveLog(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `Failed to send email with logs`,
        level: LogSeverityLevel.HIGH,
        origin: "send-email-logs.ts",
      });

      this.logRepository.saveLog(log);

      return false;
    }
  }
}
