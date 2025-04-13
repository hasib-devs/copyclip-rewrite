use tauri::{AppHandle, Manager, Runtime, State};
use tauri_plugin_clipboard::Clipboard;

pub struct Monitor<'a, R: Runtime> {
    clipboard: State<'a, Clipboard>,
    app_handle: &'a AppHandle<R>,
}

impl<'a, R: Runtime> Monitor<'a, R> {
    pub fn new(app_handle: &'a AppHandle<R>) -> Self {
        let clipboard = app_handle.state::<Clipboard>();
        Self {
            clipboard,
            app_handle,
        }
    }

    pub fn start_monitor(&self) {
        self.clipboard
            .start_monitor(self.app_handle.clone())
            .unwrap();
    }

    pub fn stop_monitor(&self) {
        self.clipboard
            .stop_monitor(self.app_handle.clone())
            .unwrap();
    }

    pub fn is_monitor_running(&self) -> bool {
        self.clipboard.is_monitor_running()
    }

    pub fn print_status(&self) {
        let status = if self.is_monitor_running() {
            "On"
        } else {
            "Off"
        };
        println!("Monitoring status: {}", status);
    }

    pub fn listen_for_changes(&self) {
        let text = self.clipboard.read_text().unwrap();
        println!("Value is: {}", text);
    }
}
