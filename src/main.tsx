import App from "@/App";
import ReactDOM from "react-dom/client";
import { GlobalProvider } from "./contexts/global-context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <StrictMode>
  <GlobalProvider>
    <App />
  </GlobalProvider>
  // </StrictMode>,
);
