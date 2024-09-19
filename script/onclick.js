const YGO_VI_EX = 'https://ygobbs.com/t/%E8%80%81%E5%96%B5%E5%B8%88%E7%89%8Cygo-vi-ex%E4%B8%8B%E8%BD%BD%E5%99%A8%E5%8A%A0%E5%BC%BA%E7%89%8820%E6%95%99%E7%A8%8B%E5%B8%96%EF%BC%88%E5%97%AF/518077';

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

let page_last = 6;

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
        , '友情链接：'
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
    ['感谢萌卡对VGPro项目的设备支持'
        , '友情链接：'
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
    , './images/image_4.png'
]

function update_table_column() {
    if (page < 0) { page = page_last; }
    if (page > page_last) { page = 0; }
    const lines = tableElement.getElementsByTagName('tr');
    const columns = lines[1].getElementsByTagName('td');
    const img = columns[1].querySelector('img');
    img.src = img_url[page];
    const p = columns[2].querySelector('p');
    p.innerHTML = '';
    if (page < 3){
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
            }
            if (i != 0){
                let br = document.createElement('br');
                p.appendChild(br);
            }
        }
    }
    else if (page == 3){
        for (let i = 0; i < data[page].length; i++) {
            let span = document.createElement('span');
            span.textContent = data[page][i];
            p.appendChild(span);
            if (i == 1){
                span.className = 'yellow';
                let button = document.createElement('button');
                button.className = 'button_effect_middle';
                button.id = 'click_button';
                button.textContent = '点击前往VI-1911的博客';
                p.appendChild(button);
            }
            else if (i == 4){
                p.innerHTML += '&nbsp;';
                let button = document.createElement('button');
                button.className = 'button_effect_middle';
                button.id = 'click_button_II';
                button.textContent = 'YGO-VI-EX（喵端）下载';
                p.appendChild(button);
            }
            if (i != 0){
                let br = document.createElement('br');
                p.appendChild(br);
            }
        }
    }
    else if (page == 6){
        for (let i = 0; i < data[page].length; i++) {
            let span = document.createElement('span');
            span.textContent = data[page][i];
            p.appendChild(span);
            let br = document.createElement('br');
            p.appendChild(br);
            if (i == 1){
                p.innerHTML += '&nbsp;';
                p.innerHTML += '&nbsp;';
                let button = document.createElement('button');
                button.className = 'button_effect_middle';
                button.id = 'click_button';
                button.textContent = '点击前往萌卡官网';
                p.appendChild(button);
            }
            else if (i == 2){
                p.innerHTML += '&nbsp;';
                p.innerHTML += '&nbsp;';
                let button = document.createElement('button');
                button.className = 'button_effect_middle';
                button.id = 'click_button_II';
                button.textContent = '点击前往KoishiPro官网';
                p.appendChild(button);
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

function update_table_column_II() {
    let pag=page+1
    if (pag < 0) { pag = page_last; }
    if (pag > page_last) { pag = 0; }
    const lines = tableElement.getElementsByTagName('tr');
    const columns = lines[2].getElementsByTagName('td');
    const img = columns[1].querySelector('img');
    img.src = img_url[pag];
    const p = columns[2].querySelector('p');
    p.innerHTML = '';
    if (pag < 3){
        for (let i = 0; i < data[pag].length; i++) {
            if (i >= 3){
                p.innerHTML += '&nbsp;';
                p.innerHTML += '&nbsp;';
            }
            let span = document.createElement('span');
            span.textContent = data[pag][i];
            p.appendChild(span);
            if (i == 1){
                span.className = 'yellow';
                if (pag == 0 || pag == 1){
                    let button = document.createElement('button');
                    button.className = 'button_effect_middle';
                    button.id = 'click_button_line_II';
                    button.textContent = '点击前往B站主页';
                    p.appendChild(button);
                }
            }
            if (i != 0){
                let br = document.createElement('br');
                p.appendChild(br);
            }
        }
    }
    else if (pag == 3){
        for (let i = 0; i < data[pag].length; i++) {
            let span = document.createElement('span');
            span.textContent = data[pag][i];
            p.appendChild(span);
            if (i == 1){
                span.className = 'yellow';
                let button = document.createElement('button');
                button.className = 'button_effect_middle';
                button.id = 'click_button_line_II';
                button.textContent = '点击前往VI-1911的博客';
                p.appendChild(button);
            }
            else if (i == 4){
                p.innerHTML += '&nbsp;';
                let button = document.createElement('button');
                button.className = 'button_effect_middle';
                button.id = 'click_button_line_II_II';
                button.textContent = 'YGO-VI-EX（喵端）下载';
                p.appendChild(button);
            }
            if (i != 0){
                let br = document.createElement('br');
                p.appendChild(br);
            }
        }
    }
    else if (pag == 6){
        for (let i = 0; i < data[pag].length; i++) {
            let span = document.createElement('span');
            span.textContent = data[pag][i];
            p.appendChild(span);
            let br = document.createElement('br');
            p.appendChild(br);
            if (i == 1){
                p.innerHTML += '&nbsp;';
                p.innerHTML += '&nbsp;';
                let button = document.createElement('button');
                button.className = 'button_effect_middle';
                button.id = 'click_button_line_II';
                button.textContent = '点击前往萌卡官网';
                p.appendChild(button);
            }
            else if (i == 2){
                p.innerHTML += '&nbsp;';
                p.innerHTML += '&nbsp;';
                let button = document.createElement('button');
                button.className = 'button_effect_middle';
                button.id = 'click_button_line_II_II';
                button.textContent = '点击前往KoishiPro官网';
                p.appendChild(button);
            }
        }
    }
    else{
        for (let i = 0; i < data[pag].length; i++) {
            if (data[pag][i] != ' '){
                if (i > 1 && i % 6 != 1){
                    p.innerHTML += '&nbsp;';
                    p.innerHTML += '&nbsp;';
                }
                let span = document.createElement('span');
                span.textContent = data[pag][i];
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
                span.textContent = data[pag][i];
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
    update_table_column_II();
    add_listen();
}

function last_page() {
    page--;
    update_table_column();
    update_table_column_II();
    add_listen();
}

function add_listen(){
    if (page == 0){
        var button = document.getElementById('click_button');
        button.addEventListener('click', function(event) {
            on_click_new_window(event, 'https://b23.tv/QvjnKQs');
        });
    }
    else if (page == 1){
        var button = document.getElementById('click_button');
        button.addEventListener('click', function(event) {
            on_click_new_window(event, 'https://b23.tv/cba0qNf');
        });
    }
    else if (page == 3){
        var button = document.getElementById('click_button');
        button.addEventListener('click', function(event) {
            on_click_new_window(event, 'https://violentiris.github.io/');
        });
        var button = document.getElementById('click_button_II');
        button.addEventListener('click', function(event) {
            on_click_new_window(event, YGO_VI_EX);
        });
    }
    else if (page == 6){
        var button = document.getElementById('click_button');

        button.addEventListener('click', function(event) {
            on_click_new_window(event,'https://mycard.moe/');
        });
        var button_II = document.getElementById('click_button_II');
        button_II.addEventListener('click', function(event) {
            on_click_new_window(event,'https://koishi.pro/');
        });
    }
    let pag=page+1
    if (pag < 0) { pag = page_last; }
    if (pag > page_last) { pag = 0; }
    if (pag == 0){
        var button = document.getElementById('click_button_line_II');
        button.addEventListener('click', function(event) {
            on_click_new_window(event, 'https://b23.tv/QvjnKQs');
        });
    }
    else if (pag == 1){
        var button = document.getElementById('click_button_line_II');
        button.addEventListener('click', function(event) {
            on_click_new_window(event, 'https://b23.tv/cba0qNf');
        });
    }
    else if (pag == 3){
        var button = document.getElementById('click_button_line_II');
        button.addEventListener('click', function(event) {
            on_click_new_window(event, 'https://violentiris.github.io/');
        });
        var button = document.getElementById('click_button_line_II_II');
        button.addEventListener('click', function(event) {
            on_click_new_window(event, YGO_VI_EX);
        });
    }
    else if (pag == 6){
        var button = document.getElementById('click_button_line_II');
        button.addEventListener('click', function(event) {
            on_click_new_window(event,'https://mycard.moe/');
        });
        var button_II = document.getElementById('click_button_line_II_II');
        button_II.addEventListener('click', function(event) {
            on_click_new_window(event,'https://koishi.pro/');
        });
    }
}

let download_select = 1;
function download_select_change(){
    var selectedValue = document.getElementById('download_select').value;
    download_select = selectedValue;
}

var link_I = document.getElementById('link_I');
var link_II = document.getElementById('link_II');
var link_III = document.getElementById('link_III');
var link_IV = document.getElementById('link_IV');

if (link_I){
    link_I.addEventListener('click', function(event) {
        if (download_select == 1){
        }
        else{
        }
    });
}

if (link_II){
    link_II.addEventListener('click', function(event) {
        if (download_select == 1){
        }
    });
}

if (link_III){
    link_III.addEventListener('click', function(event) {
        if (download_select == 1){
        }
    });
}

if (link_IV){
    link_IV.addEventListener('click', function(event) {
        if (download_select == 1){
        }
    });
}

function introdue_check_ways(){
    introdue_check_ways_text();
    introdue_add_listen_check_way();
}
function introdue_check_ways_text(){
    var td = document.getElementById('check_ways');
    td.innerHTML = '';
    let p = document.createElement('p');
    let span_I = document.createElement('span');
    let span_II = document.createElement('span');
    let span_III = document.createElement('span');
    let span_IV = document.createElement('span');
    let span_V = document.createElement('span');
    let button_I = document.createElement('button');
    let button_II = document.createElement('button');
    let button_III = document.createElement('button');
    let br = document.createElement('br');
    let br_II = document.createElement('br');
    span_I.textContent = '使用方法：在VGPro的联机模式中，在主机信息处分别输入';
    span_II.textContent = 's1.vgpro.top';
    span_III.textContent = '和';
    span_IV.textContent = '19132';
    span_II.className = 'yellow';
    span_IV.className = 'yellow';
    span_V.textContent = '，不输入主机密码，点击加入游戏，即可进入服务器随机对战。也可在主机密码处输入任意文字，点击加入游戏，以那个文字为房间名建立房间，让你的对手输入同样的文字，即可加入房间。';
    button_I.className = 'button_effect_small';
    button_II.className = 'button_effect_small';
    button_III.className = 'button_effect_small';
    button_I.id = 'button_copy_ip'
    button_II.id = 'button_copy_19132'
    button_III.id = 'button_return'
    button_I.textContent = '点击复制';
    button_II.textContent = '点击复制';
    button_III.textContent = '点击返回';
    p.innerHTML += '&nbsp;';
    p.innerHTML += '&nbsp;';
    p.appendChild(span_I);
    p.appendChild(span_II);
    p.appendChild(button_I);
    p.appendChild(span_III);
    p.appendChild(span_IV);
    p.appendChild(button_II);
    p.appendChild(span_V);
    p.appendChild(br);
    p.appendChild(br_II);
    p.innerHTML += '&nbsp;';
    p.innerHTML += '&nbsp;';
    p.appendChild(button_III);
    td.appendChild(p);
}

function introdue_add_listen_check_way(){
    var button_I = document.getElementById('button_copy_ip');
    var button_II = document.getElementById('button_copy_19132');
    var button_III = document.getElementById('button_return');
    button_I.addEventListener('click', function(event) {
        on_click_copy('s1.vgpro.top');
    });
    button_II.addEventListener('click', function(event) {
        on_click_copy('19132');
    });
    button_III.addEventListener('click', function(event) {
        introdue_return();
        introdue_add_listen();
    });
}

function introdue_vgpro(){
    introdue_vgpro_text();
    introdue_add_listen_vgpro();
}
function introdue_vgpro_text(){
    var td = document.getElementById('check_ways');
    td.innerHTML = '';
    let p = document.createElement('p');
    let span_I = document.createElement('span');
    let button_I = document.createElement('button');
    let button_II = document.createElement('button');
    let br_I = document.createElement('br');
    let br_II = document.createElement('br');
    let br_III = document.createElement('br');
    let br_IV = document.createElement('br');
    span_I.textContent = 'VGPro是一款基于YGOPro源码（C++语言）改的VG客户端，该客户端能适应绝大部分配置的Win系统电脑。';
    button_I.className = 'button_effect_small';
    button_II.className = 'button_effect_small';
    button_I.textContent = '点击查看VGPro的GitHub仓库';
    button_II.textContent = '点击返回';
    button_I.id = 'button_to_git'
    button_II.id = 'button_return'
    p.innerHTML += '&nbsp;';
    p.innerHTML += '&nbsp;';
    p.appendChild(span_I);
    p.appendChild(br_I);
    p.appendChild(br_II);
    p.appendChild(br_III);
    p.innerHTML += '&nbsp;';
    p.innerHTML += '&nbsp;';
    p.appendChild(button_I);
    p.appendChild(br_IV);
    p.innerHTML += '&nbsp;';
    p.innerHTML += '&nbsp;';
    p.appendChild(button_II);
    td.appendChild(p);
}

function introdue_add_listen_vgpro(){
    var button_I = document.getElementById('button_to_git');
    var button_II = document.getElementById('button_return');
    button_I.addEventListener('click', function(event) {
        on_click_new_window(event,'https://github.com/vgdpro/vgdpro.git');
    });
    button_II.addEventListener('click', function(event) {
        introdue_return();
        introdue_add_listen();
    });
}

function introdue_return(){
    var td = document.getElementById('check_ways');
    td.innerHTML = '';
    let p = document.createElement('p');
    p.innerHTML += '&nbsp;';
    p.innerHTML += '&nbsp;';
    let span_I = document.createElement('span');
    span_I.textContent = 'VG-Project泛指以VGPro客户端为中心的一系列YGO改端项目。本项目的一切源码均在';
    p.appendChild(span_I);
    let a = document.createElement('a');
    a.textContent = 'Github';
    a.className = 'text_link_effect';
    a.id = 'check_git_button';
    p.appendChild(a);
    let span_II = document.createElement('span');
    span_II.textContent = '公开，并且对于游戏不作任何收费，你可以通过本网站提供的链接/官方Q群/萌卡下载游戏。在这里，你可以通过连接VGPro官方服务器与你的朋友或匹配到玩家进行对战';
    p.appendChild(span_II);
    let button = document.createElement('button');
    button.textContent = '点击查看对战方法';
    button.className = 'button_effect_small';
    button.id = 'check_ways_button';
    p.appendChild(button);
    p.innerHTML += '。';
    td.appendChild(p);
    let br = document.createElement('br');
    p.appendChild(br);
    p.innerHTML += '&nbsp;';
    p.innerHTML += '&nbsp;';
    p.innerHTML += 'VGPro系列客户端列表：';
    let a_II = document.createElement('a');
    a_II.textContent = 'VGPro';
    a_II.className = 'text_link_effect';
    a_II.id = 'check_vgpro_button';
    p.appendChild(a_II);
    let br_II = document.createElement('br');
    p.appendChild(br_II);
    p.innerHTML += '&nbsp;';
    p.innerHTML += '&nbsp;';
    p.innerHTML += '官方Q群：';
    let a_III = document.createElement('a');
    a_III.textContent = '（暂未填写）';
    a_III.className = 'text_link_effect';
    a_III.id = 'check_qq_button';
    p.appendChild(a_III);
}

function introdue_add_listen(){
    var check_ways_button = document.getElementById('check_ways_button');
    var a = document.getElementById('check_git_button');
    var a_II = document.getElementById('check_vgpro_button');
    var a_III = document.getElementById('check_qq_button');
    check_ways_button.addEventListener('click', function(event) {
        introdue_check_ways();
    });
    a.addEventListener('click', function(event) {
        on_click_new_window(event,'https://github.com/vgdpro');
    });
    a_II.addEventListener('click', function(event) {
        introdue_vgpro();
    });
    a_III.addEventListener('click', function(event) {
        on_click_new_window(event,'0');
    });
}