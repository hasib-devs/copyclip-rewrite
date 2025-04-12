import { Box, Card, Tabs, Text } from "@radix-ui/themes";
import ClipboardList from "@/features/clipboard/ClipboardList";

const DefaultLayout = () => {
    return (
        <Tabs.Root defaultValue="Clipboard">
            <Tabs.List justify="center" color="gray" highContrast>
                <Tabs.Trigger title="Clipboard List" value="Clipboard">📋</Tabs.Trigger>
                <Tabs.Trigger title="Emoji" value="Emoji">🫥</Tabs.Trigger>
                <Tabs.Trigger title="Todo" value="Todo">📒</Tabs.Trigger>
                <Tabs.Trigger title="Settings" value="Settings">⚙️</Tabs.Trigger>
            </Tabs.List>

            <Box p="4">
                <Tabs.Content value="Clipboard">
                    <ClipboardList />
                </Tabs.Content>

                <Tabs.Content value="Emoji">
                    <Text size="2">Emoji List</Text>
                </Tabs.Content>

                <Tabs.Content value="Todo">
                    <Text size="2">Todo List</Text>
                </Tabs.Content>

                <Tabs.Content value="Settings">
                    <Text size="2">Settings</Text>
                </Tabs.Content>
            </Box>
        </Tabs.Root>
    );
};

export default DefaultLayout;