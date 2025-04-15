import { cn } from "@/lib/utils";
import { ClipType } from "./types";
import { Copy, MoreHorizontal, Pin, Trash2 } from "lucide-react";
import { Badge, Button, DropdownMenu } from "@radix-ui/themes";

type Props = {
    clip: ClipType;
};
const ClipItem = ({ clip }: Props) => {
    return (
        <div
            className={cn(
                "group p-3 mb-2 rounded-lg border transition-all",
                clip.isPinned ? "bg-zinc-50 border-zinc-300" : "bg-white border-zinc-200 hover:border-zinc-300",
            )}
        >
            <div className="flex justify-between items-start mb-1">
                <div className="text-sm font-medium text-zinc-800 break-all line-clamp-2 flex-1 pr-2">{clip.content}</div>
                <div className="flex items-center">
                    {clip.isPinned && <Pin className="h-3.5 w-3.5 text-zinc-600 fill-zinc-600 mr-1" />}
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button size={"1"} color="gray" style={{ backgroundColor: "transparent" }} variant="soft">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            {/* Copy */}
                            <DropdownMenu.Item >
                                <Copy className="mr-2 h-4 w-4" />
                                <span>Copy</span>
                            </DropdownMenu.Item>
                            {/* Pin */}
                            <DropdownMenu.Item >
                                <Pin className="mr-2 h-4 w-4" />
                                <span>{clip.isPinned ? "Unpin" : "Pin"}</span>
                            </DropdownMenu.Item>

                            <DropdownMenu.Separator />

                            {/* Delete */}
                            <DropdownMenu.Item color="red">
                                <Trash2 className="mr-2 h-4 w-4" />
                                <span>Delete</span>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>


                </div>
            </div>
            <div className="flex items-center justify-between">
                <div className="text-xs text-zinc-500">{clip.timestamp}</div>
                <Badge variant="outline" style={{ padding: '0px 6px', fontSize: '10px', color: "#09090b", borderColor: "#e5e7eb", fontWeight: "600" }} radius="full" color="gray" size="1">
                    {clip.type}
                </Badge>
            </div>
        </div>
    );
};

export default ClipItem;