// map-stream is used to create a stream that runs an async function
var map = require('map-stream');

var fs = require("fs")


var routerify = function() {

    var getFrame = /<framify( [^<>]+)>(.*?)<\/framify>/gi
    var getMenu = /menu=\"(.*?)\"/gi
    var getParent = /parent=\"(.*?)\"/gi
    var getPath = /path=\"(.*?)\"/gi
    var getUrl = /url=\"(.*?)\"/gi
    var getTitle = /title=\"(.*?)\"/gi
//    var getFrame = /<framify( [^<>]+)>(.*?)<\/framify>/gi
//    var getMenu = /menu=\"(.*?)\"/gi
//    var getParent = /parent=\"(.*?)\"/gi
//    var getPath = /path=\"(.*?)\"/gi
//    var getTitle = /title=\"(.*?)\"/gi

    allData = [];
    
    //!REMOVE DUPLICATES
    var remove_duplicates = function (array_){
        
        var ret_array = new Array();
        
        for (var a = array_.length - 1; a >= 0; a--) {
            
            for (var b = array_.length - 1; b >= 0; b--) {
                
                if(array_[a] == array_[b] && a != b){
                    
                    delete array_[b];
                    
                }
                
            };
            
            if(array_[a] != undefined)
                
                ret_array.push(array_[a]);
            
        };
        
        return ret_array.reverse();
        
    }

    var catchPath = function(fileData) {

        var frame, menu, parent, path, title;   
        //console.log("Processing " + fileData[0])

        var txt = fs.readFileSync(fileData[0]).toString();


        frame = txt.match(/<framify [^<]+><\/framify>/); 
        //console.log( "\n\n" + frame[0] + "\n\n" )
        //frame = getFrame.exec(txt); console.log( "\n\n" + frame + "\n\n" )

        if (frame) {
            
            try{ 
            
                menu = /(\\?")(.*?)\1/.exec( txt.match(getMenu) )[2]|| false;
                parent = /(\\?")(.*?)\1/.exec( txt.match(getParent) )[2];
                path = /(\\?")(.*?)\1/.exec( txt.match(getPath) )[2];
                url = /(\\?")(.*?)\1/.exec( txt.match(getUrl) )[2];
                title = /(\\?")(.*?)\1/.exec( txt.match(getTitle) )[2];
//              menu = getMenu.exec(frame)[1] || null;
//              parent = getParent.exec(frame)[1];
//              path = getPath.exec(frame)[1];
//              title = getTitle.exec(frame)[1];

                frame = fileData[0].split("/")[fileData[0].split("/").length - 1];
                
                process.framify.routes.push({
                    "menu": menu || false,
                    "title": title || "",
                    "path": path || "",
                    "url": url || "",
                    "view": "views/" + frame
                });

                
                   
                
                fs.writeFileSync("config/app-routes.json", JSON.stringify( remove_duplicates( process.framify.routes ) ), {
                    flags: 'w'
                })

               // console.log( "Added " + frame + " to the framify paths ")
                console.log("\n")
                console.log( process.framify.routes )
                console.log("\n")
            
            }catch(Err){
                
                //console.log("\n\nFAILED TO COMPILE APPLICATION while trying to generate paths. \nPlease check your view files for proper framify settitngs\n\n" + Err + "\n\n")
                
            }
            

        }


    }

    return map(function(file, cb) {

        var lint = catchPath([file.path])

        });
};

// Export the plugin main function
module.exports = routerify;