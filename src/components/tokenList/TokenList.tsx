import { ChangeEvent, useState } from "react";
import BottomSheet from "../bottomSheet/BottomSheet";
import "./TokenList.css";
import { formatWithCommas, Token } from "../../types/wallet";
import TokenIcon from "../tokenIcon/TokenIcon";
import { useSwap } from "../../context/SwapContext";
import { TEXTS } from "../../constants/staticText";

type Props = {
  openTokenList: boolean;
  handleClose: () => void;
  tokens: Token[];
  side: "from" | "to";
};

function TokenList({ openTokenList, handleClose, tokens, side }: Props) {
  const [value, setValue] = useState<string>("");

  const { setUnit } = useSwap(side);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const token = e.target.value;
    setValue(token);
  };

  function getTokenUSDTValue(token: Token): string {
    const amount = parseFloat(token.available.amount.number);
    const price = parseFloat(
      token.marketData.find((entry) => entry.destination === "USDT")?.marketData
        .latestPrice || "0"
    );

    const total = amount * price;

    return total.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    });
  }

  const changeUnit = (token: string) => {
    setUnit(token);
    handleClose();
  };

  return (
    <BottomSheet isOpen={openTokenList} onClose={handleClose}>
      <div
        className="flex justify-center content-center flex-col gap-4 p-2 "
        style={{ overflow: "scroll" }}
      >
        <div className="flex justify-center content-center token-list-title">
          {TEXTS.TOKEN_LIST_TITLE}
        </div>
        <div className="search-wrapper">
          <input
            className="search-input"
            type="text"
            placeholder={TEXTS.SEARCH_PLACEHOLDER}
            value={value}
            onChange={handleChange}
          />
          {value && (
            <button
              className="clear-button"
              aria-label="Clear search"
              onClick={() => setValue("")}
            >
              {TEXTS.CLOSE_SIGN}
            </button>
          )}
        </div>
        <ul className="token-list-scroll">
          {tokens
            .filter((token) =>
              token.name.toLowerCase().includes(value.trim().toLowerCase())
            )
            .map((token, index) => {
              return (
                <li
                  key={token.name + index}
                  className={`flex justify-center flex-col  ${
                    index !==
                    tokens.filter((token) =>
                      token.name
                        .toLowerCase()
                        .includes(value.trim().toLowerCase())
                    ).length -
                      1
                      ? "token-with-border"
                      : ""
                  }`}
                >
                  <button
                    className="token"
                    onClick={() => changeUnit(token.name)}
                  >
                    <div className="flex items-center gap-2">
                      <TokenIcon name={token.name} />
                      <div className="flex justify-center content-center token-name">
                        {token.name}
                      </div>
                    </div>
                    <div className="flex flex-col content-center gap-1">
                      <div className="token-amount">
                        {formatWithCommas(token.available.amount.number)}
                      </div>
                      <div className=" token-equivalent ">
                        {TEXTS.APPROXIMATELY_EQUAL_SIGN}{" "}
                        {getTokenUSDTValue(token)}
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
        </ul>
      </div>
    </BottomSheet>
  );
}

export default TokenList;
