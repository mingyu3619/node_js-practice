//1. event 모듈 생성
var EventEmitter  = require('events');

//2. 생성된 이벤트 모듈을 사용하기위한 오브젝트
var custom_object = new EventEmitter();

custom_object.on('call',()=>{
    console.log('called events!');
})

custom_object.emit('call')