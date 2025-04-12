import * as ScrollArea from '@radix-ui/react-scroll-area';
import { useClipboard } from '../../hooks';
import { ClipboardItem } from './ClipboardItem';
import { SearchBar } from './Searchbar';

export const ClipboardView = () => {
  const { filteredHistory } = useClipboard();

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 p-3">
      <div className="">
        {/* Search Header */}
        <SearchBar />

        {/* History List */}
        <ScrollArea.Root className="h-[calc(100vh-100px)] overflow-hidden">
          <ScrollArea.Viewport className="w-full h-full rounded-lg">
            <div className="space-y-2">
              {filteredHistory.map((entry) => (
                <ClipboardItem key={entry.id} entry={entry} />
              ))}
            </div>
          </ScrollArea.Viewport>
          <ScrollArea.Scrollbar orientation="vertical">
            <ScrollArea.Thumb className="bg-gray-200 dark:bg-gray-700 rounded-full relative" />
          </ScrollArea.Scrollbar>
        </ScrollArea.Root>
      </div>
    </div>
  );
};