CREATE TABLE IF NOT EXISTS `clips` (
    `id` TEXT PRIMARY KEY,
    `content_type` TEXT NOT NULL,
    `content` TEXT NOT NULL,
    `is_pinned` BOOLEAN DEFAULT 0,
    `timestamp` INTEGER NOT NULL
);