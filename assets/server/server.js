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
    subject: `Service Started at ${myAddr}:${app.port} `,
    text: `Hello,\n\nYour service running on ${myAddr} port ${app.port} has just been started.\n\nWe hope that you are enjoying the framify experience.\n\nSincerely:\n\tThe Framify team. `,
    html: `<font color="gray"><u><h2>YOUR SERVICE IS UP!</u></font></h2>
                                <br>
                                Hello,<br><br>
                                Your service running on  <b>${myAddr}</b> port <b>${app.port}</b> has just been started.
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

//@ SETUP BODY PARSER MIDDLEWARE 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//@ SETUP THE PHP CGI INTERFACE
app.use("/php", php.cgi(`${__dirname}/../php`));

//@ SETUP THE VIEWS STATIC DIRECTORY
app.use("/views", express.static(__dirname + '/../views'));

//@ SET THE BASIC DIRECTORY MIDDLEWARE
app.use(express.static(__dirname + '/../public'));

//@ ROOT ROUTE
app.route("/").all(function(req, res) {
    res.sendFile(`index.html`, { root: `${__dirname}/../` });
});

app.route("/login").all((req, res) => {
    //console.log( JSON.stringify(fs.readFileSync(`${__dirname}/../login.html`,'utf8'),null,2) )
    res.send(fs.readFileSync(`${__dirname}/../login.html`, 'utf8'));
})

//@ HANDLE FILE DOWNLOADS
app.route("/sample/:iara").all(function(req, res) {
    var i = req.params.iara;
    res.sendFile(i, { "root": __dirname + "/../" });
});

//@ HANDLE CONFIGURATION FILE REQUESTS 
app.route("/config/:fname").all(function(req, res) {
    c_log("getting the file" + req.params.fname)
    res.sendFile(req.params.fname, { "root": __dirname + "/../config/" })
});

//@ CHANGE THE APP'S  DEFAULT PORT
//app.port =  3030;


//@ START THE SERVER
server.listen(app.port, function(err) {
    if (!err) {
        log(`Running server on `.success + `http://${myAddr}:${app.port}`.err);
    }
});

//@ DO A PROGRAM CLEANUP BEFORE THE ACTUAL EXIT 

process.stdin.resume(); //so the program will not close instantly

function exitHandler(options, err) {

    if (options.cleanup) {
        console.log(`\n\n@framify`.yell +
            `\nThe application exited gracefully\n\n`.info
        );
    }
    if (err) console.log(err.stack);
    if (options.exit) process.exit();

}

//@ HANDLE A  NATURAL APPLICATION EXIT
process.on('exit', exitHandler.bind(null, { cleanup: true }));

//@ CATCH A DELIBERATE ctrl+c 
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

//@ CATCH UNCAUGHT EXCEPTIONS
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));