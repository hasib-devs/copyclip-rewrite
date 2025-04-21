import { ClipType } from "@/types/clipboard";

export const dummyClips: ClipType[] = [
    {
        id: "123",
        type: "text",
        content: "Test Text World, How are you?",
        createdAt: Date.now(),
        isPinned: true
    },
    {
        id: "242343",
        type: "text",
        content: "https://copyclip.hasib.dev",
        createdAt: Date.now(),

    },
    {
        id: "12397979",
        type: "text",
        content: "Meeting at 3pm with the design team",
        createdAt: Date.now(),

    },
    {
        id: "12345",
        type: "text",
        content: "+1 (555) 123-4567",
        createdAt: Date.now(),

    },
];