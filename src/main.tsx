import ReactDOM from "react-dom/client";
import App from "./App";
import { ClipboardProvider } from "./contexts/clipboard-context";
import { DatabaseProvider } from "./contexts/db-context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <StrictMode>
  <DatabaseProvider>
    <ClipboardProvider>
      <App />
    </ClipboardProvider>
  </DatabaseProvider>
  // </StrictMode>,
);
