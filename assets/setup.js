var fs          = require("fs");
var minify      = require("minify");
var browserify  = require("browserify");

//* FINAL DESTINATIONS
var jsf = fs.createWriteStream(__dirname+"/assets/js/js.js");
var csf = fs.createWriteStream(__dirname+"/assets/css/css.css");

var concat = function(pathArr,writePath){
    
    return new Promise(function(resolve,reject){
        
        var fStr =  fs.createWriteStream(writePath)
        var path =  writePath.split("/")
        path.splice(path.length -1, 1 )
        path = path.join("/")
               
        fStr.write( 
                    
                pathArr.reduce((str,lnk)=>{
                    str += ( fs.readFileSync(`${path}/${lnk}`) );
                    return str;
                },'')
        );
        fStr.end();
        resolve( writePath )
               
    })
    
};


var jsmin = function( filePath ){
    
  console.log(`\n${filePath}\n`)
    
  return new Promise((resolve,reject)=>{
      
      minify( filePath, (e,d)=>{
            if(e){
                console.log(`\nFailed to minify ${filePath}\n`)
                reject(e)
            }else{
                console.log(`\n->\t\t Packaged ${filePath}\n`)
                //fs.writeFileSync(filePath,d); 
                resolve()             
            }
        }); 
      
  })  
    
};

var brow = function(filePath,destination){
   
    // var p = filePath.split("/").pop().split(".").pop();

    
    return new Promise((resolve,reject)=>{
        
        console.log(`\n->\tProcessing ${filePath}\n`)
        
        var b = browserify()
        filePath.forEach((fp)=>{
            b.add(`assets/${fp.split("/").pop().split(".").pop().toString('utf8')}/${fp}`)
        });
        b.bundle((e,buff)=>{
              if(e){
                  console.log(`\nFailed to write to ${destination}\n`);
                  resolve(destination);
              }else{
                  fs.writeFileSync(destination, buff.toString('utf8'));
                  resolve(destination)
              }   
        })
        
       
    });
    
};

var js = [
            "ip.js","jquery.js","ionic.bundle.min.js","angular-aria.min.js","angular-messages.min.js","bootstrap.min.js","ionic.material.min.js",
            "api-check.min.js","formly.min.js","angular-formly-templates-ionic.min.js",
            "angular-material.min.js",
            "highcharts.js","highcharts-3d.js","highcharts-ng.js",
            "json-formatter.min.js",
            "crypto.js",
            "framify-paginate.min.js"
        ];
            
var css = [
                "ionic.min.css","json-formatter.min.css",
                "material-icons.css",    
                "angular-material.min.css",
                "material.min.css",
                "ionic.material.min.css",
                "bootstrap.min.css",
                "app.css"
            ];


Promise.all( [ brow(js,`${__dirname}/assets/js/js`) ] )
.then((d)=>{
    console.dir(d)
})
.catch((e)=>{
    console.dir(e)
})

Promise.all([concat(css,`${__dirname}/assets/css/css.css`)])
.then((s)=>{
   
    Promise.all(
        s.reduce((arr,el)=>{
            arr.push( brow([el],`${__dirname}/assets/css/css.css` ) );
            return arr;
        },[])
    )    
    .then(s=>{
        console.log(`\nSuccess\n`)
        console.log(s)
    })
    .catch(e=>{
        console.log(e)
    })
       
    
})
.catch((e)=>{
    console.dir(e)
})



// minify( __dirname+"/assets/css/css.js" , function(error, data) {
//     if (error)
//         console.error(error.message);
//     else
//         console.log(data);
// });

// console.log("Done")