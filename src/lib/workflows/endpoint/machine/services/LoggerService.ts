export class LoggerService {
  private readonly logs: string[] = [];

  public log(message: string): void {
    this.logs.push(message);
  }

  public popAll(): string[] {
    const logs = [...this.logs];
    this.logs.length = 0;
    return logs;
  }
}
