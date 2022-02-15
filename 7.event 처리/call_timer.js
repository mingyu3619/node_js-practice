var module = require('./custom_module_timer');

module.timer.on('tick',function(time){
    console.log("parm_time:",time);
    var time = new Date();
    console.log("now:",time);
})