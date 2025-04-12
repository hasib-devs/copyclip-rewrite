import ReactDOM from "react-dom/client";
import App from "@/App";
import { ClipboardProvider } from "@/contexts/clipboard-context";
import { DatabaseProvider } from "@/contexts/db-context";
import { Theme } from "@radix-ui/themes";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <StrictMode>
  <DatabaseProvider>
    <ClipboardProvider>

      <Theme accentColor="teal">
        <App />
      </Theme>

    </ClipboardProvider>
  </DatabaseProvider>
  // </StrictMode>,
);
