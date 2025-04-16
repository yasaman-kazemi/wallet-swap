import { TEXTS } from "../../constants/staticText";
import "./SwapButton.css";
function SwapButton() {
  return (
    <div className="swap-button" onClick={() => alert("For now, nothing!")}>
      {TEXTS.CONTINUE}
    </div>
  );
}

export default SwapButton;
