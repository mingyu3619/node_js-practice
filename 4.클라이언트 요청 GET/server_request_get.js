// 1. http 모듈 사용
var http = require('http');

// 2. url 모듈 사용
var url= require('url');

//3.querystring 모듈 사용
var querystring = require('querystring'); 

var server = http.createServer(function(request,response){

    console.log("--'log start--");

     // 4. 브라우저에서 요청한 주소를 parsing 하여 객체화 후 출력
    var parsedUrl = url.parse(request.url);
    console.log("dd:",parsedUrl);

    //5. 쿼리 스트링 부분에서 & 와 =을 이용해 따로 parse
    var parsedQuery = querystring.parse(parsedUrl.query,'&','=');
    console.log(parsedQuery);
    // 6. 콘솔화면에 로그 종료 부분을 출력
    console.log('--- log end ---');

    response.writeHead(200, {'Content-Type':'text/html'});
    response.end('var1=' + parsedQuery.var1 + ', var2=' + parsedQuery.var2 + ', var3=' +parsedQuery.var3);
    
});

server.listen(8080, function(){
    console.log('Server is running...');
});