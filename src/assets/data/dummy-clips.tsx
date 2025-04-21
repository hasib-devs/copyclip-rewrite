import { ClipType } from "@/types/clipboard";

export const dummyClips: ClipType[] = [
    {
        id: "123",
        content_type: "text",
        content: "Test Text World, How are you?",
        created_at: Date.now(),
        is_pinned: true
    },
    {
        id: "242343",
        content_type: "text",
        content: "https://copyclip.hasib.dev",
        created_at: Date.now(),

    },
    {
        id: "12397979",
        content_type: "text",
        content: "Meeting at 3pm with the design team",
        created_at: Date.now(),

    },
    {
        id: "12345",
        content_type: "text",
        content: "+1 (555) 123-4567",
        created_at: Date.now(),

    },
];