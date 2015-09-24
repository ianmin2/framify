var development = false;

//!BASIC DEPENDENCY IMPORTATION
var gulp        = require("gulp");
var concat      = require("gulp-concat");
var uglify      = require('gulp-uglify');
var imagemin    = require('gulp-imagemin');
var browserify  = require('gulp-browserify');
var sourcemaps  = require('gulp-sourcemaps');
var del         = require('del');

//!SETTING OF THE GLOBALS

//!THE PATHS IDENTIFIER OBJECT
var paths = {
	directives: 	["directives/main.js"],
	controllers: 	["controllers/main.js"],
	services: 		["services/main.js"],
	application: 	["main.js"],
	images: 	    'img/**/*'
};

//!THE WATCHER OBJECT
var watcher = {
	directives: 	["directives/**.dir.js"],
	controllers: 	["controllers/**.ctrl.js"],
	services: 		["services/**.srv.js"],
	application: 	["app.js"],
	images: 	    'img/**/*'
};


//!THE DESTINATIONS OBJECT
var dest = {
	directives : "directives",
	controllers: "controllers",
	services: 	 "services",
	application: ""
}

//!THE CLEANER TASK
gulp.task("clean", function(cb){

	del(['build'], cb );

});

//!THE PRODUCTION READY BUILD FUNCTION 
var dist = function( src, filename, filepath ){
    return gulp.src( src )
            .pipe( browserify() )
            .pipe( concat( filename ) )
            //.pipe( uglify() )
            .pipe( gulp.dest( filepath ) );
}

//!THE DEVELOPMENT BUILD FUNCTION 
var dev = function( src, filename, filepath  ){    
    return gulp.src( src )
        .pipe( sourcemaps.init() )
        .pipe( browserify({ insertGlobals: true, debug: true }) )
        .pipe( concat( filename ) )
        //.pipe( uglify() )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( filepath ));
    
}

//!THE BUILD ITERATOR
var build = ( development === true )? dev : dist;


//!PACK THE RELEVANT DIRECTIVES
gulp.task('directives', ['clean'], function(){

    return build( paths.directives, 'directives.js', dest.directives );

});

//!PACK THE RELEVANT SERVICES
gulp.task('services', ['clean'], function(){

    return build( paths.services, "services.js", dest.services );

});

//!PACK THE RELEVANT CONTROLLERS
gulp.task('controllers', ['clean'], function(){

    return build( paths.controllers, "controllers.js", dest.controllers );
    
});

//!PACKAGE THE FINAL PAGE DEPENDENCIES INTO A SINGLE FILE
gulp.task('package', ['clean','build'], function(){
   
		return build( paths.application, "application.js", dest.application ) .pipe(uglify()).pipe( gulp.dest( dest.application ) );
});

//!WATCH FOR FILE CHANGES AND TAKE THE REQUIRED ACTION
gulp.task('watch', function(){
    
	gulp.watch( [watcher.controllers, watcher.directives, watcher.services, watcher.application], [['build','package'],['build','package'],['build','package'],['build','package']] );

});

//!THE DEFAULT GULP TASK
gulp.task('default', ['watch']);

//!THE GULP BUILD TASK
gulp.task('build', ['controllers','directives','services'] );