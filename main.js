var http = require('http');
var fs = require('fs');
var url = require('url');
const { StringDecoder } = require('string_decoder');
var json_string = fs.readFileSync("./server_config.json")
var config = JSON.parse(json_string)

http.createServer((request, response)=>{
    if(request.method == "GET"){
        var path=url.parse(request.url).pathname
        fs.readFile(path.substr(1), function (err, data) {
            if (err) {
            console.log(err);
            response.writeHead(404, {'Content-Type': 'text/html'});
            }else{             
            switch(path.split('.')[1]){
                case 'html':response.writeHead(200, {'Content-Type': 'text/html'});response.write(data.toString());break;
                case 'css':response.writeHead(200, {'Content-Type': 'text/css'});response.write(data.toString());break;
                case 'js':response.writeHead(200, {'Content-Type': 'text/js'});response.write(data.toString());break;
                case 'png':response.writeHead(200, {'Content-Type': 'image/png'});response.write(data, 'binary');break;
                case 'ttf':response.writeHead(200, {'Content-Type': 'font/ttf'});response.write(data, 'binary');break;
            }
            }
            //  发送响应数据
            response.end();
        })
    }
    else{
        console.log("POST")
        var body = ''
        const decoder = new StringDecoder('utf-8');
        request.on('data', chunk => {
            body += decoder.write(chunk); // 处理接收到的数据块
        });
        request.on('end', () => {
            body += decoder.end();
            data = JSON.parse(body)
            try {
                // 设置响应头
                response.writeHead(200, {
                    'Content-Type': 'application/json',
                });
                // 发送响应数据
                response.end(JSON.stringify({ message: 'Data received successfully!' }));
            } catch (error) {
                console.error(error)
                response.writeHead(400, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify({ error: 'Invalid JSON' }));
            }
        });
    }
}).listen(config.port)
console.log("Server is running on " + config.port + ".")
