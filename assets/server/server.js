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

require('bixbyte-frame');

//@ Import the main configuration file
global.config   = require(path.join(__dirname,'../config/config'));

//@ Avail encrypt/decrypt methods globally
Object.assign(global, require( path.join(__dirname, 'enc_dec.js') ) );

//@ Avail the "sms_actions" method globally
Object.assign(global, require(path.join(__dirname, 'sms_actions.js') ));

//@ Define the authentication database [mongo/postgres]
global.authMeth = "pg";

//@ postgres initialization
global.pgdb  = pgp(config.postgres);

//@ Define the authentication database [mongo/postgres]
global.authMeth = "pgsql";

//@ Load the global postgres `$connection` object
require(path.join(__dirname,'../db/connection'));

//@ Load the express middleware for `n-frame` REST database API integration
global.apify    = require(path.join(__dirname,'../db/index'));

//@ Set the application's running port [the default port is 1357]
// app.port =  1357;

//@ Import the members database schema
global.member   = require(path.join(__dirname,'../schema/members'));

//@ Establish a database connection
// db("mongo", config.database);

//@ THE PREVENT UNAUTHORIZED TASKS MIDDLEWARE
global.adminOnly = function(req,res,next){
    
    let token = req.headers.authorization;

    if( token ){               
        token = token.toString().replace( /JWT /ig, '').replace(/\s/ig, '')
    }

    //@ Ensure that the provided jwt is valid

    try{
        
        verifiedJwt = nJwt.verify(token,config.secret);

        //@ Ensure that the trying party is also an administrator
        if( json( crypt.base64_decode( token.replace(/JWT /ig, '').split(".")[1] ) ).role === "admin" ){
            next();
        }else{
            res.status(401).json( make_response(  500, "You do not meet the minimum requirements to perform this action." ) );
        }

    }catch(e){
        console.log(e);
        res.send( make_response( 500, "Please login to continue" ) )
    }

};

