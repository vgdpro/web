function on_click_new_window(event,href) {
    event.preventDefault(); // 防止默认行为（即在同一标签页中打开链接）
    if (href != 0){ window.open(href, '_blank'); } // 在新窗口中打开链接
}
function on_click_copy(text) {
    if (document.executeCommand) { // IE/Edge 兼容性
        var textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    } else if (navigator.clipboard) { // Modern browsers including Firefox
        navigator.clipboard.writeText(text).then(function() {
            console.log('Text copied to clipboard');
        }).catch(function(err) {
            console.error('Failed to copy text: ', err);
        });
    } else {
        console.log('Copy functionality is not supported in this browser.');
    }
}