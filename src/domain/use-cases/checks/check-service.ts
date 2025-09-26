interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

export class CheckService implements CheckServiceUseCase {
  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);

      if (!req.ok) {
        throw new Error(`Failed to fetch ${url} on CheckService`);
      }

      console.log(`${url} server is OK`);

      return true;
    } catch (error) {
      console.error(`Error on CheckService: ${error}`);

      return false;
    }
  }
}
