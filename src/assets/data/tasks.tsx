import { TaskType } from "@/types/tasks";

// Priority levels with colors
export const PRIORITIES = {
    low: { label: "Low", color: "bg-blue-500" },
    medium: { label: "Medium", color: "bg-yellow-500" },
    high: { label: "High", color: "bg-red-500" },
};

export const initialTodos: TaskType[] = [
    {
        id: 1,
        text: "Complete project proposal",
        completed: false,
        createdAt: new Date(),
        dueDate: new Date(Date.now() + 86400000), // Tomorrow
        priority: "high",
    },
    {
        id: 2,
        text: "Buy groceries",
        completed: true,
        createdAt: new Date(Date.now() - 86400000), // Yesterday
        dueDate: null,
        priority: "medium",
    },
    {
        id: 3,
        text: "Schedule dentist appointment",
        completed: false,
        createdAt: new Date(),
        dueDate: new Date(Date.now() + 604800000), // Next week
        priority: "low",
    },
];