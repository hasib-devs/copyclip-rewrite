mod commands;
mod services;

use commands::{get_clipboard_entries, greet, insert_clipboard_entry};
use tauri::{Listener, Manager};
use tauri_plugin_clipboard::Clipboard;
use tauri_plugin_fs::FsExt;
use tauri_plugin_sql::{Migration, MigrationKind};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let migrations = vec![
        // Define your migrations here
        Migration {
            version: 1,
            description: "Create clips table",
            sql: include_str!("../database/migrations/001_create_clips_table.sql"),
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:copyclip.db", migrations)
                .build(),
        )
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_clipboard::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            get_clipboard_entries,
            insert_clipboard_entry
        ])
        .setup(|app| {
            let app_handle = app.handle();
            // let win = app.get_webview_window("main").unwrap();

            let scope = app.fs_scope();
            scope.allow_directory("$HOME/*", false).unwrap();

            // Clipboard Monitor
            let clipboard = app_handle.state::<Clipboard>();
            let _ = clipboard.start_monitor(app_handle.clone());

            if clipboard.is_monitor_running() {
                println!("✅ Clipboard monitor is online.");
            } else {
                println!("❌ Clipboard monitor is offline.");
            }

            app.listen("plugin:clipboard://clipboard-monitor/update", |e| {
                println!("🔖 {}", e.payload());
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
