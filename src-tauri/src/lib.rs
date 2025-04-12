mod commands;
mod db;

use commands::greet;
use db::get_migrations;
use tauri::Manager;
use tauri_plugin_positioner::{Position, WindowExt};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    let db_url = "sqlite:./copyclip.db";

    tauri::Builder::default()
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations(db_url, get_migrations())
                .build(),
        )
        .plugin(tauri_plugin_positioner::init())
        .plugin(tauri_plugin_opener::init())
        // .plugin(tauri_plugin_clipboard::init())
        .invoke_handler(tauri::generate_handler![greet])
        .setup(|app| {
            let win = app.get_webview_window("main").unwrap();

            let _ = win.as_ref().window().move_window(Position::TopRight);

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
