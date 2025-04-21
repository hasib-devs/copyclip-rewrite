import { Button, DropdownMenu, ScrollArea, TextField } from "@radix-ui/themes";
import ClipboardItem from "./ClipboardItem";
import { useClipboard } from "../../contexts/clipboard-context";

import {
    Clipboard,
    Filter,
    Search
} from "lucide-react";

const ClipboardList = () => {
    const { filteredClips } = useClipboard();

    return (
        <div>
            <div className="p-4 border-b border-zinc-200 bg-white">
                <h1 className="text-xl font-semibold text-zinc-800">Clipboard History</h1>
                <div className="flex items-center gap-2 mt-2">
                    <div className="relative flex-1">
                        <TextField.Root placeholder="Search…" className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" >
                            <TextField.Slot>
                                <Search className="text-zinc-400" height="16" width="16" />
                            </TextField.Slot>
                        </TextField.Root>

                    </div>

                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button
                                variant="outline"
                                style={{ paddingLeft: "var(--space-2)", paddingRight: "var(--space-2)" }}
                                color="gray"
                            >
                                <Filter className="h-4 w-4" />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
                            <DropdownMenu.Item shortcut="⌘ D">Duplicate</DropdownMenu.Item>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item shortcut="⌘ N">Archive</DropdownMenu.Item>

                            <DropdownMenu.Sub>
                                <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
                                <DropdownMenu.SubContent>
                                    <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
                                    <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

                                    <DropdownMenu.Separator />
                                    <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
                                </DropdownMenu.SubContent>
                            </DropdownMenu.Sub>

                            <DropdownMenu.Separator />
                            <DropdownMenu.Item>Share</DropdownMenu.Item>
                            <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
                                Delete
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </div>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-3">
                    {filteredClips.length > 0 ? (
                        filteredClips.map(clip => <ClipboardItem clip={clip} key={clip.id} />)
                    ) : (
                        <div className="text-center bg-white rounded-md flex justify-center items-center gap-2 flex-col py-8 text-zinc-400">
                            <Clipboard />
                            <p>No clipboard items found</p>
                        </div>
                    )}
                </div>
            </ScrollArea>
        </div>
    );
};

export default ClipboardList;