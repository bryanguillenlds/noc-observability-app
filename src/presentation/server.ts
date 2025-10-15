import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.-impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { EmailService } from "./email/email.service";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs";
import { MongoLogDatasource } from "../infrastructure/datasources/mongo-log.datasource";
import { PostgresqlLogDatasource } from "../infrastructure/datasources/postgresql-log.datasource";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple";

const logRepository = new LogRepositoryImpl(
  // new FileSystemDatasource()
  // new MongoLogDatasource()
  new PostgresqlLogDatasource()
);

const FileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const MongoLogRepository = new LogRepositoryImpl(new MongoLogDatasource());

const PostgresqlLogRepository = new LogRepositoryImpl(
  new PostgresqlLogDatasource()
);

const emailService = new EmailService();

export class Server {
  public static start(): void {
    console.log(`Server is running`);

    // new SendEmailLogs(fileSystemLogRepository, emailService).execute([
    //   "test@test.com",
    //   "test2@test.com",
    // ]);

    // CronService.createCronJob("*/5 * * * * *", () => {
    //   const url = "https://www.google.com";

    //   new CheckService(
    //     logRepository,
    //     () => console.log(`${url} server is OK`),
    //     (error) => console.error(error)
    //   ).execute(url);
    //   // new CheckService().execute("http://localhost:3001");
    // });

    CronService.createCronJob("*/5 * * * * *", () => {
      const url = "https://www.google.com";

      new CheckServiceMultiple(
        [FileSystemLogRepository, MongoLogRepository, PostgresqlLogRepository],
        () => console.log(`${url} server is OK`),
        (error) => console.error(error)
      ).execute(url);
      // new CheckService().execute("http://localhost:3001");
    });
  }
}
