pub mod clipboard;

#[tauri::command]
pub fn greet() -> String {
    format!("Welcome to Copyclip")
}
