import { envs } from "./env.plugin";

describe("EnvPlugin", () => {
  it("should return env options", () => {
    expect(envs.PORT).toBe(Number(process.env.PORT));
    expect(envs.MAILER_EMAIL).toBe(process.env.MAILER_EMAIL);
    expect(envs.MAILER_SECRET_KEY).toBe(process.env.MAILER_SECRET_KEY);
    expect(envs.MAILER_SERVICE).toBe(process.env.MAILER_SERVICE);
    expect(envs.PROD).toBe(process.env.PROD === "true");
    expect(envs.MONGO_URL).toBe(process.env.MONGO_URL);
    expect(envs.MONGO_DB_NAME).toBe(process.env.MONGO_DB_NAME);
    expect(envs.MONGO_USER).toBe(process.env.MONGO_USER);
    expect(envs.MONGO_PASS).toBe(process.env.MONGO_PASS);
  });

  it("should throw an error if the environment variables are not set", async () => {
    // Forcing modules to be re-imported fresh on the next require()/import.
    jest.resetModules();

    process.env.PORT = "ABC";

    try {
      await import("./env.plugin");
    } catch (error) {
      expect(`${error}`).toContain('"PORT" should be a valid integer');
    }
  });
});
