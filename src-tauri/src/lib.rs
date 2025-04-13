mod commands;
mod services;

use commands::{get_clipboard_entries, greet, insert_clipboard_entry};
use tauri::{Listener, Manager};
use tauri_plugin_clipboard::Clipboard;
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
            let app_handle = app.handle();
            let win = app.get_webview_window("main").unwrap();

            // Window position setup
            let _ = win.as_ref().window().move_window(Position::RightCenter);

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
