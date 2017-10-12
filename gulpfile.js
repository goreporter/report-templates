var gulp = require('gulp');
var exec = require('child_process').exec;
var replace = require('gulp-replace');
var fs = require('fs');
var rename = require('gulp-rename');

/**
 * pipe font awesome in node_modules to css folder
 */
gulp.task('getFont', function(){
	return gulp.src(['node_modules/font-awesome-base64/index.css'])
				.pipe(rename("fontAwesome.css"))
				.pipe(gulp.dest('./css'));
})
gulp.task('getHtml', function(cb){
	exec('node ./js/generateHtml.js', function(err,stdout, stderr){
		if(err)
			return cb(err);
		gulp.src(['./templates/index.html'])
		       .pipe(replace(/<link rel="stylesheet" href="([\S]*\.css)"[^>]*>/g, function(s, filename){
		       		 var style = fs.readFileSync(filename, 'utf8');
		  			 return "<style>\n" + style + "\n</style>";
		       }))
		       .pipe(replace(/url\('\.\.\/fonts\/([\S]*)/g, function(s, filename){
		       		return "url('bower_components/components-font-awesome/fonts/" + filename;
		       }))
		       .pipe(replace(/<script src="([\S]*\.js)"[^>]*>/g, function(s, fn){
		       		var scriptCode = fs.readFileSync(fn, 'utf8');
		       		return "<script>\n" + scriptCode + "\n";
		       }))
		       .pipe(replace(/<img src="([\S]*)">/g, function(s, src){
					var dataUrl = base64_encode("./img/logo.png");
					return '<img src="data:image/gif;base64,' + dataUrl + '">';
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
gulp.task('default', ['getFont', 'getJs','getHtml']);

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}