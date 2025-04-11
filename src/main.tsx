import ReactDOM from "react-dom/client";
import App from "./App";
import { ClipboardProvider } from "./contexts/clipboard-context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <StrictMode>
  <ClipboardProvider>
    <App />
  </ClipboardProvider>
  // </StrictMode>,
);
