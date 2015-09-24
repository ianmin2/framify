//IMPORT THE CRYPTO MODULE
var crypto = require("crypto");

//SET THE DECRYPTION KEY
var key = "498w8dq89fer8t5y65y8h8hh:gr.,,mknkjloiup32yuyuidfjch@#@3254%$&R&^";

//SHA256 HYBRID ENCRYPT A STRING
var sha256h = function( string ){
	return crypto.createHmac( 'SHA256', key ).update(string).digest('base64');
};

//MD5 ENCRYPT A STRING
var md5 = function( string ){
	return crypto.createHash('md5').update( string ).digest('hex');
};

//SHA1 ENCRYPT A STRING
var sha1 = function( string ){
	return crypto.createHash('sha1').update( string ).digest('hex');	
};

//SHA256 ENCRTPT A STRING
var sha256 = function( string ){
	return crypto.createhash('sha256').update( string ).digest('hex');
};

//GENERATE A CHECKSUM OF A BUFFER
var checksum = function ( stream , callback){
	
	var shaSum = crypto.createHash('md5');
	var isComplete = false;
	
	stream.on('data', function( data ){
		shaSum.update( data );
	});
	
	stream.on('end', function(){
		shaSum.digest('hex');
		isComplete = true;
	});
	
	var checkCompletion = setInterval(function(){
		if( isComplete  ){
			callback( shaSum );
			callback = null;
			shaSum = null;
			stream = null;
			isComplete = false;
			clearInterval( checkCompletion );
		}
	},100);
	
};

//EXPOSE THE SHA256 HYBRID ENCRYPTOR
exports.sha256h = sha256h;

//EXPOSE THE STANDARD MD5 ENCRYPTOR
exports.md5 = md5;

//EXPOSE THE STANDARD SHA1 ENCRYPTOR
exports.sha1 = sha1;

//EXPOSE THE STANDARD SHA256 ENCRYPTOR
exports.sha256 = sha256;

//EXPOSE THE STANDARS CHECKSUM GENERATOR
exports.checksum = checksum;
