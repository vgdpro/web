function on_click_new_window(event,href) {
    event.preventDefault(); // 防止默认行为（即在同一标签页中打开链接）
    window.open(href, '_blank'); // 在新窗口中打开链接
}