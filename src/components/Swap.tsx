import { useEffect, useState } from "react";
import SwapBox from "./swapBox/SwapBox";
import SwapButton from "./swapButton/SwapButton";
import TokenList from "./tokenList/TokenList";
import { Token, WalletData } from "../types/wallet";
import { useSwap } from "../context/SwapContext";

function Swap() {
  const [openTokenList, setOpenTokenList] = useState<boolean>(false);
  const [activeSide, setActiveSide] = useState<"from" | "to">("from");
  const [tokens, setTokens] = useState<Token[]>([]);
  const { balance, setBalance, unit, amount } = useSwap();
  const [swapPrice, setSwapPrice] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomRate = +(Math.random() * 1000 + 1000).toFixed(2);

      const numericAmount = parseFloat(amount.replace(/,/g, ""));
      if (!isNaN(numericAmount)) {
        const result = numericAmount * randomRate;
        setSwapPrice(result);
      } else {
        setSwapPrice(0.0);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [amount, unit]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data: WalletData) => {
        setTokens(data.result.tokens);
        setBalance(data.result.totalValue[1].number);
      });
  }, []);

  useEffect(() => {
    const selectedToken = tokens.find((token) => token.name === unit);
    if (selectedToken) {
      setBalance(selectedToken.available.amount.number);
    }
  }, [unit, tokens]);

  const handleOpenTokenList = (side: "from" | "to") => {
    setActiveSide(side);
    setOpenTokenList(true);
  };

  const from = useSwap("from");
  const to = useSwap("to");

  const handleSwap = () => {
    const tempUnit = from.unit;
    const tempBalance = from.balance;
    const tempAmount = from.amount;

    from.setUnit(to.unit);
    from.setBalance(to.balance);
    from.setAmount(to.amount);

    to.setUnit(tempUnit);
    to.setBalance(tempBalance);
    to.setAmount(tempAmount);
  };

  return (
    <div className="flex justify-start items-content flex-col gap-4">
      <div style={{ fontSize: "30px" }}>Swap</div>
      <SwapBox
        handleTokenListOpen={handleOpenTokenList}
        balance={balance}
        swapPrice={swapPrice}
        handleSwap={handleSwap}
      />
      <SwapButton />
      <TokenList
        openTokenList={openTokenList}
        handleClose={() => setOpenTokenList(false)}
        tokens={tokens}
        side={activeSide}
      />
    </div>
  );
}

export default Swap;
