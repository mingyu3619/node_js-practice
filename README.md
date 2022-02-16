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

--------------------------------------
#### 3. 서버구축하기 - http basic

```javascript
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
```javascript
var module = require('./custom_module_timer');

module.timer.on('tick', function(time){
    var time = new Date(); // 2. 현재 시간을 가져오기 위한 Date 객체 생성
    console.log('now:'+time);
});
```

#### 8.URL 다루기

URL이란 Uniform Resource Locator의 약자로 네트워크 상 자원이 어디있는지 알려주기 위한 규약이다.
![image](https://user-images.githubusercontent.com/86222639/154179712-57d0d96d-e691-4ed3-b3d6-c70f6a6b995a.png)

도메인은 컴퓨터를 식별할 수 있으며, path는 컴퓨터 내의 경로를 식별하며, query string을 통해 원하는 자료를 식별 할 수 있다.

3.번의 if문들을 이용해 path 별 url를 식별가능하다.
+ server_request.js
```javascript
var server = http.createServer(function(request,response){
  
  var parsedUrl = url.parse(request.url);  
  var resource = parsedUrl.pathname;
  
  // 3. 리소스에 해당하는 문자열이 아래와 같으면 해당 메시지를 클라이언트에 전달
  if(resource == '/address'){
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end('서울특별시 강남구 논현1동 111');
  }else if(resource == '/phone'){
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end('02-3545-1237');
  }else if(resource == '/name'){
    response.writeHead(200, {'Content-Type':'text/html'});
    response.end('Hong Gil Dong');
  }else{
    response.writeHead(404, {'Content-Type':'text/html'});
    response.end('404 Page Not Found');
  }
});
```

/address에 해당되는 page
![image](https://user-images.githubusercontent.com/86222639/154180355-aef8124e-ff6f-4325-a3f7-1302c8c32d7f.png)

#### 9.파일 입출력

파일 읽기,쓰기는 둘다 동기/비동기 방식이 있으며 메소드는 다음과 같다.
```javascript
var fs = require('fs');

// 1. 비동기방식 read
fs.readFile('home.js', 'utf-8', function(error, data) {
    console.log('01 readAsync: %s',data);
});

// 2. 동기방식의 파일읽기. 파일을 읽은 후 data 변수에 저장
var data = fs.readFileSync('home.js', 'utf-8');

// 3.비동기 방식 write
fs.writeFile(file,data,options,callback)

