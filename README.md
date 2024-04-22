# LNMarkets.com Typescript SDK

This LNMarkets.com TypescriptSDK provides developers with a powerful tool to interact with futures trading APIs, enabling the creation, management, and tracking of trades programmatically. Ideal for integrating futures trading capabilities directly into financial applications.

## Installation

Install the package via npm to integrate it into your project:

```bash
npm install lnmarkets --save
```

## Usage

Here’s how you can start using the Futures Trading SDK in your project.

### Importing and Initialization

First, you need to import and configure the API client with your credentials:

```javascript
import { ApiClient, Futures } from "your-package-name";

// Set up the API client
const apiClient = new ApiClient({
  apiKey: "your_api_key",
  passphrase: "your_api_passphrase",
  secret: "your_api_secret",
  baseURL: "https://api.yourdomain.com/",
});

// Initialize the Futures module
const futures = new Futures(apiClient);
```

### Opening a Trade

To open a new trade, you can use the `openTrade` method. Here’s an example of how to do that:

```javascript
async function openNewTrade() {
  try {
    const tradeDetails = {
      type: "l", // 'l' for limit, 'm' for market
      side: "b", // 'b' for buy, 's' for sell
      leverage: 10,
      quantity: 100,
      margin: 1000,
      price: 20000, // Required for limit orders
    };

    const response = await futures.openTrade(tradeDetails);
    console.log("Trade opened successfully:", response);
  } catch (error) {
    console.error("Failed to open trade:", error);
  }
}

openNewTrade();
```

### Fetching Trades

You can fetch trades using the `getTrades` method:

```javascript
async function fetchTrades() {
  try {
    const trades = await futures.getTrades({
      type: "closed", // Options: 'open', 'closed', 'running'
      limit: 100,
    });

    console.log("Trades:", trades);
  } catch (error) {
    console.error("Failed to fetch trades:", error);
  }
}

fetchTrades();
```

## Contributing

Contributions are welcome! If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.
