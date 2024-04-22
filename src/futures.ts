import { ApiClient } from "./client"; // Assuming your API client setup is in 'client.ts'

interface GetTradesParams {
  type: "running" | "open" | "closed";
  from?: number;
  to?: number;
  limit?: number;
}

export class Futures {
  private client: ApiClient;

  constructor(client: ApiClient) {
    this.client = client;
  }

  async getTrades(params: GetTradesParams): Promise<GetTradesResponse> {
    try {
      const response = await this.client.call("GET", "/v2/futures", params);
      return response;
    } catch (error) {
      console.error("Error fetching trades:", error);
      throw error;
    }
  }

  async openTrade(request: OpenTradeRequest): Promise<OpenTradeResponse> {
    if (request.type === "l" && request.price === undefined) {
      throw new Error('Price must be included for limit orders (type "l").');
    }
    try {
      const response = await this.client.call("POST", "/v2/futures", request);
      return response;
    } catch (error) {
      console.error("Error opening trade:", error);
      throw error;
    }
  }
}
