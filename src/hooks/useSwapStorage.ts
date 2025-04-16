import { useState } from "react";

export function useSwapStorage(
  type: "from" | "to",
  defaultUnit = "USDT",
  defaultBalance = "0.00"
) {
  const BALANCE_KEY = `swap_${type}_balance`;
  const UNIT_KEY = `swap_${type}_unit`;
  const AMOUNT_KEY = `swap_${type}_amount`;

  const [balance, setBalanceState] = useState(() => {
    return localStorage.getItem(BALANCE_KEY) || defaultBalance;
  });

  const [unit, setUnitState] = useState(() => {
    if (type === "from") return localStorage.getItem(UNIT_KEY) || defaultUnit;
    else return localStorage.getItem(UNIT_KEY) || "TON";
  });

  const [amount, setAmountState] = useState(() => {
    return localStorage.getItem(AMOUNT_KEY) || "";
  });

  const setAmount = (newAmount: string) => {
    setAmountState(newAmount);
    localStorage.setItem(AMOUNT_KEY, newAmount);
  };

  const setBalance = (newBalance: string) => {
    setBalanceState(newBalance);
    localStorage.setItem(BALANCE_KEY, newBalance);
  };

  const setUnit = (newUnit: string) => {
    setUnitState(newUnit);
    localStorage.setItem(UNIT_KEY, newUnit);
  };

  const clearSwapStorage = () => {
    localStorage.removeItem(BALANCE_KEY);
    localStorage.removeItem(UNIT_KEY);
    setBalanceState("");
    setUnitState("");
  };

  return {
    balance,
    unit,
    amount,
    setBalance,
    setUnit,
    setAmount,
    clearSwapStorage,
  };
}
