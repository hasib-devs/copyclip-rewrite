import { Box, Card, Text } from "@radix-ui/themes";
import React from "react";

interface ClipboardItemProps {
  content: string;
  timestamp: string;
  onClick: () => void;
}

export const ClipboardItem: React.FC<ClipboardItemProps> = ({
  content,
  onClick,
}) => (
  <Box
    onClick={onClick}
  >
    <Card>
      <Text>{content}</Text>
    </Card>
  </Box>
);
