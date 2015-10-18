var development = false;

/*
 * BASIC DEPENDENCY IMPORTATION
*/
var gulp        = require("gulp");
var concat      = require("gulp-concat");
var uglify      = require('gulp-uglify');
var imagemin    = require('gulp-imagemin');
var ngmin       = require('gulp-ngmin');
var browserify  = require('gulp-browserify');
var sourcemaps  = require('gulp-sourcemaps');
var del         = require('del');

var fs = require("fs");

/*
 * SETTING OF THE GLOBALS
*/

//THE PATHS IDENTIFIER OBJECT
var paths = {
	directives: 	["js/directives/main.js"],
	controllers: 	["js/controllers/main.js"],
	services: 	    ["js/services/main.js"],
	application: 	["main.js"],
	images: 	    'img/**/*',
    css:            'css/main.css',
    js:             'js/**.min.js',
    views:          "views/**.html",
};

var files_dir = [""];
var files = [];

for( fdir in files_dir ){
    files.push( files_dir[fdir] + "application.js" );
}

//THE WATCHER OBJECT
var watcher = {
	directives: 	["js/directives/**.dir.js"],
	controllers: 	["js/controllers/**.ctrl.js"],
	services: 	    ["js/services/**.serv.js"],
	application: 	["js/app.js"],
	images: 	    'img/**/*',
    css:            'css/**.min.css',
    js:             'js/**.min.js',
    views:          "views/**.html"
};


//THE DESTINATIONS OBJECT
var dest = {
	directives : "js/directives",
	controllers: "js/controllers",
	services:    "js/services",
	application: "",
    css:         "css",
    js:          "js",
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
            .pipe( browserify() )
            .pipe( concat( filename ) )
            //.pipe( ngmin({dynamic: true}) )
            .pipe( gulp.dest( filepath ) );
}

/*
 * THE DEVELOPMENT BUILD FUNCTION
 */
var dev = function( src, filename, filepath  ){
    return gulp.src( src )
        .pipe( sourcemaps.init() )
        .pipe( browserify({ insertGlobals: true, debug: true }) )
        .pipe( concat( filename ) )
        //.pipe( uglify({mangle: false}) )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( filepath ));

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

    return build( paths.js, "import.js", dest.js );

});



//PACKAGE THE FINAL PAGE DEPENDENCIES INTO A SINGLE FILE
gulp.task('package', ['build'], function(){
    
        var resp = []
    
       for( fdir in files_dir ){
           resp.push( build( paths.application, "application.js", dest.application ).pipe( ngmin() ).pipe( gulp.dest( files_dir[fdir] ) ));
       }
    
      rmFiles(files)
      .then(function(res){
          console.log("\n\nSUccessfully removes the required files" + res );
          return resp;
      })
      .catch(function(err){
          console.log("\n\nCatastrophic file deletion error\n\n".toUpperCase() + err + "\n\n");
          return resp;
      })
          
    //return build( paths.application, "application.js", dest.application ).pipe( ngmin() ).pipe( gulp.dest( dest.application ) );

});

//WATCH FOR FILE CHANGES AND TAKE THE REQUIRED ACTION
gulp.task('watch', function(){

	gulp.watch( [watcher.controllers, watcher.directives, watcher.services, watcher.application, watcher.views, watcher.css, watcher.js], [['clean','build','package'],['package'],['package'],['package'],['package'],['css'],['js']] );

});

//THE DEFAULT GULP TASK
gulp.task('default', ['watch']);

//THE GULP BUILD TASK
gulp.task('build', ['controllers','directives','services'] );
