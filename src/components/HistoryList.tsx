import { Heading } from "@radix-ui/themes";
import React from "react";
import { ClipboardItem } from "./ClipboardItem";
import { useClipboard } from "../hooks";

export const HistoryList: React.FC = () => {
  const { history } = useClipboard();
  return (
    <div className="p-4">
      <Heading>📋 Clipboard History</Heading>

      <div className="mt-5">
        {history.map((entry, index) => (
          <ClipboardItem
            key={index}
            item={entry}
          />
        ))}
      </div>
    </div>
  );
};
