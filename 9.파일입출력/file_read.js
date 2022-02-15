var fs = require('fs');

fs.readFile('home.js','utf-8',function(error,data){
    // 비동기 방식으로 파일 읽음
    console.log('01 readAsync:%s',data);
})

var data = fs.readFileSync('home.js','utf-8');
console.log('02 readSync: %s',data);

