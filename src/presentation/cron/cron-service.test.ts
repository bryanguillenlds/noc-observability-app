import { CronService } from "./cron-service";
import { CronJob } from "cron";

describe("CronService", () => {
  const mockTick = jest.fn();

  it("should create a job with the correct cron time and onTick function", (done) => {
    const cronTime = "* * * * * *";
    const job = CronService.createCronJob(cronTime, mockTick);

    setTimeout(() => {
      expect(mockTick).toHaveBeenCalledTimes(2);
      job.stop();
      done();
    }, 2000);
  });
});
