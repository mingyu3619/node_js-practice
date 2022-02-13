//1.서버 사용 위해 http 모듈 변수에 담음
var http = require('http');

//2. http 모듈로 서버 생성
var server =http.createServer(function(request,response){
response.writeHead(200,{'Content-Type':'text/html'});
response.end('Hello node.js!!!');
});

//3. listen 함수로 8080 포트의 서버 실행
server.listen(8080,function(){
    console.log("sever is running...!");
})

