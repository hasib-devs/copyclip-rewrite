import { useClipboardContext } from "@/contexts/clipboard-context";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { ClipboardType, Filter, Image } from "lucide-react";

const FilterAction = () => {

    const { setFilterTerm, filterTerm } = useClipboardContext();

    const renderFilterIcon = () => {
        switch (filterTerm) {
            case "text":
                return <ClipboardType className="h-4 w-4" />;
            case "image":
                return <Image className="h-4 w-4" />;
            default:
                return <Filter className="h-4 w-4" />;
        }
    };

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button
                    variant="outline"
                    style={{ paddingLeft: "var(--space-2)", paddingRight: "var(--space-2)" }}
                    color="gray"
                >
                    {renderFilterIcon()}
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
                <DropdownMenu.Item onClick={() => { setFilterTerm(""); }}>All</DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => { setFilterTerm("text"); }}>Text</DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => { setFilterTerm("image"); }}>Image</DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default FilterAction;