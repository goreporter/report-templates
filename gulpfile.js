var gulp = require('gulp');
var exec = require('child_process').exec;
var replace = require('gulp-replace');
var fs = require('fs');

gulp.task('getHtml', function(cb){
	exec('node ./js/generateHtml.js', function(err,stdout, stderr){
		if(err)
			return cb(err);
		gulp.src(['./templates/index.html'])
		       .pipe(replace(/<link rel="stylesheet" href="([\S]*\.css)"[^>]*>/g, function(s, filename){
		       		 var style = fs.readFileSync(filename, 'utf8');
		  			 return '<style>\n' + style + '\n</style>';
		       }))
		       .pipe(replace(/<script src="([\S]*\.js)"[^>]*>/g, function(s, fn){
		       		var scriptCode = fs.readFileSync(fn, 'utf8');
		       		return '<script>\n' + scriptCode + '\n';
		       }))
		       .pipe(gulp.dest('./'))
	})

});
gulp.task('getJs', function(cb){
	exec('browserify ./js/generateJs.js -o ./bundle.js', function(err, stdout, stderr){
		cb(err);
	} )
})


gulp.task('watch', function(){
	gulp.watch('js/subpage/*.js', ['getJs'])
});
gulp.task('default', ['getJs','getHtml']);
