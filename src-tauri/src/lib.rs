// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/

use std::{
    sync::{Arc, Mutex},
    thread,
    time::Duration,
};
use tauri::{Manager, State};

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[derive(Clone, serde::Serialize)]
struct ClipboardEntry {
    content: String,
    timestamp: String,
}

pub struct ClipboardState {
    pub last_clipboard: Arc<Mutex<String>>,
}

#[tauri::command]
fn handle_clipboard_monitor() {
    println!("Start clipboard monitor")
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![greet, handle_clipboard_monitor])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
