import { useClipboardContext } from "@/contexts/clipboard-context";
import { ClipType } from "@/types/clipboard";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { Copy, MoreHorizontal, Pin, Trash2 } from "lucide-react";

type Props = {
    clip: ClipType;
};

const ItemAction = ({ clip }: Props) => {
    const { deleteClip, copyToClipboard, togglePin } = useClipboardContext();
    const isPined = Boolean(clip.is_pinned);

    return (
        <div className="flex items-center">
            {isPined && <Pin onClick={() => togglePin(clip)} className="h-3.5 w-3.5 text-zinc-600 fill-zinc-600 mr-1" />}

            <DropdownMenu.Root>
                <DropdownMenu.Trigger >
                    <Button size={"1"} color="gray" style={{ backgroundColor: "transparent" }} variant="soft">
                        <MoreHorizontal className="h-4 w-4 cursor-context-menu" />
                    </Button>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    {/* Copy */}
                    <DropdownMenu.Item
                        onClick={() => copyToClipboard(clip.content, clip.content_type)}
                    >
                        <Copy className="mr-2 h-4 w-4" />
                        <span>Copy</span>
                    </DropdownMenu.Item>
                    {/* Pin */}
                    <DropdownMenu.Item onClick={() => togglePin(clip)}>
                        <Pin className="mr-2 h-4 w-4" />
                        <span>{isPined ? "Unpin" : "Pin"}</span>
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator />

                    {/* Delete */}
                    <DropdownMenu.Item
                        onClick={() => deleteClip(clip.id)}
                        color="red">
                        <Trash2 className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </div>
    );
};

export default ItemAction;