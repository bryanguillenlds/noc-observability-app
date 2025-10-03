import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.-impl";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  public static start(): void {
    console.log(`Server is running`);

    CronService.createCronJob("*/5 * * * * *", () => {
      const url = "https://www.google.com";

      new CheckService(
        fileSystemLogRepository,
        () => console.log(`${url} server is OK`),
        (error) => console.error(error)
      ).execute(url);
      // new CheckService().execute("http://localhost:3001");
    });
  }
}
