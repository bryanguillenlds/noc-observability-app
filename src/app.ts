import { envs } from "./config/plugins/env.plugin";
import { MongoDatabase } from "./data/mongo";
import { Server } from "./presentation/server";
import { PrismaClient } from "@prisma/client";

const main = async () => {
  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGO_DB_NAME,
  });

  const prisma = new PrismaClient();

  Server.start();
};

// Using an async IIFE (Immediately Invoked Function Expression) is necessary here because:
// 1. Top-level await is not available in all Node.js versions/contexts (version fo node, also if we are
// using typescript with the right targets and ES Modules...also depending on browser being able to run ES2022)
// 2. It allows us to properly handle the async main() function and any potential errors
// 3. It ensures the application starts correctly by waiting for async initialization
(async () => {
  await main();
})();
