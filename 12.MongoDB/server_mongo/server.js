//1. mongoose 모듈
var mongoose = require('mongoose');

//2. mongoose서버에 연결
mongoose.connect('mongodb://localhost:27017/testDB');

//3. 연결된 DB 사용
var db = mongoose.connection;

//4. 연결 실패시
db.on('error',function(){
    console.log("connection Failed!");
})

//5 연결 성공시
db.once('open',function(){
    console.log("Connected!");
})

//6. 스키마 생성
var student = mongoose.Schema({
    name:'string',
    address:'string',
    age:'number'
})

//7.스키마를 객체처럼 사용 할 수 있게 
var Student = mongoose.model('Schema',student);

// 8. Student 객체를 new 로 생성해서 값을 입력
var newStudent = new Student({name:'Hong Gil Dong', address:'서울시 강남구 논현동', age:'22'});

// 9. 데이터 저장
newStudent.save(function(error, data){
    if(error){
        console.log(error);
    }else{
        console.log("data:",data);
        console.log('Saved!');

    }
});

// 10. Student 레퍼런스 전체 데이터 가져오기
Student.find(function(error, students){
    console.log('--- Read all ---');
    if(error){
        console.log(error);
    }else{
        console.log(students);
    }
})

// 11. 특정 아이디값 가져오기
Student.findOne({_id:'620b2e25c586e5c0995415e2'}, function(error,student){
    console.log('--- Read one ---');
    if(error){
        console.log(error);
    }else{
        console.log(student);
    }
});

// 12. 특정아이디 수정하기
Student.findById({_id:'620b2e25c586e5c0995415e2'}, function(error,student){
    console.log('--- Update(PUT) ---');
    if(error){
        console.log(error);
    }else{
        student.name = '--modified--';
        student.save(function(error,modified_student){
            if(error){
                console.log(error);
            }else{
                console.log(modified_student);
            }
        });
    }
});

// 13. 삭제
Student.remove({_id:'620b2e25c586e5c0995415e2'}, function(error,output){
    console.log('--- Delete ---');
    if(error){
        console.log(error);
    }

    /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
        어떤 과정을 반복적으로 수행 하여도 결과가 동일하다. 삭제한 데이터를 다시 삭제하더라도, 존재하지 않는 데이터를 제거요청 하더라도 오류가 아니기 때문에
        이부분에 대한 처리는 필요없다. 그냥 삭제 된것으로 처리
        */
    console.log('--- deleted ---');
});