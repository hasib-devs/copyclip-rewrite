import { Avatar, Box, Card, Text } from "@radix-ui/themes";
import { FC, ReactElement } from "react";
import { ClipboardEntry } from "../types";
import { maskCreditCards } from "../utils/helpers";

interface ClipboardItemProps {
  item: ClipboardEntry;
}

const TextItem = ({ item }: { item: ClipboardEntry; }) => {
  return <Text>{
    maskCreditCards(item.content)
  }</Text>;
};

const ImageItem = ({ item }: { item: ClipboardEntry; }) => {
  return (
    <img src={`data:image/*;base64, ${item.content}`} alt="Fail to load image" />
  );
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
