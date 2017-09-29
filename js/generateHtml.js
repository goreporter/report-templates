var pug = require('pug');
var path = require('path');
var fs = require("fs");

//compile template
var summaryTmp = pug.compileFile(path.join(__dirname, '..','templates','index.pug'))("");


fs.open(path.join(__dirname, '..','index.html'),"w",function(err,fd){
    var buf = new Buffer(summaryTmp);
    fs.write(fd,buf,0,buf.length,0,function(err,written,buffer){});
})
