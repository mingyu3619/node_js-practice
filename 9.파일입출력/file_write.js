var fs =require('fs');

var data = "My first data...\r\nhello there!";

//동기vs 비동기 방식으로 파일 읽는 것 비교

//1. 비동기 방식으로 파일 생성, 파일명,입력 데이터,인코딩,콜백함수
fs.writeFile('file01_async.txt', data, 'utf-8', function(e){
    console.log("read async!!!");
    if(e){
        // 2. 파일생성 중 오류가 발생하면 오류출력
        console.log(e);
    }else{
        // 3. 파일생성 중 오류가 없으면 완료 문자열 출력
        console.log('01 WRITE DONE!');
    }
});

// 4. 동기방식은 callback 함수를 통한 오류처리를 할 수 없기 때문에 함수전체를 try 문으로 예외처리
//https://webruden.tistory.com/937 에 함수 원형을 보면 될듯, writeFileSync에는 콜백 옵션 X
try{
    // 5. 동기 방식으로 파일을 생성. 함수의 인자는 앞에서 부터 순서대로 파일명, 입력데이터, 인코딩
    fs.writeFileSync('file02_sync.txt', data, 'utf-8');
    console.log('02 WRITE DONE!');
}catch(e){
    console.log(e);
}

//6 . 애는 동기방식으로 파일 읽기
var data =fs.readFileSync('home.js','utf-8');
console.log('02 readSync: %s ',data);



