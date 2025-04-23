import { Button, DropdownMenu } from "@radix-ui/themes";
import { Filter } from "lucide-react";

const FilterAction = () => {
    return (
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
            <DropdownMenu.Content align="end">
                <DropdownMenu.Item>Text</DropdownMenu.Item>
                <DropdownMenu.Item>Image</DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default FilterAction;