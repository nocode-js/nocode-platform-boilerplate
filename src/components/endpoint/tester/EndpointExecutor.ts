import { ApiClient } from '@/lib/apiClient/ApiClient';

export class EndpointExecutor {
  public constructor(private readonly log: (message: string) => void) {}

  public async execute(url: string, inputs: Record<string, unknown>): Promise<void> {
    const startTime = Date.now();

    try {
      this.log('Executing...');

      const response = await ApiClient.executeEndpoint(url, inputs);

      const endTime = Date.now();
      const duration = endTime - startTime;
      this.log(`Executed in ${duration}ms`);

      for (const serverLog of response.__logs) {
        this.log(`~ ${serverLog}`);
      }

      const outputNames = Object.keys(response).filter(key => key !== '__logs');
      if (outputNames.length > 0) {
        this.log('Outputs:');
        for (const outputName of outputNames) {
          this.log(`~ ${outputName} = ${response[outputName]}`);
        }
      }
    } catch (e) {
      const message = e instanceof Error ? e.message : String(e);
      this.log(`An error occurred: ${message}`);
    }
  }
}
