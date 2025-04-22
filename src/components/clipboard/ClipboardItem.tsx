import placeholderImage from "@/assets/images/placeholder-image.svg";
import { useClipboardContext } from "@/contexts/clipboard-context";
import { cn } from "@/lib/utils";
import { ClipType } from "@/types/clipboard";
import { Badge, Button, DropdownMenu } from "@radix-ui/themes";
import { Copy, MoreHorizontal, Pin, Trash2 } from "lucide-react";

type Props = {
    clip: ClipType;
};
const ClipboardItem = ({ clip }: Props) => {
    const { deleteClip, copyToClipboard } = useClipboardContext();
    const isPined = Boolean(clip.is_pinned);

    const renderContent = () => {
        switch (clip.content_type) {
            case "text":
                return (
                    <div className="text-sm font-medium text-zinc-800 break-all line-clamp-2 flex-1 pr-2">{clip.content}</div>
                );
            case "image":
                return (
                    <div className="w-full">
                        <div className="relative w-full h-[120px] bg-zinc-100 rounded-md overflow-hidden mb-2">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={placeholderImage}
                                alt="Clipboard image"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* <div className="flex items-center text-xs text-zinc-600">
                            <ImageIcon className="h-3 w-3 mr-1" />
                            <span className="font-medium">{clip.fileName}</span>
                            <span className="ml-auto">{clip.fileSize}</span>
                        </div> */}
                    </div>
                );
            //   case "file":
            //     return (
            //       <div className="flex items-center gap-2 py-1">
            //         <div className="w-10 h-10 bg-zinc-100 rounded-md flex items-center justify-center">
            //           <FileText className="h-5 w-5 text-zinc-500" />
            //         </div>
            //         <div className="flex-1 min-w-0">
            //           <div className="text-sm font-medium text-zinc-800 truncate">{clip.fileName}</div>
            //           <div className="text-xs text-zinc-500">{clip.fileSize}</div>
            //         </div>
            //       </div>
            //     )
            default:
                return <div className="text-sm text-zinc-800">{clip.content}</div>;
        }
    };

    return (
        <div
            className={cn(
                "group p-3 mb-2 rounded-lg border transition-all",
                isPined ? "bg-zinc-50 border-zinc-300" : "bg-white border-zinc-200 hover:border-zinc-300",
            )}
        >
            <div className="flex justify-between items-start mb-1">
                <div className="text-sm font-medium text-zinc-800 break-all line-clamp-2 flex-1 pr-2">
                    {renderContent()}
                </div>
                <div className="flex items-center">
                    {isPined && <Pin className="h-3.5 w-3.5 text-zinc-600 fill-zinc-600 mr-1" />}
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button size={"1"} color="gray" style={{ backgroundColor: "transparent" }} variant="soft">
                                <MoreHorizontal className="h-4 w-4" />
                                <span className="sr-only">Actions</span>
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
                            <DropdownMenu.Item >
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
            </div>
            <div className="flex items-center justify-between">
                <div className="text-xs text-zinc-500">{clip.created_at}</div>
                <Badge variant="outline" style={{ padding: '0px 6px', fontSize: '10px', color: "#09090b", borderColor: "#e5e7eb", fontWeight: "600" }} radius="full" color="gray" size="1">
                    {clip.content_type}
                </Badge>
            </div>
        </div>
    );
};

export default ClipboardItem;