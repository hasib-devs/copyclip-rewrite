mod clipboard;

#[allow(unused_imports)]
pub use clipboard::*;

#[tauri::command]
#[allow(dead_code)]
pub fn greet() -> String {
    format!("Welcome to Copyclip")
}
