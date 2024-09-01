function adjustSelectWidths() {
    // 获取所有的select元素
    var selects = document.querySelectorAll('select');
  
    // 遍历所有的select元素
    for (var i = 0; i < selects.length; i++) {
        var select = selects[i];
        var options = select.options;
        var opt;
        for (var i = 0; i < options.length; i++) {
            if ((opt = options[i]) && !opt.classList.contains('ignore-width')) {
                select.style.width = Math.max(select.scrollWidth, select.offsetWidth) + 'px';
            }
        }
    }
}

document.getElementById('file-input').addEventListener('change', function(event) {
    const files = event.target.files; // 获取所有选择的文件
    const fileListElement = document.getElementById('selected-files');
    fileListElement.innerHTML = ''; // 清空之前的列表（可选，如果要实时更新）
  
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileItem = document.createElement('span'); // 创建一个新元素来显示文件名称
        fileItem.textContent = file.name + " "; // 设置文件名称作为文本内容
        const textNode = document.createTextNode(' '); // 创建一个包含半角空格的文本节点
        // 可以添加更多的信息，例如文件大小、类型等
        fileListElement.appendChild(fileItem); // 将新创建的元素追加到文件列表容器中
        fileListElement.appendChild(textNode);
    }
});

const form = document.querySelector('form');

form.addEventListener('submit', function (e) {
    e.preventDefault(); // 防止默认的表单提交行为
    const formData = new FormData(form);

    fetch(' '/*这里还没填*/, {
        method: 'POST',
        body: formData,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // 在这里处理成功的响应数据
        alert('提交成功');
        form.reset();
    })
    .catch((error) => {
        // 在这里处理错误情况
        alert('提交失败');
    });
});