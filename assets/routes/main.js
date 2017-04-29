let router = express.Router(); 

//@ The main route
router.route("/")
.all(function(req, res) {
    res.sendFile(`index.html`, { root: `${__dirname}/../` });
});

//@ The echo service
app.route("/echo")
.all((req,res)=>{
    var params =  global.keyFormat(global.keyFormat( ( Object.keys(req.body).length > 0 ) ? req.body : (url.parse( req.url , true ).query) ? url.parse( req.url , true ).query : {} ));
    res.status( params.status || 404 ).send( make_response( params.status || 404 , ( Object.keys(params).length > 0 ) ? params : "Nothing Was found" , 'framify echo service' ) )
})

// //@ Send the default login page
// router.route("/login")
// .all((req, res) => {
//     //console.log( JSON.stringify(fs.readFileSync(`${__dirname}/../login.html`,'utf8'),null,2) )
//     res.send(fs.readFileSync(`${__dirname}/../login.html`, 'utf8'));
// })

// //@ Handle File downloads
// router.route("/sample/:iara")
// .all(function(req, res) {
//     var i = req.params.iara;
//     res.sendFile(i, { "root": __dirname + "/../" });
// });

//@ Handle configuration fille requests
router.route("/config/:fname")
.all(function(req, res) {
    c_log("getting the file" + req.params.fname)
    res.sendFile(req.params.fname, { "root": __dirname + "/../config/" })
});

module.exports = router;