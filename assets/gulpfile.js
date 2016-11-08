var development = false;

/*
 * BASIC DEPENDENCY IMPORTATION
 */
var gulp = require("gulp");
var gutil = require('gulp-util');
var del = require('del');
var routerify = require("./routerify");
var browserSync = require('browser-sync').create();

var exec = require('child_process').exec;
var fs = require("fs");

/*
 * SETTING OF THE GLOBALS
 */

//THE PATHS IDENTIFIER OBJECT
var paths = {
    views: "views/**.html",
};

var files_dir = [""];
var files = [];


for (fdir in files_dir) {
    files.push(files_dir[fdir] + "application.js");
}

//THE WATCHER OBJECT
var watcher = {
    views: "views/**.html"
};


//THE DESTINATIONS OBJECT
var dest = {
    views: "views/**.html"
}

//THE CLEANER TASK
gulp.task("clean", function(cb) {

    del(['build'], cb);

});

/*
 * THE PRODUCTION READY BUILD FUNCTION
 */
var dist = function(src, filename, filepath) {
    return gulp.src(src)
        .pipe(browserify().on('error', gutil.log))
        .pipe(sourcemaps.write().on('error', gutil.log))
        .pipe(babel({ presets: ['es2015'] }).on('error', gutil.log))
        .pipe(concat(filename).on('error', gutil.log))
        .pipe(ngmin().on('error', gutil.log))
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest(filepath).on('error', gutil.log));
}

/*
 * THE DEVELOPMENT BUILD FUNCTION
 */
var dev = function(src, filename, filepath) {
    return gulp.src(src)
        .pipe(sourcemaps.init().on('error', gutil.log))
        .pipe(browserify({ insertGlobals: true, debug: true }).on('error', gutil.log))
        .pipe(babel({ presets: ['es2015'] }).on('error', gutil.log))
        .pipe(concat(filename).on('error', gutil.log))
        .pipe(ngmin().on('error', gutil.log))
        .pipe(uglify().on('error', gutil.log))
        .pipe(sourcemaps.write().on('error', gutil.log))
        .pipe(gulp.dest(filepath).on('error', gutil.log));

}

var route = function(src, filename, filepath) {

    return gulp.src(src)
        .pipe(routerify().on('error', gutil.log))
        .pipe(gulp.dest(filepath).on('error', gutil.log));

}

//THE BUILD ITERATOR
var build = (development === true) ? dev : dist;

var ps = fs.createWriteStream(`${__dirname}/config/app-routes.json`, { 'flags': 'w', 'encoding': null, 'mode': 0666 });

//PACKAGE THE SPECIAL VIEWS AND ADD UNTO THE MENU
gulp.task('router', [], function() {

    process.framify = process.framify || {};
    process.framify.routes = [];

    route(paths.views, "", dest.views).pipe(routerify()).pipe(ps);

})

//WATCH FOR FILE CHANGES AND TAKE THE REQUIRED ACTION
gulp.task('watch', function() {

    gulp.watch([watcher.views], [
        ['router']
    ]);

});

//THE DEFAULT GULP TASK
gulp.task('default', ['watch']);

//THE GULP BUILD TASK
gulp.task('build', ['router']);

//THE BROWSER SYNC FUNCTION
gulp.task('serve', function() {

    var child = exec("node server/server.js", function(err, stdout, stderr) {});

    browserSync.init({
        server: {
            baseDir: "./",
            proxy: "127.0.0.1:1357"
        }
    });
    gulp.watch("server/*.js").on('change', browserSync.reload);

});

//@ LOAD THE ROUTE PACKAGER
gulp.task('package', ['watch']);
