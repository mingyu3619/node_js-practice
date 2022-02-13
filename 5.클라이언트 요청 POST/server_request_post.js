var http = require('http');
var querystring = require('querystring');

var server = http.createServer(function (request, response) {

    // 1. post 받을 데이터
    var postdata = '';

    // 2. 'data'라는 이벤트가 발생할때 마다 postdata에 합침
    request.on('data', function (data) {
        postdata = postdata + data;
        console.log("data:",data)
        console.log("postdata:",postdata)
    })

    //'end 이벤트 시 
    request.on('end', function () {
        var parsedQuery = querystring.parse(postdata);

        console.log(parsedQuery);
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.end('var1의 값 = ' +parsedQuery.var1 );
    })
});


server.listen(8080, function () {
    console.log('Server is running...');
});