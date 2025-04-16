import { AiOutlineCaretRight } from "react-icons/ai";
import "./Currency.css";
import { ChangeEvent, useState } from "react";
import TokenIcon from "../tokenIcon/TokenIcon";
import { useSwap } from "../../context/SwapContext";
import { formatWithCommas } from "../../types/wallet";
import { TEXTS } from "../../constants/staticText";

type Props = {
  balance?: string;
  title: string;
  openTokenList: (side: "from" | "to") => void;
  swapPrice?: number;
  loading: boolean;
};

function Currency({
  title,
  balance,
  openTokenList,
  swapPrice,
  loading,
}: Props) {
  const [hasError, setHasError] = useState<boolean>(false);

  const { unit, amount, setAmount } = useSwap(
    title.toLowerCase() as "from" | "to"
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatWithCommas(e.target.value);
    setAmount(formatted);

    if (formatted === "") setHasError(true);
    else {
      if (
        balance &&
        parseFloat(amount.replace(/,/g, "")) >
          parseFloat(balance.replace(/,/g, ""))
      ) {
        setHasError(true);
      } else {
        setHasError(false);
      }
    }
  };

  const setValueToMax = () => {
    setHasError(false);
    if (balance) setAmount(formatWithCommas(balance === "0" ? "1" : balance));
  };

  return (
    <div
      className="flex flex-col justify-center content-center gap-2"
      id={title}
    >
      <div
        className="flex justify-start content-center"
        style={{ fontSize: "20px" }}
      >
        {title}
      </div>
      <div className="flex justify-between content-center">
        <div className="flex justify-start items-center gap-2">
          {title === "From" ? (
            <input
              type="text"
              inputMode="decimal"
              placeholder={TEXTS.BALANCE_PLACEHOLDER}
              className={`input ${
                (balance &&
                  parseFloat(amount.replace(/,/g, "")) >
                    parseFloat(balance.replace(/,/g, ""))) ||
                hasError
                  ? "input-error"
                  : ""
              }`}
              value={amount}
              onChange={handleChange}
            />
          ) : loading ? (
            <div className="loading-wave" />
          ) : (
            <div style={{ fontSize: "25px", textAlign: "left", width: "100%" }}>
              {swapPrice && formatWithCommas(swapPrice.toFixed(2))}
            </div>
          )}
        </div>
        <div className="flex justify-end items-center gap-2">
          <TokenIcon name={unit} />
          <div className="flex justify-center items-center gap-1">
            <div
              className="flex justify-center items-center"
              style={{ fontSize: "20px" }}
            >
              {unit}
            </div>
            <button
              className="flex justify-center items-center arrow-button"
              onClick={() =>
                openTokenList(title.toLowerCase() as "from" | "to")
              }
            >
              <AiOutlineCaretRight
                size={16}
                className="flex justify-center content-center"
                style={{ marginTop: "3px" }}
              />
            </button>
          </div>
        </div>
      </div>
      {balance && (
        <div className="flex justify-between content-center">
          <button
            className="button"
            onClick={setValueToMax}
            disabled={parseFloat(amount) > parseFloat(balance)}
          >
            {TEXTS.MAX}
          </button>
          <div>
            {TEXTS.BALANCE} {formatWithCommas(balance)}
          </div>
        </div>
      )}
    </div>
  );
}

export default Currency;
