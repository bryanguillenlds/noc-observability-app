import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.-impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";

const logRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
  // new MongoLogDatasource()
);

const emailService = new EmailService();

export class Server {
  public static start(): void {
    console.log(`Server is running`);

    // new SendEmailLogs(fileSystemLogRepository, emailService).execute([
    //   "test@test.com",
    //   "test2@test.com",
    // ]);

    CronService.createCronJob("*/5 * * * * *", () => {
      const url = "https://www.google.com";

      new CheckService(
        logRepository,
        () => console.log(`${url} server is OK`),
        (error) => console.error(error)
      ).execute(url);
      // new CheckService().execute("http://localhost:3001");
    });
  }
}
