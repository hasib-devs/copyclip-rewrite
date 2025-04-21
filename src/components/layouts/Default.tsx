
import ClipboardList from "@/components/clipboard/ClipboardList";
import { Box, Flex, Tabs, Text } from "@radix-ui/themes";
import {
    Clipboard,
    ListTodo,
    Settings as SettingsIcon,
    Smile
} from "lucide-react";
import EmojiPicker from "../emoji/EmojiPicker";
import TodoList from "../todo/TodoList";
import Settings from "../settings/Settings";

const DefaultLayout = () => {
    return (
        <Tabs.Root defaultValue="Clipboard">
            <Tabs.List className="header-tab-list bg-white" data-tauri-drag-region justify="center" color="gray" highContrast>
                <Tabs.Trigger title="Clipboard" value="Clipboard">
                    <Flex direction="column" justify="center" align="center">
                        <div className="icon w-10 flex justify-center items-center rounded-full">
                            <Clipboard />
                        </div>
                        <Text size="1">Clipboard</Text>
                    </Flex>
                </Tabs.Trigger>
                <Tabs.Trigger title="Emoji" value="Emoji">
                    <Flex direction="column" justify="center" align="center">
                        <div className="icon w-10 flex justify-center items-center rounded-full">
                            <Smile />
                        </div>
                        <Text size="1">Emoji</Text>
                    </Flex>
                </Tabs.Trigger>
                <Tabs.Trigger title="Todo" value="Todo">
                    <Flex direction="column" justify="center" align="center">
                        <div className="icon w-10 flex justify-center items-center rounded-full">
                            <ListTodo />
                        </div>
                        <Text size="1">Todo</Text>
                    </Flex>
                </Tabs.Trigger>
                <Tabs.Trigger title="Settings" value="Settings">
                    <Flex direction="column" justify="center" align="center">
                        <div className="icon w-10 flex justify-center items-center rounded-full">
                            <SettingsIcon />
                        </div>
                        <Text size="1">Settings</Text>
                    </Flex>
                </Tabs.Trigger>

            </Tabs.List>

            <Box className="mt-2 h-dvh bg-transparent">
                <Tabs.Content value="Clipboard">
                    <ClipboardList />
                </Tabs.Content>

                <Tabs.Content value="Emoji">
                    <EmojiPicker />
                </Tabs.Content>

                <Tabs.Content value="Todo">
                    <TodoList />
                </Tabs.Content>

                <Tabs.Content value="Settings">
                    <Settings />
                </Tabs.Content>
            </Box>
        </Tabs.Root>
    );
};

export default DefaultLayout;