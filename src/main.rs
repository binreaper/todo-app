extern crate web_view;

use web_view::*;

fn main() {
    let html_content = include_str!("../client/dist/index.html");

    let mut webview = web_view::builder()
        .title("Tasks")
        .content(Content::Html(html_content))
        // .content(Content::Url("http://localhost:1234"))
        .size(500, 300)
        .resizable(false)
        .debug(true)
        .user_data(())
        .invoke_handler(|_webview, _arg| Ok(()))
        .build()
        .unwrap();
    webview.set_color((255, 255, 255));
    webview.run().unwrap();
}
