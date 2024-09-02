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

async function on_click_download() {
    try {
        const response = await fetch('http://localhost:3000/download-file');//这里需要和后端对接
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

        // 获取文件名（如果服务器响应头中包含了Content-Disposition）
        const disposition = response.headers.get('Content-Disposition');
        const filename = disposition && disposition.split('filename=')[1];

        // 创建一个Blob URL并将其赋值给download URL
        const blobUrl = await response.blob();
        const downloadUrl = URL.createObjectURL(blobUrl);

        // 创建一个临时链接元素，设置href为Blob URL，点击触发下载
        const a = document.createElement('a');
        a.href = downloadUrl;
        a.style.display = 'none';
        if (filename) {
            a.download = filename; // 设置文件名（如果需要的话）
        }
        document.body.appendChild(a);
        a.click();

        // 清理
        setTimeout(() => {
            a.remove();
            URL.revokeObjectURL(downloadUrl);
        }, 0);
    } catch (error) {
        console.error('Error during download:', error);
    }
}