// 4. 동기방식 write,writeFileSync 는 callback 함수가 없어, 오류처리를 위해,try catch문 사용
fs.writeFileSync(file,data,options)
```

또한 이전의 8.url 다루기와 readFile을 연계해서 해당되는 url에 html을 그려 줄 수 있다.
+ server_request_file.js

```javascript
...
var server = http.createServer(function (request, response) {
    // 1. 요청된 자원이 /hello 이면
    if (resource == '/hello') {
        fs.readFile('hello.html', 'utf-8', function (error, data) {
            if (error) {
                response.end('500 Internal Server Error : ' + error);
                // **2.아무런 오류가 없이 정상적으로 읽기가 완료되면 파일의 내용을 클라이언트에 전달**
            } else {
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            }
        });
    }
});
...
```
http://localhost/hello 요청 시, hello html 출력
![image](https://user-images.githubusercontent.com/86222639/154182405-dd258057-b4ac-40cf-80bd-2e120d7d15fa.png)

#### 10. Binary 파일(image,mp3) 처리

biarny 파일은 앞의 9. 파일입출력을 이용해 html을 그리는 방식과 유사하다.
차이점은 MIME (Multipurpose Internet Mail Extensions)이란 인코딩을 이용하는 것 이다.

```javascript
var server = http.createServer(function(request,response){

    var parsedUrl = url.parse(request.url);
    var resource = parsedUrl.pathname;

      if(resource.indexOf('/images/') == 0){

      var imgPath = resource.substring(1);
      // 1. 서비스 하려는 파일의 mime type
      var imgMime = mime.getType(imgPath); // lookup -> getType으로 변경됨
 
      // 2. 해당 파일을 읽어 오는데 두번째 인자인 인코딩(utf-8) 값 없음
      fs.readFile(imgPath, function(error, data) {
        if(error){
         //...
        }else{
          // ** 3. Content-Type 에 4번에서 추출한 mime type 을 입력**
          response.writeHead(200, {'Content-Type':imgMime});
          response.end(data);
        }
      });
    }
  });
  
  ```

브라우저 실행 확인
![image](https://user-images.githubusercontent.com/86222639/154184621-761ad341-09fb-4f89-b8ae-cf248e7d5fef.png)

#### 11. Streaming 서비스
10.의 readFile의 문제점은 파일을 다 읽었을 때 request.end() 메소드가 실행된다는 것이다. 용량이 큰 동영상의 경우, 데이터 전송이 끝날 때 까지 대기하게 되는 것이다.

이런 단점을 보완하기 위해 stream을 사용하여, 데이터 전송 중간에 처리할 수 있게 한다.

'10. Binary 파일(image,mp3) 처리' 와 유사하게 movie로 들어온 request에 대해 readFile 대신
createReadStream() 을 이용해 잘게 쪼개진 동영상들을 처리해준다

+ streaming_movie.js
```javascript
...
else if(resource.indexOf('/movie/') == 0){
    // 1. stream 생성
    var stream = fs.createReadStream(resourcePath);
    // 2. 잘게 쪼개진 stream 이 몇번 전송되는지 확인하기 위한 count
    var count = 0;
    // 3. 잘게 쪼개진 data를 전송할 수 있으면 data 이벤트 발생 
    stream.on('data', function(data) {
      count = count + 1;
      console.log('data count='+count);
      // 3.1. data 이벤트가 발생되면 해당 data를 클라이언트로 전송
      response.write(data);
    });

    // 4. 데이터 전송이 완료되면 end 이벤트 발생
    stream.on('end', function () {
      console.log('end streaming');
      // 4.1. 클라이언트에 전송완료를 알림
      response.end();
    });
    ...
 ```
 콘솔에 찍히는 나누어진 stream data.
![image](https://user-images.githubusercontent.com/86222639/154187337-713b7450-ea1a-4971-a3de-aa90b19c2fe0.png)

#### 12,13 MongoDB 연동
MongoDB는 문서 지향 데이터 베이스 시스템을 지향하며, schema나 join, table등을 사용하지 않아 다른 RDBMS에 비해 진입 장벽이 낮다. 따라서 NODE.js 기초강의에서 다른 RDBMS보다 자주 사용된다.

여느 DB와 마찬가지로 CRUD 작업이 가능하다.
다만 mongoDB 3.0 미만의 버전에서는 그대로 작동하나 그 이상의 버전은 
```
db.collection('student').insert(michael);
db.close();
```
에서 수정이 필요하다.

```javascript
// 1. mongoose 모듈 가져오기
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/testDB');
var db = mongoose.connection;

Client.connect('mongodb://localhost:27017/school', function(error, db){
    if(error) {
        console.log(error);
    } else {
        // 1. 데이터 한개 삽입
        var michael = {name:'Michael', age:15, gender:'M'};
        db.collection('student').insert(michael);
        db.close();

        // 2. 데이터 여러개 삽입
        var jordan = {name:'Jordan', age:16, gender:'M'};
        var amanda = {name:'Amanda', age:17, gender:'F'};
        db.collection('student').insertMany([jordan,amanda]);
        db.close();

        // 3. 전체 데이터 읽기
        var cursor = db.collection('student').find();
        cursor.each(function(err,doc){ //each 문으로 각각 객체에 접근
            console.log(doc);
        }) 

        // 4. 특정 데이터 읽기
        var query = {gender:'M'};
        var cursor = db.collection('student').find(query);
        cursor.each(function(err,doc){ //each 문으로 각각 객체에 접근
            console.log(doc);
        }) 

        // 5. 데이터 수정
        var query = {name:'Michael'}; //  수정 대상 쿼리        
        var operator = {name:'Joe', age:15, gender:'M'};// 데이터 수정 명령 : set 명령을 사용하면 특정 field의 값만 변경할 수 있음
        var option = {upsert:true};// 수정 옵션 : upsert 가 true 일 경우 query 대상이 존재하면 update, 없으면 insert 처리
        db.collection('student').update(query,operator,option,function(err,upserted){
            console.log('updated successfully!');
        })

        //6. 데이터 삭제
        var query = {name:'Joe'}; // remove 함수에 입력
        db.collection('student').remove(query,function(err,removed){
            console.log('removed successfully!');
        })
        db.close();
    }
});

```



