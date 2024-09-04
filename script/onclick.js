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

let page = 0;

let page_all = 5;

const tableElement = document.getElementById('changed_table');

const data = [
    ['VGPro项目成员:'
        , '今晚有宵夜吗'
        , '主要负责内容：'
        , 'VGPro项目总规划'
        , 'VGPro卡片脚本'
        , 'VGPro卡片数据库'
        , 'VGPro官网前端'],
    ['VGPro项目成员:'
        , '林蒙'
        , '主要负责内容：'
        , 'VGPro客户端'
        , 'VGPro服务器端'
        , ' '
        , ' '],
    ['VGPro项目成员:'
        , '𝕜𝟛'
        , '主要负责内容：'
        , 'VGPro卡片数据库'
        , 'VGPro卡图'
        , 'VGPro官网后端'
        , ' '],
    ['VGPro项目成员:'
        , 'VI-1911'
        , '主要提供各方面技术支持'
        , ' '
        , ' '
        , ' '
        , ' '],
    ['感谢以下成员参与VGPro项目的脚本工作：'
        , '記憶'
        , 'ken'
        , '壶壶'
        , 'kk'
        , '沉默魔导剑士'
        , 'CHNcan'
        , '开摆'
        , '伊卡'
        , 'P1sc3s007'
        , '萌星'
        , 'Piko'
        , ' '
        , ' '
        , ' '
        , ' '],
    ['感谢以下成员为VGPro项目组解答裁定：'
        , '草莓'
        , 'FUZE'
        , ' '
        , ' '
        , ' '
        , ' '
        , ' '],
];

const img_url = [
    './images/author_jwyxym.png'
    , './images/author_linmeng.png'
    , './images/author_k3.png'
    , './images/author_VI1911.png'
    , './images/image_3.png'
    , './images/image_3.png'
]

function update_table_column() {
    if (page < 0) { page = page_all; }
    if (page > page_all) { page = 0; }
    const lines = tableElement.getElementsByTagName('tr');
    const columns = lines[1].getElementsByTagName('td');
    const img = columns[1].querySelector('img');
    img.src = img_url[page];
    const p = columns[2].querySelector('p');
    p.innerHTML = '';
    if (page < 4){
        for (let i = 0; i < data[page].length; i++) {
            if (i >= 3){
                p.innerHTML += '&nbsp;';
                p.innerHTML += '&nbsp;';
            }
            let span = document.createElement('span');
            span.textContent = data[page][i];
            p.appendChild(span);
            if (i == 1){
                span.className = 'yellow';
                if (page == 0 || page == 1){
                    let button = document.createElement('button');
                    button.className = 'button_effect_middle';
                    button.id = 'click_button';
                    button.textContent = '点击前往B站主页';
                    p.appendChild(button);
                }
                else if (page == 3){
                    let button = document.createElement('button');
                    button.className = 'button_effect_middle';
                    button.id = 'click_button';
                    button.textContent = '点击前往VI-1911的博客';
                    p.appendChild(button);
                }
            }
            if (i != 0){
                let br = document.createElement('br');
                p.appendChild(br);
            }
        }
    }
    else{
        for (let i = 0; i < data[page].length; i++) {
            if (data[page][i] != ' '){
                if (i > 1 && i % 6 != 1){
                    p.innerHTML += '&nbsp;';
                    p.innerHTML += '&nbsp;';
                }
                let span = document.createElement('span');
                span.textContent = data[page][i];
                p.appendChild(span);
                if (i != 0){
                    span.className = 'yellow';
                    span.style.fontFamily = 'FangSong';
                    if (i % 6 == 0){
                        let br = document.createElement('br');
                        p.appendChild(br);
                    }
                }
                else{
                    let br = document.createElement('br');
                    p.appendChild(br);
                }
            }
            else{
                let span = document.createElement('span');
                span.textContent = data[page][i];
                p.appendChild(span);
                let br = document.createElement('br');
                p.appendChild(br);
            }
        }
    }
}

function next_page() {
    page++;
    update_table_column();
    add_listen();
}

function last_page() {
    page--;
    update_table_column();
    add_listen();
}

function add_listen(){
    if (page == 0){
        var button = document.getElementById('click_button');
        button.addEventListener('click', function(event) {
            on_click_new_window(event,'https://b23.tv/QvjnKQs');
        });
    }
    else if (page == 1){
        var button = document.getElementById('click_button');
        button.addEventListener('click', function(event) {
            on_click_new_window(event,'https://b23.tv/cba0qNf');
        });
    }
    else if (page == 3){
        var button = document.getElementById('click_button');
        button.addEventListener('click', function(event) {
            on_click_new_window(event,'https://violentiris.github.io/');
        });
    }
}