import '@/assets/css/style.css';
import "@radix-ui/themes/styles.css";

import DefaultLayout from "@/components/layouts/Default";
import { ClipboardProvider } from "@/contexts/clipboard-context";
import { Box, Theme } from "@radix-ui/themes";
import { invoke } from "@tauri-apps/api/core";
import { useEffect } from 'react';

function App() {

  useEffect(() => {
    (async () => {
      console.log(await invoke('greet'));
    })();
  }, []);

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
