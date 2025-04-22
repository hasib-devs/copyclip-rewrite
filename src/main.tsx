import App from "@/App";
import ReactDOM from "react-dom/client";
import { DatabaseProvider } from "./contexts/database-context";
import { ClipboardProvider } from "@/contexts/clipboard-context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <StrictMode>
  <DatabaseProvider>
    <ClipboardProvider>
      <App />
    </ClipboardProvider>
  </DatabaseProvider>
  // </StrictMode>,
);
