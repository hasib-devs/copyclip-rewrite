#[tauri::command]
pub(crate) fn get_clipboard_data() -> String {
    println!("Get clipboard data");

    format!("Get clipboard data")
}
