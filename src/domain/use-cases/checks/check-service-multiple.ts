import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = () => void;
type ErrorCallback = (error: string) => void;

export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  private saveLogs(log: LogEntity): void {
    this.logRepository.forEach((logRepository) => {
      logRepository.saveLog(log);
    });
  }

  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      const log = new LogEntity({
        message: `${url} server is OK`,
        level: LogSeverityLevel.LOW,
        origin: "check-service-multiple.ts",
        createdAt: new Date(),
      });

      if (!req.ok) {
        throw new Error(`Failed to fetch ${url} on CheckService`);
      }

      this.successCallback();
      this.saveLogs(log);

      return true;
    } catch (error) {
      const log = new LogEntity({
        message: `${error}`,
        level: LogSeverityLevel.HIGH,
        origin: "check-service.ts",
        createdAt: new Date(),
      });

      this.errorCallback(`${error}`);

      this.saveLogs(log);

      return false;
    }
  }
}
