let files = {
	jwt_secret 		: path.join(__dirname,`jwt-secret.conf`)
	,mongo_config 	        : path.join(__dirname,`mongo.conf`)
	,pg_config		: path.join(__dirname,`postgres.conf`)
	,sms_config		: path.join(__dirname,'sms.conf')
}


//@ OATH SERVICE PROVIDER CONNNECTION KEYS
exports.oauth = {
	"facebook" : {
		"client_id": "",
		"client_secret": "",
		"callback": "http://localhost:1357/auth/facebook/callback"
	},
	"google" : {
		"client_id": "",
		"client_secret": "",
		"callback": ""
	},
	"twitter" : {
		"client_id": "",
		"client_secret": "",
		"callback": ""
	},
	"github" : {
		"client_id": "",
		"client_secret": "",
		"callback": ""
	},
	"linkedin" : {
		"client_id": "",
		"client_secret": "",
		"callback": ""
	}
};

//@ MONGODB DATABASE CONNECTION PARAMETERS (.database)
if(fs.existsSync(files.mongo_config)){
	exports.database = require(files.mongo_config)
	c_log(`\n✔`.succ + `  Loaded the user defined mongodb connection definition file`.info)
	// j_log(exports.database)
}else{
	exports.database = {};
	throw new Error(`\nA mongodb configuration file is required so as to achieve a connection to mongodb`.err
	+`\nTo do this, create a `.yell + `mongo.conf` + ` file in the `.yell+`config`+` folder of your project with the content:`.yell
	+`\n
module.exports = 
{
	"name"         : "MONGO_DATABASE_NAME"
	,"user"        : "MONGO_USERNAME"
	,"password"    : "MONGO_PASSWORD"
	,"host"        : 
	{
		"url"     		: "localhost"
		,"port"   		: 27017
		,"idle"   		: 30
		,"max_connections"	: 100
	}
};
	`);
}


//@ POSTGRESQL DATABASE CONNECTION PARAMETERS (.postgres)
if(fs.existsSync(files.pg_config)){
	exports.postgres = require(files.pg_config,'utf8');
	c_log(`\n✔`.succ + `  Loaded the user defined postgresql connection definition file`.info)
	// j_log(exports.postgres)
}else{
	exports.postgres = {};
	throw new Error(`\nA postgresql configuration file is required so as to achieve a connection to the postgres database`.err
	+`\nTo do this, create a `.yell + `postgres.conf` + ` file in the `.yell+`config`+` folder of your project with the content:`.yell
	+`\n
module.exports = 
{
	"user"		    : "PG_USERNAME"
	,"database"	    : "PG_DATABASE_NAME"
	,"password"	    : "pg_PASSWORD"
	,"host"		    : "localhost"
	,"port"		    : 5432
	,"max"		    : 10
	,"idleTimeoutMillis": 30000
}
	`);
}

//@ JWT SIGNING KEY  (.secret)
if( fs.existsSync(files.jwt_secret) ){

	exports.secret = fs.readFileSync(files.jwt_secret,'utf8');
	c_log(`\n✔`.succ + `  Loaded the user defined JWT signing key`.info)

}else{

	throw new Error(`A `.err + `jwt-secret.conf` + ` file containing a JWT signing key is required for your access tokens`.err +
	`\n\nPlease create a `.yell+`json-secret.conf`+` file in the config folder of your project.`.yell
	+`\n\nPlease add a strong and very lengthy random key into the `.info+`json-secret.conf`+` file to protect your login sessions`.info);
	process.exit(1);

}


//@ SMS CREDENTIALS (.sms)
if(fs.existsSync(files.sms_config)){
	exports.sms = require(files.sms_config,'utf8');
	c_log(`\n✔`.succ + `  Loaded the user defined SMS configuration file`.info)
	// j_log(exports.sms)
}else{
	exports.sms = {};
	throw new Error(`\nAn SMS configuration file is required so as to send SMS messages`.err
	+`\nTo do this, create a `.yell + `sms.conf` + ` file in the `.yell+`config`+` folder of your project with the content:`.yell
	+`\n
module.exports = 
{
	"username"	    : "SMS_USERNAME"
	,"password"	    : "SMS_PASSWORD"
	,"sender"	    : "SMS_SENDER_ID"
}
	`);
}
