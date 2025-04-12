import { Box, Heading, Section } from "@radix-ui/themes";
import ClipboardEntry from "./ClipboardEntry";

const ClipboardList = () => {
    return (
        <Box>
            <Heading size="4">Clipboard List</Heading>

            <Section py="2">
                <ClipboardEntry />
            </Section>
        </Box>
    );
};

export default ClipboardList;