let router = express.Router();

router.route("/")
.all(apify,(req,res)=>{

    log(`Got past the pgdb handler!`);
    res.send( make_response(200,'Magical days'));

})

module.exports = router;