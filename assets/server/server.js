// (function() {
//     var childProcess = require("child_process");
//     var oldSpawn = childProcess.spawn;
//     function mySpawn() {
//         console.log('spawn called');
//         console.log(arguments);
//         var result = oldSpawn.apply(this, arguments);
//         return result;
//     }
//     childProcess.spawn = mySpawn;
// })();

require("bixbyte-frame");

/**
 * MAILGUN EMAIL 
 * DEFINE YOUR API KEY IN A FILE NAMED mailgun.conf in the config directory
 * 
 * the mailgun.conf file in the config directory should look like :
 * 
 * module.exports = {
                    apiKey: "YOUR_MAILGUN_SPECIAL_KEY_GOES_HERE",
                    domain: "mg.YOUR_DOMAIN.TLD"
                 };
 * 
 */
var apiKey = require(`${__dirname}/../config/mailgun.conf`);
var email = mailgun(apiKey);

/**
 * sendData should be in the format: 
 * 
 * var attch = new mailgun.Attachment({data: filepath, filename: filename});
 * {
		from: 'Excited User <me@samples.mailgun.org>',
		to: 'serobnic@mail.ru',
		subject: 'Hello',
		text: 'Testing some Mailgun awesomness!',
		attachment: attch
	};

	for more, visit https://www.npmjs.com/package/mailgun-js
 */
var sendMail = (sendData) => {

    return new Promise((resolve, reject) => {

        email.messages().send(sendData, function(error, body) {
            if (error) {
                reject(error);
            } else {
                resolve(body);
            }
        });

    });

};

var mailData = {
    from: `Bixbyte Server Monitor <server_monitor@bixbyte.io>`,
    to: ['server_monitor@bixbyte.io'],
    bcc: ['mbaeian@gmail.com'],
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

// sendMail(mailData)
// .then(d=>c_log(d))
// .catch(e=>c_log(e));

//** SETUP THE PHP CGI INTERFACE
app.use("/php", php.cgi(`${__dirname}/../php`));

//app.port    = app.port || 5000;

//!SET THE BASIC DIRECTORY MIDDLEWARE
app.use(express.static(__dirname + '/../'));

//!ROOT ROUTE
app.route("/").all(function(req, res) {
    res.sendFile("index.html");
});

app.route("/login").all((req, res) => {
    //console.log( JSON.stringify(fs.readFileSync(`${__dirname}/../login.html`,'utf8'),null,2) )
    res.send(fs.readFileSync(`${__dirname}/../login.html`, 'utf8'));
})

//!ROUTE LEADING TO THE HOME DIRECTORY
app.route("/sample/:iara").all(function(req, res) {
    var i = req.params.iara;
    res.sendFile(i, { "root": __dirname + "/../" });
});

//!ROUTE LEADING TO THE CONFIGURATION FILE DIRECTORY 
app.route("/config/:fname").all(function(req, res) {
    c_log("getting the file" + req.params.fname)
    res.sendFile(req.params.fname, { "root": __dirname + "/../config/" })
});


//!THE SERVER STARTUP FILE
server.listen(app.port, function(err) {
    if (!err) {
        log(`Running server on `.success + `http://${myAddr}:${app.port}`.err);
    }
});

/** DO A PROGRAM CLEANUP BEFORE THE ACTUAL EXIT */

process.stdin.resume(); //so the program will not close instantly

function exitHandler(options, err) {

    if (options.cleanup) console.log('clean');
    if (err) console.log(err.stack);
    if (options.exit) process.exit();

}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));

//catches ctrl+c event
process.on('SIGINT', exitHandler.bind(null, { exit: true }));

//catches uncaught exceptions
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));