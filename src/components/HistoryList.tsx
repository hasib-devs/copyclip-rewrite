import { Heading } from "@radix-ui/themes";
import React from "react";
import { ClipboardItem } from "./ClipboardItem";
import { useClipboardContext } from "../hooks";

export const HistoryList: React.FC = () => {
  const { history } = useClipboardContext();
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
