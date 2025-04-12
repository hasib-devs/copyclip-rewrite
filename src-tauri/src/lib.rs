mod commands;

use commands::greet;
use tauri::Manager;
use tauri_plugin_positioner::{Position, WindowExt};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .setup(|app| {
            let win = app.get_webview_window("main").unwrap();

            let _ = win.as_ref().window().move_window(Position::TopRight);

            Ok(())
        })
        .invoke_handler(tauri::generate_handler![greet])
        .plugin(tauri_plugin_positioner::init())
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_clipboard::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
