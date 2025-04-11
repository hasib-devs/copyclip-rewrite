import { Heading } from "@radix-ui/themes";
import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import React, { useEffect, useState } from "react";
import { ClipboardItem } from "./ClipboardItem";

interface ClipboardEntry {
  content: string;
  timestamp: string;
}

export const HistoryList: React.FC = () => {
  const [history, setHistory] = useState<ClipboardEntry[]>([
    {
      content: "Hello world",
      timestamp: Date.now().toString()
    }
  ]);

  useEffect(() => {
    const unlisten = listen<ClipboardEntry>("clipboard_update", (event) => {
      setHistory((prev) => [event.payload, ...prev]);
    });

    invoke("start_clipboard_monitor");

    return () => {
      unlisten.then((fn) => fn());
    };
  }, []);

  return (
    <div className="p-4">
      <Heading>📋 Clipboard History</Heading>

      <div className="mt-5">
        {history.map((entry, index) => (
          <ClipboardItem
            key={index}
            content={entry.content}
            timestamp={entry.timestamp}
            onClick={() => navigator.clipboard.writeText(entry.content)}
          />
        ))}
      </div>
    </div>
  );
};
