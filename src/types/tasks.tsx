import { PRIORITIES } from "@/assets/data/tasks";

export type Priority = keyof typeof PRIORITIES;
export type TaskType = {
    id: number;
    text: string;
    completed: boolean;
    createdAt: Date;
    dueDate?: Date | null;
    priority: Priority;
};