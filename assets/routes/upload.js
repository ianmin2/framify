//# ensure that the upload folder exists
//@ Uploading to ../uploads/minutes
var uploadPath = `${__dirname}/../uploads`;
if ( !fs.existsSync(uploadPath) ){
    var filebuilder = `${__dirname}/..`;
    uploadPath
    .split("..")[1]
    .split("/")
    .filter(p=>p)
    .forEach(filedest => { 
        filebuilder+=`/${filedest}`; 
        if( !fs.existsSync(filebuilder) ){
            fs.mkdirSync(filebuilder);
        }
    });
};

// //@ INSTANTIATE THE FILE UPLODER
const upload = multer({});

var router = new express.Router();

var request = require('request');
 
// Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
}
 
const CREATE_HASH = function( file_buffer ){
    return new Promise(function(resolve,reject){
        resolve( crypt.md5(file_buffer) );
    })
} 
 
router.route("/")
.post( upload.fields([{name:"upload",maxCount:1}]),(req,res,all )=>{
    
    //@ HASH THE MINUTES TO CREATE AN IDENTIFIER AND A UNIQUE MINUTE FILENAME
    CREATE_HASH( req.files.upload[0].buffer )
    .then((minute_filename_hash)=>{
    
         //@ GET THE FILE'S DEFAULT EXTENSION
         var ext      = req.files.upload[0].originalname.split(".").pop();
         var filnom =  req.body.filename || minute_filename_hash;
         var filepath = `${uploadPath}/${filnom}.${ext}`;
                       
        
        //@ WRITE THE FILE TO THE SYSTEM
        fs.writeFile(filepath,req.files.upload[0].buffer,(err) => {
            if(err){
                res.send( make_response(500, err.message ) );
            }else{
               
               res.send( make_response(200, `The file ${filnom}.${ext} has been uploaded.`) )
                
            }
                
        })
        
    })
    .catch(error=>res.send( make_response(500,error.message, "Captured at the hash promise catch block") ))
    
});

console.log( "\n✔".succ + "  I n i t i a l i z e d  t h e  f i l e  u p l o a d  s e r v i c e".info );
module.exports = router;