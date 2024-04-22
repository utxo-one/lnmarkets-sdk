// client.ts

import axios from "axios";
import { createHmac } from "crypto";
import { URLSearchParams } from "url";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

interface ClientConfig {
  apiKey: string;
  passphrase: string;
  secret: string;
  baseURL?: string;
}

export class ApiClient {
  private client;
  private apiKey: string;
  private passphrase: string;
  private secret: string;

  constructor({
    apiKey,
    passphrase,
    secret,
    baseURL = "https://api.lnmarkets.com/",
  }: ClientConfig) {
    this.apiKey = apiKey;
    this.passphrase = passphrase;
    this.secret = secret;
    this.client = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async call(
    method: "GET" | "POST" | "PUT" | "DELETE",
    path: string,
    data?: any
  ): Promise<any> {
    const timestamp = Date.now().toString(); // Milliseconds since the Unix epoch
    let params = "";
    let url = path;

    if (["GET", "DELETE"].includes(method) && data) {
      params = new URLSearchParams(data).toString();
      url += `?${params}`;
    } else if (data) {
      params = JSON.stringify(data);
    }

    const signature = createHmac("sha256", this.secret)
      .update(timestamp + method + path + params)
      .digest("base64");

    let config = {
      headers: {
        "LNM-ACCESS-KEY": this.apiKey,
        "LNM-ACCESS-PASSPHRASE": this.passphrase,
        "LNM-ACCESS-SIGNATURE": signature,
        "LNM-ACCESS-TIMESTAMP": timestamp,
      },
      data: params,
    };

    let response;
    try {
      response = await this.client.request({
        url,
        method,
        ...config,
        data: data && !["GET", "DELETE"].includes(method) ? data : undefined,
      });
    } catch (error) {
      console.error("Error in API call:", error);
      throw error;
    }

    return response.data;
  }
}

// Create an instance of ApiClient using environment variables
const apiClient = new ApiClient({
  apiKey: process.env.LNMARKETS_API_KEY!,
  passphrase: process.env.LNMARKETS_API_PASSPHRASE!,
  secret: process.env.LNMARKETS_API_SECRET!,
  baseURL: process.env.LNMARKETS_BASE_URL,
});

export { apiClient };
