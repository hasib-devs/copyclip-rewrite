import '@radix-ui/themes/styles.css';
import "./assets/style.css";
import { Theme } from '@radix-ui/themes';
import { HistoryList } from './components/HistoryList';
import { ClipboardProvider } from './contexts/clipboard-context';

function App() {
  return (
    <Theme className="w-screen h-screen bg-gray-100">
      <ClipboardProvider>
        <HistoryList />
      </ClipboardProvider>
    </Theme>
  );
}

export default App;
