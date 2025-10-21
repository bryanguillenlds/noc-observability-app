import mongoose from "mongoose";

interface ConnectionOptions {
  mongoUrl: string;
  dbName: string;
}

export class MongoDatabase {
  static async connect(options: ConnectionOptions) {
    const { mongoUrl, dbName } = options;

    try {
      await mongoose.connect(mongoUrl, {
        dbName,
      });
      // console.log("Connected to MongoDB");

      return true;
    } catch (error) {
      // console.error(error);
      throw new Error("Failed to connect to MongoDB");
    }
  }
}
