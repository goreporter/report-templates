var gulp = require('gulp');
var exec = require('child_process').exec;
var concat = require('gulp-concat');

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

gulp.task('default', ['getJs','getHtml']);
