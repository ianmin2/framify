//@ UNCOMMENT TO RUN THE APPLICATION IN CLUSTER MODE
/*
(function() {
    var childProcess = require("child_process");
    var oldSpawn = childProcess.spawn;

    function mySpawn() {
        console.log('spawn called');
        console.log(arguments);
        var result = oldSpawn.apply(this, arguments);
        return result;
    }
    childProcess.spawn = mySpawn;
})();
*/

//@ IMPORT THE PARENT FRAMEWORK
require("bixbyte-frame");

//@ Inject the promise library into mongoose
mongoose.promise = global.Promise;

//@ Import the main configuration file
global.config   = require(`${__dirname}/../config/config`);

//@ Define the authentication database [mongo/postgres]
global.authMeth = "mongo";

//@ postgres initialization
global.pool = new pg.Pool(config.postgres);
global.pgClient = () => new pg.Client(config.postgres);

//@ Set the application's running port [the default port is 1357]
app.port =  3000;

//@ Import the members database schema
global.member   = require(`${__dirname}/../schema/members`);

//@ Establish a database connection
db("mongo", config.database);

//@ Framify Security Middleware Defiinition
//@ Framify Security Middleware Defiinition
var framifySecurity = function ( req ,res ,next) {

        let payload = req.headers.authorization
        req.whoami  = ( payload ) ? json( crypt.base64_decode( payload.replace(/JWT /ig, '').split(".")[1]  ) ) : {};
        req.role    = ( payload ) ? req.whoami.role : "guest";

        //@ JS configuration file filter
        let isConfig = /^\/config\/[A-Za-z0-9\*\!\-\_\%]+(.conf|.config|.js|.ts|.es6)$/ //.*\/(.*)\.(.*)
        let isSchema = /^\/schema\/*/
        let isRoutes = /^\/routes\/*/
        let isServer = /^\/server\/*/

        // console.dir(`${req.path}  == ${isConfig.test(req.path)}`)

        if( req.path == "/php" ){        

            // console.log( payload )
            // console.dir( req.path )
            // console.dir( req._parsedUrl.path )

            next()

        //@ Prevent rendering of unauthorized files in the project
        }else if( isConfig.test(req.path) || isSchema.test(req.path) || isRoutes.test(req.path) || isServer.test(req.path) ){
            res.status(401).json(make_response('Unauthorized'))
            console.log("Prevented access to unauthorized file".yell)
        }else{

            next()

        }

};

//@ Inject the security middleware
app.use( framifySecurity );

/**
 * THIS FRAMEWORK SUPPPORTS MAILGUN EMAIL 
 * DEFINE YOUR API CREDENTIALS IN A FILE NAMED mailgun.conf in the config directory
 * 
 * the mailgun.conf file in the config directory should look like :
 * 
 * module.exports = {
                    apiKey: "YOUR_MAILGUN_SPECIAL_KEY_GOES_HERE",
                    domain: "mg.YOUR_DOMAIN.TLD"
                 };
 * 
 */
//@ IMPORT THE MAIL LOADER METHOD
require(`${__dirname}/mail.js`);

//@ SAMPLE SERVER STARTUP MONITORING MAIL TEMPLATE
var mailData = {
    from: `Bixbyte Server Monitor <server_monitor@bixbyte.io>`,
    to: [], // Define the main recipient of the message
    bcc: [], //You can BCC someone here
    subject: `Framify Service Started at http://${myAddr}:${app.port} `,
    text: `Hello,\n\nYour service running on ${myAddr} port ${app.port} has just been started.\n\nWe hope that you are enjoying the framify experience.\n\nSincerely:\n\tThe Framify team. `,
    html: `<font color="gray"><u><h2>YOUR SERVICE IS UP!</u></font></h2>
                                <br>
                                Hello,<br><br>
                                Your service running on  <a href="http://${myAddr}:${app.port}"> http://<b>${myAddr}</b>:<b>${app.port}</b> </a> has just been started.
                                <br><br>
                                We hope that you are enjoying the framify experience.
                                <br>
                                <h4>Sincerely:</h4>
                                <br>
                                <i><u>The framify team.</u></i>
                                <br><br><br>
                                `,
    attachment: `${__dirname}/../favicon.ico`
};

//@ SEND A SAMPLE SERVICE STARTUP NOTIFICATION EMAIL BY UNCOMMENTING THE IMMEDIATE BLOCK COMMENT
/* 
    sendMail(mailData)
    .then(d=>c_log(d))
    .catch(e=>c_log(e));
*/

//@ Initialize passport for use
app.use( passport.initialize() );

//@ Alter the passport strategy for JWT
require("../config/passport")( passport );

//@ SETUP BODY PARSER MIDDLEWARE 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//@ SETUP THE PHP CGI INTERFACE
// ,passport.authenticate('jwt', { session: false }) 
app.use("/php" ,passport.authenticate('jwt', { session: false }) ,php.cgi(`${__dirname}/../php`));

//@ SETUP THE VIEWS STATIC DIRECTORY
app.use("/views", express.static(__dirname + '/../views'));

//@ SET THE BASIC DIRECTORY MIDDLEWARE
app.use(express.static(__dirname + '/../'));

//@ LOAD THE ROUTING FILE
app.use("/" , require( `${__dirname}/../routes/main` ))

//@ LOAD THE AUTHENTICATION ROUTES
app.use("/auth", require(`${__dirname}/../routes/auth`))

//@ LOAD THE FILE UPLOAD SERVICE
app.use("/upload" ,passport.authenticate('jwt', { session: false }) , require(`${__dirname}/../routes/upload`) );

//@ LISTEN  FOR EMAILS
app.route("/mail")
.post( passport.authenticate('jwt', { session: false }) ,(req,res) => {

    req.body.to = req.body.to.split(',')
    req.body.bcc = req.body.bcc.split(',')

    sendMail(req.body)
    .then(res.send)
    .catch(res.status(500).json);

})


/**
 * THIS FRAMEWORK SUPPPORTS GOOGLE CLOUD MESSAGING
 * DEFINE YOUR API CREDENTIALS IN A FILE NAMED gcm.conf in the config directory
 * 
 * the gcm.conf file in the config directory should look like :
 * 
 * module.exports = `YOUR_GCM_API_KEY`;
 * 
 * FOR MORE INFO, PLEASE VISIT https://console.developers.google.com
 **/
//@ LOAD THE GCM SERVICE
app.use("/gcm" ,passport.authenticate('jwt', { session: false }) , require(`${__dirname}/gcm`) );

//@ START THE SERVER
server.listen(app.port, function(err) {
    if (!err) {
        log(`Running server on `.success + `http://${myAddr}:${app.port}`.err);
    }
});

//@ Handle application exits gracefully
require("./server_cleanup")();


// Handle 404
app.use(function(req, res) {
    res.status(404).json(make_response(404,'404: Page not Found'));
});

// Handle 401
app.use(function(req, res) {
    res.status(401).json(make_response(401,'401: Unauthorized'));
});