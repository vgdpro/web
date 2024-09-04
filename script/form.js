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
function getOption(id){
    var obj=document.getElementById(id)
    var index = obj.selectedIndex
    return obj.options[index].text
}
function sleep(ms){ // 这函数是为了等待文件读完，改成同步读取后可删除
    return new Promise(resolve=>setTimeout(resolve, ms))
}
const form = document.querySelector('form');
const url = "http://localhost:2047/"
form.addEventListener('submit',async function (e) {
    e.preventDefault(); // 防止默认的表单提交行为
    var data = {}
    data.game_select=getOption("game_select")
    data.bug_select=getOption("bug_select")
    data.server_select=getOption("server_select")
    data.expect_resolve=document.querySelector('#expect_resolve').value
    data.resolve=document.querySelector('#resolve').value
    data.file = new Array()
    const files = document.querySelector('input[type="file"]').files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        const reader = new FileReader(e)
        reader.onload = (e)=>{
            const fileContent = e.target.result
            data.file.push(file.name + '\\n' + fileContent)
            console.log(file.name + '\\n' + fileContent)
        }
        reader.readAsText(file)
    }
    await sleep(1000) // 这行语句是为了等待文件读完，改成同步读取后可删除
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('网络问题');
        }
        return response.json();
    })
    .then(data => {
        // 在这里处理成功的响应数据
        console.log('Success:', data);
        alert('提交成功');
        form.reset();
        const fileListElement = document.getElementById('selected-files');
        fileListElement.innerHTML = ''
    })
    .catch((error) => {
        // 在这里处理错误情况
        console.log(error);
        alert('提交失败');
    });
});
//这里需要和后端对接