import { createContext, useContext } from "react";
import { useSwapStorage } from "../hooks/useSwapStorage";

type SwapSide = "from" | "to";

type SwapContextType = {
  from: ReturnType<typeof useSwapStorage>;
  to: ReturnType<typeof useSwapStorage>;
};

const SwapContext = createContext<SwapContextType | undefined>(undefined);

export const SwapProvider = ({ children }: { children: React.ReactNode }) => {
  const from = useSwapStorage("from");
  const to = useSwapStorage("to");

  return (
    <SwapContext.Provider value={{ from, to }}>{children}</SwapContext.Provider>
  );
};

export const useSwap = (side: SwapSide = "from") => {
  const context = useContext(SwapContext);
  if (!context) {
    throw new Error("useSwap must be used within a SwapProvider");
  }
  return context[side];
};
