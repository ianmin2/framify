var development = false;

/*
 * BASIC DEPENDENCY IMPORTATION
*/
var gulp        = require("gulp");
var gutil       = require('gulp-util');
var babel       = require('gulp-babel');
var concat      = require("gulp-concat");
var uglify      = require('gulp-uglify');
var imagemin    = require('gulp-imagemin');
var ngmin       = require('gulp-ng-annotate');
var browserify  = require('gulp-browserify');
var sourcemaps  = require('gulp-sourcemaps');
var del         = require('del');
var routerify   = require("./routerify");
var browserSync = require('browser-sync').create();

var exec        = require('child_process').exec;
var fs          = require("fs");

/*
 * SETTING OF THE GLOBALS
*/

//THE PATHS IDENTIFIER OBJECT
var paths = {
	directives: 	["assets/js/directives/main.js"],
	controllers: 	["assets/js/controllers/main.js"],
	services: 	    ["assets/js/services/main.js"],
	application: 	["main.js"],
	images: 	    'iassets/mg/**/*',
    css:            'assets/css/main.css',
    js:             'assets/js/**.min.js',
    views:          "views/**.html",
};

var files_dir = [""];
var files = [];

for( fdir in files_dir ){
    files.push( files_dir[fdir] + "application.js" );
}

//THE WATCHER OBJECT
var watcher = {
	directives: 	["assets/js/directives/**.dir.js"],
	controllers: 	["assets/js/controllers/**.ctrl.js"],
	services: 	    ["assets/js/services/**.serv.js"],
	application: 	["assets/js/**app**.js"],
	images: 	    'assets/img/**/*',
    css:            'assets/css/**.min.css',
    js:             ['assets/js/**.min.js','assets/js/app**.js'],
    views:          "views/**.html"
};


//THE DESTINATIONS OBJECT
var dest = {
	directives : "assets/js/directives",
	controllers: "assets/js/controllers",
	services:    "assets/js/services",
	application: "",
    css:         "assets/css",
    js:          "assets/js",
    views:       "views/**.html"
    
}

//File Unlinker
var rmFile = function( filePath ){
    
    return new Promise(function(resolve,reject){
        
        fs.unlink( filePath, function(err){
            if(err){
                reject({ status: 500, message: err.message })
            }else{
                resolve({ status: 200, message: "Successfully Deleted the file " + filePath })
            }
        });
        
    });
    
}

//!Serial File Unlinker
var rmFiles = function( file_list ){
    
    return new Promise(function(resolve,reject){
        
        if( typeof(file_list) === "string" ){
        
            rmFile( file_list )
            .then( function(data){
                console.log( "\n\n" + data.message );
                resolve(data.message);   
            })
            .catch(function(data){
                console.log( "\n\n" + data.message );
                reject( data.message);
            });
            
        }else{
            
            var maxFiles  = file_list.length - 1;
            var currfiles = 0;
            
            file_list.reduce( function(sequence, filepath ){
                
                return sequence.then(function(){
                    return rmFile(filepath);
                }).then(function(resp){
                    currfiles++;
                    console.log("\n\n" + resp.message );
                    if( currfiles ===  maxFiles ){ resolve( resp.message ) }
                })
                .catch(function(resp){
                    currfiles++;
                    console.log("\n\n" + resp.message );
                    if( currfiles === maxFiles ){ reject( resp.message ) }
                });
                
            },Promise.resolve())
            
        }
        
    });
    
}

//THE CLEANER TASK
gulp.task("clean", function(cb){

	del(['build'], cb );

});

/*
 * THE PRODUCTION READY BUILD FUNCTION
 */
var dist = function( src, filename, filepath ){
    return gulp.src( src )
            .pipe( browserify().on('error', gutil.log) )
	    .pipe( sourcemaps.write().on('error', gutil.log) )
            .pipe( babel({ presets: ['es2015'] }).on('error', gutil.log) )
            .pipe( concat( filename ).on('error', gutil.log) )
            .pipe( ngmin().on('error', gutil.log) )
            .pipe( uglify().on('error', gutil.log) )
            .pipe( gulp.dest( filepath ).on('error', gutil.log) );
}

/*
 * THE DEVELOPMENT BUILD FUNCTION
 */
