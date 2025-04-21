import '@/assets/css/style.css';
import "@radix-ui/themes/styles.css";

import DefaultLayout from "@/components/layouts/Default";
import { ClipboardProvider } from "@/contexts/clipboard-context";
import { Box, Theme } from "@radix-ui/themes";


function App() {
  return (
    <ClipboardProvider>
      <Theme accentColor="teal">
        <Box>
          <DefaultLayout />
        </Box>

      </Theme>
    </ClipboardProvider>
  );
}

export default App;
