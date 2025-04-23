import placeholderImage from "@/assets/images/placeholder-image.svg";
import { cn } from "@/lib/utils";
import { ClipType } from "@/types/clipboard";
import { Avatar, Badge } from "@radix-ui/themes";
import ItemAction from "./ItemAction";
import { useClipboardContext } from "@/contexts/clipboard-context";

type Props = {
    clip: ClipType;
};
const ClipboardItem = ({ clip }: Props) => {

    const { copyToClipboard } = useClipboardContext();
    const isPined = Boolean(clip.is_pinned);

    const renderContent = () => {
        switch (clip.content_type) {
            case "text":
                return (
                    <div className="text-sm font-medium text-zinc-800 break-all line-clamp-5 flex-1 pr-2">{clip.content}</div>
                );
            case "image":
                return (
                    <div className="w-full">
                        <div className="relative w-full h-[120px] bg-zinc-100 rounded-md overflow-hidden mb-2">
                            <Avatar
                                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                src={`data:image/png;base64,${clip.content}`}
                                fallback={<img
                                    src={placeholderImage}
                                    alt="Clipboard image"
                                    className="w-full h-full object-cover"
                                />}
                            />
                        </div>
                    </div>
                );

            default:
                return <div className="text-sm text-zinc-800">{clip.content}</div>;
        }
    };

    return (
        <div
            className={cn(
                "group p-3 mb-2 cursor-copy rounded-lg border transition-all",
                isPined ? "bg-zinc-50 border-zinc-300" : "bg-white border-zinc-200 hover:border-zinc-300",
            )}
        >
            <div className="flex justify-between items-start mb-1">
                <div
                    onClick={() => copyToClipboard(clip.content, clip.content_type)}
                    className="text-sm font-medium text-zinc-800 break-all line-clamp-2 flex-1 pr-2">
                    {renderContent()}
                </div>
                <ItemAction clip={clip} />
            </div>
            <div
                onClick={() => copyToClipboard(clip.content, clip.content_type)}
                className="flex items-center justify-between">
                <div className="text-xs text-zinc-500">{clip.created_at}</div>
                <Badge className="cursor-default" variant="outline" style={{ padding: '0px 6px', fontSize: '10px', color: "#09090b", borderColor: "#e5e7eb", fontWeight: "600" }} radius="full" color="gray" size="1">
                    {clip.content_type}
                </Badge>
            </div>
        </div>
    );
};

export default ClipboardItem;