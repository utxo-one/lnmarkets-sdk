import assert from "assert";
import { apiClient } from "../src/client"; // Import the ApiClient instance
import { Futures } from "../src/futures";

// Create an instance of the Futures class
const futures = new Futures(apiClient);

async function testGetTrades() {
  try {
    const trades = await futures.getTrades({
      type: "closed", // Fetch closed trades
      limit: 100,
    });

    assert(trades.length > 0, "No trades found");
    assert(trades[0].closed, "Trade is not closed");

    console.log("First Trade Margin:", trades[0].margin);
  } catch (error) {
    console.error("Failed to fetch trades:", error);
  }
}

async function testOpenTrade() {
  try {
    // Define a new trade request object with explicit types
    const newTradeRequest: OpenTradeRequest = {
      type: "l", // Limit order, explicitly using the 'l' | 'm' type
      side: "b", // Buy side, ensure this is 'b' | 's'
      leverage: 10,
      margin: 1000,
      price: 55000, // Required since type is 'l'
    };

    // Attempt to open a new trade
    const tradeResponse = await futures.openTrade(newTradeRequest);

    // Assertions to verify the trade opened correctly
    console.assert(tradeResponse.id, "No trade ID returned");
    console.assert(tradeResponse.open, "Trade should be open");
    console.assert(tradeResponse.type === "l", "Trade type is incorrect");
    console.assert(tradeResponse.price === 20000, "Trade price is incorrect");

    console.log("Trade opened successfully:", tradeResponse);

    // Additional checks could be added here depending on what needs to be tested
    console.log("Trade opened successfully:", tradeResponse.id);
  } catch (error) {
    console.error("Failed to open trade:", error);
  }
}

testOpenTrade();
