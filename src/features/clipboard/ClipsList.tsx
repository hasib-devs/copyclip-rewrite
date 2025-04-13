import { Badge, Box, Button, ScrollArea, TextField } from "@radix-ui/themes";
import ClipItem from "./ClipItem";
import { useClipboard } from "./clipboard-context";

import { cn } from "@/lib/utils";
import {
    Clipboard,
    Filter,
    Search,
    X
} from "lucide-react";
import { useState } from "react";

const ClipsList = () => {
    const { filteredClips, searchQuery } = useClipboard();

    const [showCategoryFilter, setShowCategoryFilter] = useState(false);

    return (
        <div>
            <div className="p-4 border-b border-zinc-200 bg-white">
                <h1 className="text-xl font-semibold text-zinc-800">Clipboard History</h1>
                <div className="flex items-center gap-2 mt-2">
                    <div className="relative flex-1">
                        <TextField.Root placeholder="Search…">
                            <TextField.Slot>
                                <Search className="text-zinc-400" height="16" width="16" />
                            </TextField.Slot>
                        </TextField.Root>

                    </div>
                    <Button
                        variant="outline"
                        onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                        className={cn(showCategoryFilter && "bg-zinc-100")}
                    >
                        <Filter className="h-4 w-4" />
                    </Button>
                </div>

                {showCategoryFilter && (
                    <div className="flex flex-wrap gap-1 mt-2">
                        {[].map((category) => (
                            <Badge
                                key={category}
                                // variant={activeCategories.includes(category) ? "default" : "outline"}
                                className="cursor-pointer"
                            >
                                {category}
                            </Badge>
                        ))}
                        {([].length > 0 || searchQuery) && (
                            <Badge className="cursor-pointer ml-auto" >
                                Clear filters <X className="ml-1 h-3 w-3" />
                            </Badge>
                        )}
                    </div>
                )}
            </div>

            <ScrollArea className="flex-1">
                <div className="p-3">
                    {filteredClips.length > 0 ? (
                        filteredClips.map(clip => <ClipItem clip={clip} key={clip.id} />)
                    ) : (
                        <div className="text-center flex justify-center flex-col py-8 text-zinc-400">
                            <Clipboard />
                            <p>No clipboard items found</p>
                        </div>
                    )}
                </div>
            </ScrollArea>

            <div>
                {

                }

            </div>
        </div>
    );
};

export default ClipsList;