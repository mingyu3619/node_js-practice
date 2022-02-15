var http = require('http');
var url = require('url');

var server = http.createServer(function (request, response) {

    //1. 실제 요청 주소 url
    console.log("request.url:", request.url);
    var pasedUrl = url.parse(request.url);

    //2. 파싱된 url중 path name
    var resource = pasedUrl.pathname;
    console.log('resource path = %s', resource);


    //3. 리소스에 따라 분류
    if (resource == '/address') {
        //'Content-Type': 'text/plain; charset=utf-8' --> 한글깨짐 수정 위해
        response.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('서울특별시 강남구 논현1동 111');
    }
    else if (resource == '/phone') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end('02-3545-1237');
    } else if (resource == '/name') {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end('Hong Gil Dong');
    }
    else {
        response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        response.end('404 Page Not Found');
    }

})

server.listen(80, function () {
    console.log('Server is running...');
});