import { model, Schema } from "mongoose";
import { LogSeverityLevel } from "../../../domain/entities/log.entity";

const logSchema = new Schema({
  level: {
    type: String,
    enum: Object.values(LogSeverityLevel), // This extracts ["low", "medium", "high"]
    default: LogSeverityLevel.LOW,
  },
  message: {
    type: String,
    required: true,
  },
  origin: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const LogModel = model("Log", logSchema);
