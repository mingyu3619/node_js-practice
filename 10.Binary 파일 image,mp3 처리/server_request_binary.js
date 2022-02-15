var http = require('http');
var url = require('url');
var fs = require('fs');

var mime = require('mime');

var server = http.createServer(function (request, response) {

    var parsedUrl = url.parse(request.url);
    var resource = parsedUrl.pathname;
    console.log('resource:', resource);
    console.log(resource.indexOf('/images/'));

    //2. 요청 자원의 주소가  iamge 인 경우
    if (resource.indexOf('/images/') == 0) {
        var imgPath = resource.substring(1);       
       
        //3. 파일의 mime type
        var imgMime = mime.getType(imgPath); // lookup -> getType으로 변경됨
        console.log('mime=' + imgMime);

        // 5. 해당 파일을 읽어 오는데 두번째 인자인 인코딩(utf-8) 값 없음
        fs.readFile(imgPath, function (error, data) {
            if (error) {
                response.writeHead(500, { 'Content-Type': 'text/html' });
                response.end('500 Internal Server ' + error);
            } else {
                // 6. Content-Type 에 4번에서 추출한 mime type 을 입력
                response.writeHead(200, { 'Content-Type': imgMime });
                response.end(data);
            }
        });
    }
    else{
        response.writeHead(404, {'Content-Type':'text/html'});
        response.end('404 Page Not Found');
      }
})

server.listen(80, function () {
    console.log('Server is running...');
});