pub mod clipboard;

#[tauri::command]
pub(crate) fn greet() -> String {
    format!("Welcome to Copyclip")
}
