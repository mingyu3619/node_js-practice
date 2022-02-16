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

http 프로토콜은 브라우저에서 서버로 요청(request)하거나 서버에서 응답(reponse)할때 데이터를 주고 받고, 실제 데이터는 BODY 부분에 담긴다.

따라서 Node.js 에서 POST는 GET과는 다른방식으로 처리한다.

```javascript
//request 객체에서 data 이벤트 발생 시, buffer 형태의 데이터들 합쳐줌 
 request.on('data', function (data) {
        postdata = postdata + data; 
    });
//end 이벤트로 전송이 끝나면, 합쳐진 postdata를 querystring 형식으로 다뤄줌 
    request.on('end', function () {
        var parsedQuery = querystring.parse(postdata);
        response.writeHead(200, { 'Content-Type': 'text/html' });
    });
```

#### 6. modeul 사용하기

exports  객체를 이용해 외부로 export할 수 있고, 다른 파일에서는 require 객체를 이용해 사용가능
```javascript
//함수 export
exports.func = function(data) {    
    return 
}
//변수 export
exports.var = 'NEW VALUE 100';
```

#### 7.event 사용하기

이벤트 처리에 사용되는 node.js 의 주요 객체,함수
+ EventEmitter: node.js의 모든 이벤트 처리가 정의된 기본객체
+ on( ): 지정한 이벤트의 리스너를 추가하는 함수
    + 리스너란? 단어 뜻 그대로 청취자이며, 이벤트가 발생하길 (귀 기울여)기다리다 실행되는 메서드이다   
+ emit( ) : 이벤트를 발생시키는 함수

1초에 한번 'tick'이라는 이벤트를 발생시키는 custom_event.js 파일과 'tick'이벤트 발생 시, 현재시간을 출력하는 call_timer.js 파일로 구성되어있다.

+ custom_module_timer.js
```javascript
var EventEmitter = require('events');
var sec = 1;

exports.timer = new EventEmitter();

setInterval(function(){
    exports.timer.emit('tick');
}, sec*1000);
```
+ call_timer.js
```
var module = require('./custom_module_timer');

module.timer.on('tick', function(time){
    var time = new Date(); // 2. 현재 시간을 가져오기 위한 Date 객체 생성
    console.log('now:'+time);
});
```


