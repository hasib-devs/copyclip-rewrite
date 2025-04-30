import '@/assets/css/style.css';
import "@radix-ui/themes/styles.css";

import DefaultLayout from "@/components/layouts/Default";
import SplashScreen from '@/components/layouts/SplashScreen';
import { useDatabase } from '@/contexts/database-context';
import { Box, Theme } from "@radix-ui/themes";
import { useClipboardContext } from './contexts/clipboard-context';
import { useVimMotion } from './hooks/useVimMotion';

function App() {
  useVimMotion();
  const { isDbReady } = useDatabase();
  const { isLoading } = useClipboardContext();

  return (
    <Theme accentColor="teal" hasBackground className='bg-zinc-50'>
      {
        !isDbReady || isLoading ? <SplashScreen /> : null
      }

      <Box>
        <DefaultLayout />
      </Box>

    </Theme>
  );
}

export default App;
