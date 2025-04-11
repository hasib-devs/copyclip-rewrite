import '@radix-ui/themes/styles.css';
import "./assets/style.css";
import { Theme } from '@radix-ui/themes';
import { HistoryList } from './components/HistoryList';

function App() {
  return (
    <Theme className="w-screen h-screen bg-gray-100">
      <HistoryList />
    </Theme>
  );
}

export default App;
