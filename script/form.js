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
    const files = event.target.files;
    const fileListElement = document.getElementById('selected-files');
    fileListElement.innerHTML = '';
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileItem = document.createElement('span');
        fileItem.textContent = file.name; 
        fileListElement.appendChild(fileItem);
        let br = document.createElement('br');
        fileListElement.appendChild(br);
    }
});
function clear_form(){
    let select_td = document.getElementById('changed_select')
    select_td.innerHTML = '';
    const fileListElement = document.getElementById('selected-files');
    fileListElement.innerHTML = '';
}

function select_change() {
    // 获取选中的值
    var selectedValue = document.getElementById('bug_select').value;
    let select_td = document.getElementById('changed_select')
    if (selectedValue == 2){
        let span = document.createElement('span');
        span.textContent = '使用的服务器：';
        select_td.appendChild(span)
        let select = document.createElement('select');
        select.id = "server_select";
        select.name = "server_select";
        select_td.appendChild(select)
        let option_I = document.createElement('option');
        option_I.textContent = '官方线上服务器s1.vgpro.top:19132';
        option_I.value = '1';
        select.appendChild(option_I)
        /*let option_II = document.createElement('option');
        option_II.textContent = '本地单人模式';
        option_II.value = '2';
        select.appendChild(option_II)
        let option_III = document.createElement('option');
        option_III.textContent = '其他服务器';
        option_III.value = '3';
        select.appendChild(option_III)*/
    }
    else{ select_td.innerHTML = ''; }
}

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
        clear_form();
    })
    .catch((error) => {
        // 在这里处理错误情况
        console.log(error);
        alert('提交失败');
    });
});