interface Trade {
  id: string;
  uid: string;
  type: string;
  side: string;
  opening_fee: number;
  closing_fee: number;
  maintenance_margin: number;
  quantity: number;
  margin: number;
  leverage: number;
  price: number;
  liquidation: number;
  stoploss?: number;
  takeprofit?: number;
  exit_price?: number;
  pl: number;
  creation_ts: number;
  market_filled_ts: number;
  closed_ts: number;
  open: boolean;
  running: boolean;
  canceled: boolean;
  closed: boolean;
  last_update_ts: number;
  sum_carry_fees: number;
  entry_price: number;
  entry_margin: number;
}

type GetTradesResponse = Trade[];

// Define the type for the request body of the openTrade function
interface OpenTradeRequest {
  type: "m" | "l";
  side: "b" | "s";
  leverage: number;
  price?: number; // Optional because it's only required if type is "l"
  quantity?: number;
  margin?: number;
  takeprofit?: number;
  stoploss?: number;
}

// Define the type for the response object of the openTrade function
interface OpenTradeResponse {
  id: string;
  uid: string;
  type: "l" | "m";
  side: "b" | "s";
  opening_fee: number;
  closing_fee: number;
  maintenance_margin: number;
  quantity: number;
  margin: number;
  leverage: number;
  price: number;
  liquidation: number;
  stoploss?: number;
  takeprofit?: number;
  exit_price?: number;
  pl: number;
  creation_ts: number;
  market_filled_ts?: number;
  closed_ts?: number;
  open: boolean;
  running: boolean;
  canceled: boolean;
  closed: boolean;
  last_update_ts: number;
  sum_carry_fees: number;
  entry_price?: number;
  entry_margin?: number;
}
