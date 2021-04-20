// use glob::glob;
use glob::glob;
use std::fs;

#[derive(serde::Serialize)]
pub struct PathWithValue {
  path: String,
  text: String,
}

pub fn scan_files(patterns: Vec<String>) -> Vec<PathWithValue> {
  let mut answer: Vec<PathWithValue> = Vec::new();
  println!("Scan files! {:?}", patterns);
  for pattern in patterns {
    for entry in glob(&pattern).expect("Failed to read glob pattern") {
      match entry {
        Ok(path) => {
          println!("{:?}", path.display());
          let path_string = path.to_str().expect("Error getting path");
          let err_text = "Failed to open file: ".to_owned() + path_string;
          let item = PathWithValue {
            path: String::from(path_string),
            text: fs::read_to_string(path).expect(&err_text),
          };
          answer.push(item);
        }
        Err(e) => println!("{:?}", e),
      }
    }
  }
  return answer;
}
