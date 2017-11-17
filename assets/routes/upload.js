//# ensure that the upload folder exists
//@ Uploading to ../uploads/
var uploadPath          = path.join(__dirname, `./../uploads`);
fse.ensureDirSync(uploadPath);


// //@ INSTANTIATE THE FILE UPLODER
const upload            = multer({});

var router              = new express.Router();
 
// Set the headers
var headers             = 
{
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
};
 
const CREATE_HASH       = function( file_buffer )
{
    return new Promise(function(resolve,reject){
        resolve( crypt.md5(file_buffer) );
    });
};
 
router.route("/")
.post( upload.fields([{name:"upload",maxCount:1}]),(req,res,all )=>
{
    
    //@ HASH THE MINUTES TO CREATE AN IDENTIFIER AND A UNIQUE MINUTE FILENAME
    CREATE_HASH( req.files.upload[0].buffer )
    .then((minute_filename_hash)=>
    {
    
         //@ GET THE FILE'S DEFAULT EXTENSION
         var ext      = req.files.upload[0].originalname.split(".").pop();
         var filnom =  req.body.filename || minute_filename_hash;
         var filepath = `${uploadPath}/${filnom}.${ext}`;
                       
        
        //@ WRITE THE FILE TO THE SYSTEM
        fs.writeFile(filepath,req.files.upload[0].buffer,(err) => 
        {
            if(err)
            {
                res.send( make_response(500, err.message ) );
            }
            else
            {
               
               res.send( make_response(200, `The file ${filnom}.${ext} has been uploaded.`) );
                
            }
                
        });
        
    })
    .catch(error=>res.send( make_response(500,error.message, "Captured at the hash promise catch block") ));
    
});

router.route("/groups")
.post(upload.fields([{name:"group",maxCount:1}]),(req,res,all )=>
{

    const uploaded = req.files.group[0];

    //@ Ensure that the file is in csv format
    if( uploaded.mimetype=='text/csv' )
    {

       //@ CAPTURE THE SENDER'S ORGANIZATION
        if( req.whoami.member_id )
        {   

            let curr_user   = req.whoami
            let org         = curr_user.organization;
            // console.log(`\n\nOrganization: ${org}\n\n`)

            let groups = req.files.group[0].buffer
            .toString('utf8')
            .split("\n")
            .map(a=>a.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/).replace(/\r/ig,''))
            .filter(b=>(b[0]))
            .map(c=>
            {
                return `('${c[0]}','${org}')`
            });
            let groupLength = groups.length;
            groups = groups.join(",");            

            // j_log(groups)

            //@ Perform the actual addition
            pgdb.query(`INSERT INTO groups (group_name,group_organization) VALUES ${groups}`)
            .then( d => 
            {

                res.send( make_response(200, `<b><i>${groupLength}</i></b> groups successfully added to your organization <b><i>${curr_user.organization_name}</i></b>`) );

            })
            .catch( err => 
            {
                console.log( err.message||err );
                res.send( (!err.response) ? make_response(500,err.message||err) : err );
            });


        }
        else
        {
            res.send( make_response( 401, 'Could not verify your authority to do this' ) );
        }
       

    }
    else
    {

        res.send( make_response(400, 'An invalid group data file format was detected.<br>Please ensure that you are using an actual csv file.') );

    }


});

console.log( "\n✔".succ + "  I n i t i a l i z e d  t h e  f i l e  u p l o a d  s e r v i c e".info );
module.exports = router;
