export type Token = {
  name: string;
  available: {
    amount: {
      number: string;
      unit: string;
    };
    values: {
      number: string;
      unit: string;
    }[];
  };
  marketData: MarketDataEntry[];
};

export type MarketDataEntry = {
  source: string;
  destination: string;
  marketData: {
    bestSell: string;
    bestBuy: string;
    latestPrice: string;
    dayChange: string;
  };
};

export type WalletData = {
  status: string;
  result: {
    totalValue: {
      number: string;
      unit: string;
    }[];
    tokens: Token[];
  };
};

export const formatWithCommas = (input: string): string => {
  const sanitized = input.replace(/[^\d.]/g, "");

  const [integerPart, decimalPart] = sanitized.split(".");

  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return decimalPart !== undefined
    ? `${formattedInteger}.${decimalPart}`
    : formattedInteger;
};
