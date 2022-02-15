var EventEmitter = require('events');

//1. 타이머 몇초?
var sec=1;

//2.timmer 변수를 EventEmitter로 초기화
exports.timer = new EventEmitter();

//3. 자바스크립트 내장함수 setInterval를 이용해 1초에 한번 tick
setInterval(function(){
    exports.timer.emit('tick');

},sec*1000)