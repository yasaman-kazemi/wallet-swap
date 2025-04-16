import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { SwapProvider } from "./context/SwapContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SwapProvider>
      <App />
    </SwapProvider>
  </StrictMode>
);
