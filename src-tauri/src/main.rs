#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![update_files_to_diff])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

mod scan_files;

#[tauri::command]
fn update_files_to_diff(pattern: String) -> Vec<scan_files::PathWithValue> {
  println!("I was invoked from JS!");
  return scan_files::scan_files(vec![pattern]);
}
