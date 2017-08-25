var gulp        = require('gulp');
var concat      = require('gulp-concat');  
var rename      = require('gulp-rename');  
var uglify      = require('gulp-uglify'); 

var babel = require("gulp-babel");
var plumber = require("gulp-plumber");
 
var paths = {
  es6: ['./src/*.es6']
  ,framework: ['./src/framework/framify.es6']
};
 
gulp.task('default', ['es6','framify']);
 
gulp.task("es6", function () {
  return gulp.src(paths.es6)
    .pipe(plumber())
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest("assets/js"));
});
 
//...
 
gulp.task('watch', function() {
  gulp.watch(paths.es6, ['es6','framify']);
});

gulp.task('framify', function() {  
    return gulp.src(paths.framework)
        .pipe(babel({ presets: ['es2015'] }))
        .pipe(concat('framify.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(rename('framify.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});
