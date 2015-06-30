// Include gulp & friends.
var gulp = require('gulp'),
	less = require('gulp-less'),
	prefix = require('gulp-autoprefixer'),
	plumb = require('gulp-plumber'),
	minify = require('gulp-minify-css')
	concat = require('gulp-concat'),
	rename = require('gulp-rename'),
	gutil = require('gulp-util');


var lessOpts = {
	'in':'app/main.less',
	'out':'app'
};

// LESS task.
gulp.task('less', function(){
	return gulp.src(lessOpts.in)
			.pipe(plumb())
			.pipe(less())
			.on('error', function(err){
				gutil.log(err);
				this.emit('end');
			})
			.pipe(prefix({
				browsers: [
                        '> 1%',
                        'last 2 versions',
                        'firefox >= 4',
                        'safari 7',
                        'safari 8',
                        'IE 8',
                        'IE 9',
                        'IE 10',
                        'IE 11'
                    ],
				cascade: true
			}))
			.pipe(rename('main.css'))
			.pipe(gulp.dest('app'))
			.pipe(minify())
			.pipe(concat('main.min.css'))
			.pipe(gulp.dest('app')).on('error', gutil.log)
});


gulp.task('watch', function(){
	gulp.watch(['app/**/*.less'], ['less']);
});

gulp.task('default', ['less', 'watch']);