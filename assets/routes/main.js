let router = express.Router(); 

//@ The main route
router.route("/")
.all(function(req, res) 
{
    res.sendFile(`index.html`, { root: `${__dirname}/../` });
});

//@ The echo service
app.route("/echo")
.all((req,res)=>
{
    var params =  global.keyFormat(global.keyFormat( ( Object.keys(req.body).length > 0 ) ? req.body : (url.parse( req.url , true ).query) ? url.parse( req.url , true ).query : {} ));
    res.status( params.status || 404 ).send( make_response( params.status || 404 , ( Object.keys(params).length > 0 ) ? params : "Nothing Was found" , 'framify echo service' ) )
});

//@ Handle configuration fille requests
router.route("/config/:fname")
.all(function(req, res) 
{
    c_log("getting the file" + req.params.fname);
    res.sendFile(req.params.fname, { "root": __dirname + "/../config/" });
});

module.exports = router;