//@ Framify Security Middleware Definition
var framifySecurity = function ( req ,res ,next) {

        let payload = req.headers.authorization
        req.whoami  = ( payload ) ? json( crypt.base64_decode( payload.replace(/JWT /ig, '').split(".")[1]  ) ) : {};
        req.role    = ( payload ) ? req.whoami.role : "guest";

        //@ JS configuration file filter
        let isConfig = /^\/config\/[A-Za-z0-9\*\!\-\_\%]+(.conf|.config|.js|.ts|.es6)$/ //.*\/(.*)\.(.*)
        let isSchema = /^\/schema\/*/
        let isRoutes = /^\/routes\/*/
        let isServer = /^\/server\/*/

        let isDb     = /^\/db\/*/
        let isPhp    = /^\/php\/*/

        // console.dir(`${req.path}  == ${isConfig.test(req.path)}`)

        // console.dir(req.path)

        //@ HANDLE SPECIAL PATHS
        if( ( isDb.test(req.path) || isPhp.test(req.path) ) ){   

            let pars = get_params(req);

            //@ ENSURE THAT THE REQUIRED PARAMETERS ARE DEFINED
            if( isDefined(pars,["command","table"]) ){

                //@ DON'T SCRUTINIZE BACKUP REQUESTS
                if( pars.command == "backup" ){
                    next();
                }else{

                    //@ CONSTRUCT A PATH FORBIDDER
                    let forbidden = 
                    {
                        add                 : /logs|password_recovery|aud_./ig 
                        ,update             : /password_recovery|payments|^members$|aud_./ig
                        ,get                : /^members$|password_recovery|vw_members|aud_./ig
                        ,del                : /^(?!.*(group_members))/ig
                        ,count              : /aud_./ig
                        ,truncate           : /./ig
                        ,drop               : /./ig
                        ,custom             : /./ig
                        ,getAll             : /./ig
                    };

                    //@ ENSURE THAT THE REQUESTED COMMAND HAS A DEFINED BARRIER 
                    if( forbidden[pars.command] ){
                        
                        //@ TEST THE PARAMETERS FOR FORBIDDEN PATHS
                        if( forbidden[pars.command].test( pars.table ) ){
                            res.json( make_response( 403, 'Could not perform the requested action'  ) )
                        }else{
                            next()
                        }

                    }else{
                        res.json( make_response(501, `The path you requested has not been implemented.`) )
                    }
                    


                    // j_log(pars)

                    // // console.log( payload )
                    // // console.dir( req.path )
                    // // console.dir( req._parsedUrl.path )


                }

                
            }else{

                    next()

            }


            

        //@ Prevent rendering of unauthorized files in the project
        }else if( isConfig.test(req.path) || isSchema.test(req.path) || isRoutes.test(req.path) || isServer.test(req.path) ){
            res.status(401).json(make_response(401,'Unauthorized'))
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
require(path.join(__dirname,'mail.js'));

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
    attachment: path.join(__dirname,'../favicon.ico')
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
// app.use("/php"  ,php.cgi(path.join(__dirname,'../php')));
app.use("/php" ,require(path.join(__dirname,'../routes/db')) );

//@ SETUP THE VIEWS STATIC DIRECTORY
app.use("/views", express.static(path.join(__dirname,'../views')));

//@ SET THE BASIC DIRECTORY MIDDLEWARE
app.use(express.static(path.join(__dirname,'../')));

//@ LOAD THE ROUTING FILE
app.use("/" , require(path.join(__dirname,'../routes/main')));

//@ LOAD THE AUTHENTICATION ROUTES
app.use("/auth", require(path.join(__dirname,'../routes/auth')));

//@ LOAD THE FILE UPLOAD SERVICE
app.use("/upload" ,passport.authenticate('jwt', { session: false }) , require(path.join(__dirname,'../routes/upload')) );

// ,passport.authenticate('jwt', {session: false}) 
//@ LOAD THE NON - CGI POSTGRES DATABASE HANDLER
app.use("/db" ,require(path.join(__dirname,'../routes/db')) );

//@ THE PASSWORD RECOVERY HANDLER
app.use("/passwords", require(path.join(__dirname,'../routes/passwords')) );

//@ THE SMS SENDING ROUTE 
app.use("/sms", require( path.join(__dirname,'../routes/sms') ))

// ================================================================
// CUSTOM

app.use("/payments" ,require(path.join(__dirname,'../routes/payments')) );

// EO - CUSTOM
// ================================================================

//@ LISTEN  FOR EMAILS
app.route("/mail")
.post( passport.authenticate('jwt', { session: false }) ,(req,res) => {

    let params = get_params(req);
    if(params.from){

        if( params.to ){

            params.to = (params.to) ? params.to.split(',') : undefined;
            
            if( params.bcc ){ 
                params.bcc =(params.bcc) ? params.bcc.split(',') :undefined;
            } 

            sendMail(params)
            .then(resp => {
                res.send( make_response(200,resp) )
            })
            .catch(err=>{
                res.status(500).json( make_response(500,err.message || err) )
            });

        }else{

            res.send( make_response(500,"Please provide a recipient's email address") );

        }

    }else{
        res.send( make_response(500,"Please provide a sender's  address") );
    }

});


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
app.use("/gcm" ,passport.authenticate('jwt', { session: false }) , require(path.join(__dirname,'gcm') ) );

//@ START THE SERVER
server.listen(app.port, function(err) {
    if (!err) {
        log(`Running server on `.success + `http://${myAddr}:${app.port}`.err);
    }
});

//@ Handle application exits gracefully
require(path.join(__dirname,'server_cleanup'))();


// Handle 404
app.use(function(req, res) {
    res.status(404).json(make_response(404,'404: Page not Found'));
});

// Handle 401
app.use(function(req, res) {
    res.status(401).json(make_response(401,'401: Unauthorized'));
});

// //@ Handle file changes for the SMS sender
// require(path.join(__dirname,'watcher.js'));

