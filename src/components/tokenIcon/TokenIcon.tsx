import ada from "../../assets/coins/ada.svg";
// import arb from "../../assets/coins/arb.svg";
import avax from "../../assets/coins/avax.svg";
import bitcoin from "../../assets/coins/bitcoin.png";
import bnb from "../../assets/coins/bnb.svg";
import doge from "../../assets/coins/doge.svg";
// import hmstr from "../../assets/coins/hmstr.png";
import ethereum from "../../assets/coins/ethereum.svg";
// import irt from "../../assets/coins/irt.svg";
// import near from "../../assets/coins/near.svg";
import not from "../../assets/coins/not.svg";
import shib from "../../assets/coins/shib.svg";
import sol from "../../assets/coins/sol.svg";
import tether from "../../assets/coins/tether.svg";
import ton from "../../assets/coins/ton.svg";
import tron from "../../assets/coins/tron.svg";
import xrp from "../../assets/coins/xrp.svg";

type Props = {
  name: string;
  size?: number;
};

const iconMap: Record<string, string> = {
  BTC: bitcoin,
  ETH: ethereum,
  USDT: tether,
  TRX: tron,
  TON: ton,
  BNB: bnb,
  SOL: sol,
  XRP: xrp,
  AVAX: avax,
  DOGE: doge,
  SHIB: shib,
  ADA: ada,
  NOT: not,
};

function TokenIcon({ name, size = 35 }: Props) {
  const icon = iconMap[name.toUpperCase()];

  return (
    <img
      src={icon}
      alt={name}
      width={size}
      height={size}
      className="flex justify-center content-center"
    />
  );
}

export default TokenIcon;
