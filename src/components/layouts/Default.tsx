
import ClipboardList from "@/components/clipboard/ClipboardList";
import { Box, Flex, Tabs, Text } from "@radix-ui/themes";
import {
    Clipboard,
    ListTodo,
    Settings as SettingsIcon,
    Smile
} from "lucide-react";
import EmojiView from "../emoji/EmojiView";
import TaskList from "../tasks/TaskList";
import SettingsView from "../settings/SettingsView";

const DefaultLayout = () => {
    return (
        <Tabs.Root aria-checked={false} defaultValue="Clipboard">
            <Tabs.List aria-checked={false} className="header-tab-list bg-white mb-2" data-tauri-drag-region justify="center" color="gray" highContrast>
                <Tabs.Trigger aria-checked={false} title="Clipboard" value="Clipboard">
                    <Flex direction="column" justify="center" align="center">
                        <div className="icon w-10 flex justify-center items-center rounded-full">
                            <Clipboard />
                        </div>
                        <Text size="1">Clipboard</Text>
                    </Flex>
                </Tabs.Trigger>
                <Tabs.Trigger aria-checked={false} title="Emoji" value="Emoji">
                    <Flex direction="column" justify="center" align="center">
                        <div className="icon w-10 flex justify-center items-center rounded-full">
                            <Smile />
                        </div>
                        <Text size="1">Emoji</Text>
                    </Flex>
                </Tabs.Trigger>
                <Tabs.Trigger aria-checked={false} title="Todo" value="Todo">
                    <Flex direction="column" justify="center" align="center">
                        <div className="icon w-10 flex justify-center items-center rounded-full">
                            <ListTodo />
                        </div>
                        <Text size="1">Tasks</Text>
                    </Flex>
                </Tabs.Trigger>
                <Tabs.Trigger aria-checked={false} title="Settings" value="Settings">
                    <Flex direction="column" justify="center" align="center">
                        <div className="icon w-10 flex justify-center items-center rounded-full">
                            <SettingsIcon />
                        </div>
                        <Text size="1">Settings</Text>
                    </Flex>
                </Tabs.Trigger>

            </Tabs.List>

            <Box className="h-dvh bg-transparent">
                <Tabs.Content value="Clipboard">
                    <ClipboardList />
                </Tabs.Content>

                <Tabs.Content value="Emoji">
                    <EmojiView />
                </Tabs.Content>

                <Tabs.Content value="Todo">
                    <TaskList />
                </Tabs.Content>

                <Tabs.Content value="Settings">
                    <SettingsView />
                </Tabs.Content>
            </Box>
        </Tabs.Root>
    );
};

export default DefaultLayout;