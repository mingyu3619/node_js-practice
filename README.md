## node_js-practice

node.js 서버 구축 실습
https://javafa.gitbooks.io/nodejs_server_basic/content  (클론 코딩)

### 목차

3. 서버구축하기 - http basic
4. 클라이언트 요청 GET
5. 클라이언트 요청 POST
6. module 사용하기
7. event 처리
8. url 다루기
9. 파일입출력
10. Binary 파일(image, mp3) 처리
11. Streaming 서비스
12. MongoDB 연동 I - mongoose
13. MongoDB 연동 II - mongodb

#### 3. 서버구축하기 - http basic

```
var server = http.createServer( function(request,response) { 

    response.writeHead(200,{'Content-Type':'text/html'});
    response.end('Hello node.js!!');

});
```

![image](https://user-images.githubusercontent.com/86222639/154005141-cda6e6f6-feaa-4c4c-bd85-f2c2df7d4b33.png)


#### 4. 클라이언트 요청 GET

서버로 값 전달을 위해서는
```
도메인? '키1=값1' &'키2=값2' 
```
다음 형태로 요청

도메인 이후의 값들을 Queyr String 이라고 한다.

``` javascript
    var server = http.createServer(function(request,response){
        var parsedUrl = url.parse(request.url);
        var parsedQuery = querystring.parse(parsedUrl.query,'&','=');  
        console.log(parsedQuery); 
    }
```
parsedQuery를 이용하면 {키1:'값1' 키2:'값'}의 JSON과 유사한 형태로 반환됩니다.

#### 5. 클라이언트 요청 POST

...
