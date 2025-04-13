import ReactDOM from "react-dom/client";
import App from "@/App";
import { Theme } from "@radix-ui/themes";
import { ClipboardProvider } from "./features/clipboard/clipboard-context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <StrictMode>
  <ClipboardProvider>
    <Theme accentColor="teal">
      <App />
    </Theme>
  </ClipboardProvider>
  // </StrictMode>,
);
