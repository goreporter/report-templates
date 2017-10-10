var gulp = require('gulp');
var exec = require('child_process').exec;
var replace = require('gulp-replace');
var fs = require('fs');

gulp.task('getHtml', function(cb){
	exec('node ./js/generateHtml.js', function(err,stdout, stderr){
		cb(err);
	})

});
gulp.task('getJs', function(cb){
	exec('browserify ./js/generateJs.js -o ./bundle.js', function(err, stdout, stderr){
		cb(err);
	} )
})

gulp.task('merge', function(){
	gulp.src(['./index.html'])
       .pipe(replace(/^<link rel="stylesheet"/g, function(s, filename){
       	    console.log(filename);
       		 var style = fs.readFileSync(filename, 'utf8');
  			 return '<style>\n' + style + '\n</style>';
       }))
       .pipe(gulp.dest('./test'))
})

gulp.task('watch', function(){
	gulp.watch('js/subpage/*.js', ['getJs'])
});
gulp.task('default', ['getJs','getHtml']);
