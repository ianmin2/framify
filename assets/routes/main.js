let router = express.Router(); 

//@ The main route
router.route("/")
.all(function(req, res) {
    res.sendFile(`index.html`, { root: `${__dirname}/../` });
});

//@ Send the default login page
router.route("/login")
.all((req, res) => {
    //console.log( JSON.stringify(fs.readFileSync(`${__dirname}/../login.html`,'utf8'),null,2) )
    res.send(fs.readFileSync(`${__dirname}/../login.html`, 'utf8'));
})

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