import { useEffect, useState } from "react";
import SwapBox from "./swapBox/SwapBox";
import SwapButton from "./swapButton/SwapButton";
import TokenList from "./tokenList/TokenList";
import { formatWithCommas, Token, WalletData } from "../types/wallet";
import { useSwap } from "../context/SwapContext";
import { TEXTS } from "../constants/staticText";

function Swap() {
  const [openTokenList, setOpenTokenList] = useState<boolean>(false);
  const [activeSide, setActiveSide] = useState<"from" | "to">("from");
  const [tokens, setTokens] = useState<Token[]>([]);
  const { balance, setBalance, unit, amount } = useSwap();
  const [swapPrice, setSwapPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const interval = setInterval(() => {
      const randomRate = +(Math.random() * 10 + 10).toFixed(2);

      const numericAmount = parseFloat(amount.replace(/,/g, ""));
      if (!isNaN(numericAmount)) {
        const result = +(numericAmount * randomRate).toFixed(2);
        setSwapPrice(result);
        setLoading(false);
      } else {
        setSwapPrice(0.0);
        setLoading(false);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [amount, unit, balance]);

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
    from.setUnit(to.unit);
    to.setUnit(from.unit);

    from.setBalance(to.balance);
    to.setBalance(from.balance);

    from.setAmount(formatWithCommas(swapPrice.toString()));
    to.setAmount(from.amount);
  };

  return (
    <div className="flex justify-start items-content flex-col gap-4">
      <div className="font-md">{TEXTS.SWAP}</div>
      <SwapBox
        handleTokenListOpen={handleOpenTokenList}
        balance={balance}
        swapPrice={swapPrice}
        handleSwap={handleSwap}
        loading={loading}
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
