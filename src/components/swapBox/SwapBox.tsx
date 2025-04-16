import Currency from "../currency/Currency";
import { AiOutlineSwap } from "react-icons/ai";
import "./SwapBox.css";

type Props = {
  handleTokenListOpen: (side: "from" | "to") => void;
  balance: string;
  swapPrice: number;
  handleSwap: () => void;
  loading: boolean;
};

function SwapBox({
  handleTokenListOpen,
  balance,
  swapPrice,
  handleSwap,
  loading,
}: Props) {
  return (
    <div className="flex justify-center content-center flex-col p-4 mx-4 swap-box gap-2">
      <Currency
        title="From"
        balance={balance}
        openTokenList={handleTokenListOpen}
        loading={loading}
      />
      <div className="separator">
        <div className="line" />
        <button className="swap-icon-button" onClick={handleSwap}>
          <AiOutlineSwap className="swap-icon" />
        </button>
        <div className="line" />
      </div>
      <Currency
        title="To"
        openTokenList={handleTokenListOpen}
        swapPrice={swapPrice}
        loading={loading}
      />
    </div>
  );
}

export default SwapBox;
