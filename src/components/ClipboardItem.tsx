import { Box, Card, Text } from "@radix-ui/themes";
import { FC, ReactElement } from "react";
import { ClipboardEntry } from "../types";

interface ClipboardItemProps {
  item: ClipboardEntry;
}

const TextItem = ({ item }: { item: ClipboardEntry; }) => {
  return <Text>{item.content}</Text>;
};

const ImageItem = ({ item }: { item: ClipboardEntry; }) => {
  return <Text>{item.content}</Text>;
};

export const ClipboardItem: FC<ClipboardItemProps> = ({
  item,
}) => {

  // Render Item
  function renderItem(item: ClipboardEntry): ReactElement {
    switch (item.type) {
      case "image":
        return <ImageItem item={item} />;
      default:
        return <TextItem item={item} />;
    }
  }

  return (
    <Box
    >
      <Card>{renderItem(item)}</Card>
    </Box>
  );
};
