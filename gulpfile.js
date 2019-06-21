'use strict';

var gulp = require('gulp'),
	del = require('del'),
	uglify = require('gulp-uglify-es').default,
	usemin = require('gulp-usemin'),
	rev = require('gulp-rev'),
	cleanCss = require('gulp-clean-css'),
	flatmap = require('gulp-flatmap'),
	htmlmin = require('gulp-htmlmin'),
	browserSync = require('browser-sync');

gulp.task('browser-sync', function () {
   var files = [
      './*.html',
      './css/*.css',
      './img/*.{png,jpg,gif}',
      './js/*.js'
   ];

   browserSync.init(files, {
      server: {
         baseDir: "./"
      }
   });

});

// Default task
gulp.task('default', function() {
    gulp.start('browser-sync');
});

gulp.task('clean', function() {
	return del(['dist']);
});

gulp.task('usemin', () => {
	return gulp.src('./*html')
		.pipe(flatmap((stream, file) => {
			return stream
				.pipe(usemin({
					css: [rev()], 
					html: [() => {return htmlmin({ collapseWhitespace: true })}],
					js: [ uglify(), rev() ],
					inlinejs: [uglify()],
					inlinecss: [cleanCss(), 'concat']
				}))
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('build', gulp.series('clean', 'usemin', function (done) { 
	done(); 
}));