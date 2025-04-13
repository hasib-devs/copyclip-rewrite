mod commands;
mod services;

use commands::{get_clipboard_entries, greet, insert_clipboard_entry};
use services::clips_service;
use tauri::Manager;
use tauri_plugin_positioner::{Position, WindowExt};

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_positioner::init())
        .plugin(tauri_plugin_clipboard::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            get_clipboard_entries,
            insert_clipboard_entry
        ])
        .setup(|app| {
            let handle = app.handle();
            let win = app.get_webview_window("main").unwrap();

            // Window position setup
            let _ = win.as_ref().window().move_window(Position::RightCenter);

            // Start Clipboard Monitor
            let monitor = clips_service::Monitor::new(handle);
            monitor.print_status();
            monitor.start();
            monitor.print_status();

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
