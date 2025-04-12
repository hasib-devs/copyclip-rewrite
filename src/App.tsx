import "@radix-ui/themes/styles.css";
import '@/assets/css/style.css';

import { Box } from "@radix-ui/themes";
import { invoke } from "@tauri-apps/api/core";
import { useEffect } from 'react';
import DefaultLayout from "./features/layouts/Default";

function App() {

  useEffect(() => {
    (async () => {
      console.log(await invoke('greet'));
    })();
  }, []);

  return (
    <Box>
      <DefaultLayout />
    </Box>
  );
}

export default App;
