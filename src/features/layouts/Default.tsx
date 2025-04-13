
import ClipsList from "@/features/clipboard/ClipsList";
import { Box, Flex, Tabs, Text } from "@radix-ui/themes";
import {
    Clipboard,
    ListTodo,
    Settings,
    Smile
} from "lucide-react";

const DefaultLayout = () => {
    return (
        <Tabs.Root defaultValue="Clipboard">
            <Tabs.List className="header-tab-list h-18 bg-white" data-tauri-drag-region justify="center" color="gray" highContrast>
                <Tabs.Trigger title="Clipboard" value="Clipboard">
                    <Flex direction="column" justify="center" align="center">
                        <Clipboard />
                        <Text size="1">Clipboard</Text>
                    </Flex>
                </Tabs.Trigger>
                <Tabs.Trigger title="Emoji" value="Emoji">
                    <Flex direction="column" justify="center" align="center">
                        <Smile />
                        <Text size="1">Emoji</Text>
                    </Flex>
                </Tabs.Trigger>
                <Tabs.Trigger title="Todo" value="Todo">
                    <Flex direction="column" justify="center" align="center">
                        <ListTodo />
                        <Text size="1">Todo</Text>
                    </Flex>
                </Tabs.Trigger>
                <Tabs.Trigger title="Settings" value="Settings">
                    <Flex direction="column" justify="center" align="center">
                        <Settings />
                        <Text size="1">Settings</Text>
                    </Flex>
                </Tabs.Trigger>

            </Tabs.List>

            <Box className="bg-white mt-2 h-dvh">
                <Tabs.Content value="Clipboard">
                    <ClipsList />
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