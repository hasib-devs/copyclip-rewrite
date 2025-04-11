pub mod commands;

use commands::greet;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .plugin(tauri_plugin_opener::init())
        .plugin(tauri_plugin_clipboard::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
