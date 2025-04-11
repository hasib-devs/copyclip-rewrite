import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { invoke } from "@tauri-apps/api/core";
import { useEffect } from 'react';
import "./assets/style.css";
import { HistoryList } from './components/HistoryList';

function App() {

  useEffect(() => {
    (async () => {
      console.log(await invoke('greet'));
    })();
  }, []);

  return (
    <Theme className="w-screen h-screen bg-gray-100">
      <HistoryList />
    </Theme>
  );
}

export default App;
