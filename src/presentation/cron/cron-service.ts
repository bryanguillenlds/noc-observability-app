import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
  static createCronJob(cronTime: CronTime, onTick: OnTick): CronJob {
    const job = new CronJob(
      cronTime, // cronTime
      onTick // What do to on every interval of the job
      // null, // onComplete
      // true, // start
      // "America/Los_Angeles" // timeZone
    );

    job.start();

    return job;
  }
}
