use tauri_plugin_sql::{Migration, MigrationKind};

pub fn get_migrations() -> Vec<Migration> {
    vec![Migration {
        version: 0001,
        description: "create clipboard table",
        sql: include_str!("../../migrations/0001_create_clipboard_table.sql"),
        kind: MigrationKind::Up,
    }]
}
