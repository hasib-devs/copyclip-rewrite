CREATE TABLE IF NOT EXISTS clipboard (
    id TEXT PRIMARY KEY,
    content_hash TEXT NOT NULL UNIQUE,
    content_type TEXT NOT NULL,  -- 'text' or 'image'
    content TEXT,                 -- text or base64 thumbnail
    file_path TEXT,               -- path to full image
    created_at INTEGER NOT NULL,
    last_accessed INTEGER NOT NULL
);

CREATE INDEX idx_content_hash ON clipboard(content_hash);
CREATE INDEX idx_created_at ON clipboard(created_at);