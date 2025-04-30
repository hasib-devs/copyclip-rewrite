#[tauri::command]
#[allow(dead_code)]
pub fn get_clipboard_entries() -> String {
    println!("Get clipboard data");

    format!("Get clipboard data")
}

#[tauri::command]
#[allow(dead_code)]
pub fn insert_clipboard_entry() -> i32 {
    println!("Insert entry");

    return 5;
}
