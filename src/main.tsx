import App from "@/App";
import ReactDOM from "react-dom/client";
import { DatabaseProvider } from "./contexts/database-context";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <StrictMode>
  <DatabaseProvider>
    <App />
  </DatabaseProvider>
  // </StrictMode>,
);
