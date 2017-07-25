
var gcmConfFile = `${__dirname}/../config/gcm.conf`;

var router 	= express.Router();

if( !fs.existsSync(gcmConfFile) ) {

	 c_log(`\n✘ `.err + ` Failed to initialize the GCM service.\n`.err +
		`\n   Please define a `.info +
		`gcm.conf`.yell +
		` file in the `.info +
		`config`.yell +
		` folder of your application with the content:`.info);

	    c_log(`
		module.exports = 'YOUR_GCM_API_KEY';
	    `);

	    c_log(`   to enable gcm functionality.\n`.info);
	    c_log(`For more, please visit https://console.developers.google.com `.yell);


		router.route("/")
		.all(function(req,res){
	
		res.status(503)
		.send( make_response(503,`No gcm configuration file exists in your project, please define one in order to use this feature.`) );
	
		});

}else{

	var gcmApiKey = fs.readFileSync(gcmConfFile,'utf8');

	router.route('/')
	.all( function (req, res) {
	    res.send( make_response(200,'Google CLoud Messaging Has been setup and is ready to use!') );
	});

	router.route('/push')
	.post(function (req, res) {
	
	    //CAPTURE THE CLIENT PARAMETERS
		var params =  global.keyFormat(global.keyFormat( ( Object.keys(req.body).length > 0 ) ? req.body : (url.parse( req.url , true ).query) ? url.parse( req.url , true ).query : {} ));
	
	    var device_tokens = []; //create array for storing device tokens
	    
	    var retry_times = 4; //the number of times to retry sending the message if it fails
	    
	    var sender = new gcm.Sender(gcmApiKey); //create a new sender
	    
	    var message = new gcm.Message(); //create a new message
	    
	    message.addData('title', params.title);
	    
	    message.addData('message', params.message);
	    
	    message.addData('sound', params.sound || "default");
	    
	    message.collapseKey = params.group || "General Messages"; //grouping messages
	    
	    message.delayWhileIdle = true; //delay sending while receiving device is offline
	    
	    message.timeToLive = 3600; //number of seconds to keep the message on server if the device is offline
	    
	  
	    sender.send(message, device_tokens, retry_times, function (result) {
	    
			console.log(`Push message sent to: ${device_tokens}`);
			
			res
			.status(200)
			.send( make_response(200,`Pushed notification to ${device_tokens}`) );
			
			}, function (err) {
			
			res
			.status(500)
			.send(make_response(500,`Failed to push notification to ${device_tokens}`, str(err) ) );
			
	    });
	    
	});

	c_log(`\n✔`.succ +` Google Cloud Messaging parameters successfully loaded.\n`.info);
	
}

module.exports 	= router;
										
