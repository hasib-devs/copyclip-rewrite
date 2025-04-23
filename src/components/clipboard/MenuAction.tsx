import { useClipboardContext } from "@/contexts/clipboard-context";
import { ClearOptions } from "@/types/clipboard";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { Menu } from "lucide-react";

const MenuAction = () => {
    const { clearClips } = useClipboardContext();

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Button
                    variant="outline"
                    style={{ paddingLeft: "var(--space-2)", paddingRight: "var(--space-2)" }}
                    color="gray"
                >
                    <Menu className="h-4 w-4" />
                </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content side="left">
                <DropdownMenu.Item onClick={() => clearClips(ClearOptions.Unpined)}>Clear Unpined</DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => clearClips(ClearOptions.Pined)} color="yellow">Clear Pined</DropdownMenu.Item>
                <DropdownMenu.Item onClick={() => clearClips(ClearOptions.All)} color="red" >Clear All</DropdownMenu.Item>

                {/* <DropdownMenu.Sub >
                    <DropdownMenu.SubTrigger>Clear</DropdownMenu.SubTrigger>
                    <DropdownMenu.SubContent>
                        <DropdownMenu.Item>All</DropdownMenu.Item>
                        <DropdownMenu.Item>Unpined</DropdownMenu.Item>
                        <DropdownMenu.Item>Pined</DropdownMenu.Item>

                        <DropdownMenu.Separator />
                        <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
                    </DropdownMenu.SubContent>
                </DropdownMenu.Sub> */}

                {/* <DropdownMenu.Separator /> */}
                {/* <DropdownMenu.Item>Share</DropdownMenu.Item> */}
                {/* <DropdownMenu.Item>Add to favorites</DropdownMenu.Item> */}
                {/* <DropdownMenu.Separator /> */}
                {/* <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
                    Delete
                </DropdownMenu.Item> */}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default MenuAction;