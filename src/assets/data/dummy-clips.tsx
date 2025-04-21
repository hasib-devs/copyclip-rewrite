import { ClipType } from "@/components/clipboard/types";

export const dummyClips: ClipType[] = [
    {
        id: "123",
        type: "text",
        content: "Test Text World, How are you?",
        timestamp: Date.now(),
        isPinned: true
    },
    {
        id: "242343",
        type: "text",
        content: "https://copyclip.hasib.dev",
        timestamp: Date.now(),

    },
    {
        id: "12397979",
        type: "text",
        content: "Meeting at 3pm with the design team",
        timestamp: Date.now(),

    },
    {
        id: "12345",
        type: "text",
        content: "+1 (555) 123-4567",
        timestamp: Date.now(),

    },
];