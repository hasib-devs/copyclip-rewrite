mod commands;
mod services;

use commands::*;
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
            let clipboard = handle.state::<tauri_plugin_clipboard::Clipboard>();
            let _ = clipboard.start_monitor(handle.clone());

            let is_running = clipboard.is_monitor_running();
            let status = match is_running {
                true => "On",
                false => "Off",
            };
            println!("Clipboard monitor status: {}", status);

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