var dev = function( src, filename, filepath  ){
    return gulp.src( src )
        .pipe( sourcemaps.init().on('error', gutil.log) )
        .pipe( browserify({ insertGlobals: true, debug: true }).on('error', gutil.log) )
        .pipe( babel({ presets: ['es2015'] }).on('error', gutil.log) )
        .pipe( concat( filename ).on('error', gutil.log) )
        .pipe( ngmin().on('error', gutil.log) ) 
        .pipe( uglify().on('error', gutil.log) )
        .pipe( sourcemaps.write().on('error', gutil.log) )
        .pipe( gulp.dest( filepath ).on('error', gutil.log));

}

var route = function( src, filename, filepath ){
    
    return gulp.src(src )
        .pipe( routerify().on('error', gutil.log) )
        .pipe( gulp.dest( filepath ).on('error', gutil.log) );
    
}

//THE BUILD ITERATOR
var build = ( development === true )? dev : dist;


//PACK THE RELEVANT DIRECTIVES
gulp.task('directives', [], function(){

    return build( paths.directives, 'directives.js', dest.directives );

});

//PACK THE RELEVANT SERVICES
gulp.task('services', [], function(){

    return build( paths.services, "services.js", dest.services );

});

//PACK THE RELEVANT CONTROLLERS
gulp.task('controllers', [], function(){

    return build( paths.controllers, "controllers.js", dest.controllers );

});

var myWork = function( d ){

	d.on("data", function(e){
		console.log(e);
	})
	//
}

//PACKAGE THE CSS into one manageable file
gulp.task('css', [], function(){

    return build( paths.css, "import.css", dest.css );

});

//PACKAGE THE JS into one manageable file
gulp.task('js', [], function(){

    return build( paths.js, "import.js", dest.js )

});


//!TEST FILE PACKAGING
gulp.task('test',[],function(){
    return gulp.src(`${__dirname}/test.js` )
            .pipe( babel({ presets: ['es2015'] }).on('error', gutil.log) )
            .pipe( uglify().on('error', gutil.log) )
            .pipe( gulp.dest( `${__dirname}/tests` ).on('error', gutil.log) )
})

//PACKAGE THE FINAL PAGE DEPENDENCIES INTO A SINGLE FILE
gulp.task('package', ['build'], function(){
    
        var resp = []
    
       for( fdir in files_dir ){
           resp.push( 
                build( paths.application, "application.js", dest.application )
	    	    .pipe( sourcemaps.write().on('error', gutil.log) )
                .pipe( ngmin().on('error', gutil.log) )
                .pipe( babel({ presets: ['es2015'] }).on('error', gutil.log) )
                .pipe( uglify().on('error', gutil.log) )
                .pipe( gulp.dest( files_dir[fdir] ).on('error', gutil.log) )
           );
       }
    
      rmFiles(files)
      .then(function(res){
          console.log("\n\nSUccessfully removed the required files");
          return resp;
      })
      .catch(function(err){
          console.log("\n\nCatastrophic file deletion error:\n".toUpperCase() + err + "\n\n");
          return resp;
      })
          
    //return build( paths.application, "application.js", dest.application ).pipe( ngmin() ).pipe( gulp.dest( dest.application ) );

});


var ps = fs.createWriteStream("routes.json",{ 'flags': 'w', 'encoding': null, 'mode': 0666 });

//PACKAGE THE SPECIAL VIEWS AND ADD UNTO THE MENU
gulp.task('router', [], function(){
    
    process.framify = process.framify || {};
    process.framify.routes = [];
    
        
    route( paths.views, "", dest.views ).pipe( routerify() ).pipe( ps );
    
})

//WATCH FOR FILE CHANGES AND TAKE THE REQUIRED ACTION
gulp.task('watch', function(){

	gulp.watch( [watcher.controllers, watcher.directives, watcher.services, watcher.application, watcher.views, watcher.css, watcher.js], [['clean','build','package'],['package'],['package'],['package'],['router'],['css'],['js']] );

});

//THE DEFAULT GULP TASK
gulp.task('default', ['watch']);

//THE GULP BUILD TASK
gulp.task('build', ['controllers','directives','services','router'] );

//THE BROWSER SYNC FUNCTION
gulp.task('serve', function() {
    
    var child = exec("node server/server.js", function(err, stdout, stderr){
    })
    
     browserSync.init({
                server: {
                    baseDir: "./",
                    proxy: "127.0.0.1:1357"
                }
            });
            gulp.watch("*").on('change', browserSync.reload)
    
    
});

//LOAD DEVELOPMENT SERVER
gulp.task('dev', ['package','watch']);
