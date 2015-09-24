var os = require("os");
var fs = require("fs");

var content;

var fsify = setInterval( function(){

	content = '';
	
	content += '[Platform]' + os.EOL + os.EOL;
	content += 'OS Type: \t\t\t' + os.platform() + os.EOL;
	content += 'OS Version: \t\t' + os.release() + os.EOL;
	content += 'OS Architechture: \t' + os.arch() + os.EOL;
	content += os.EOL + os.EOL;
	content += '[Memory]' + os.EOL + os.EOL;
	content += 'Total(bytes): \t' + os.totalmem() + os.EOL;
	content += 'Free(bytes): \t' + os.freemem() + os.EOL;
	content += 'Free(%): \t\t' + ( ( os.freemem() / os.totalmem() ) * 100 ).toFixed(2) + os.EOL;
	content += os.EOL + os.EOL;
	content += '[CPU\'s]' + os.EOL + os.EOL;
	content += '# of CPU\'S: \t' + os.cpus().length + os.EOL;
	content += 'CPU Type: \t\t' + os.cpus()[0].model + os.EOL;
	
	fs.writeFile("./sysinfo.txt", content, function(err){
		if(err){
			//Sth
		}else{
			//Sth else
		}
	});	
	
}, 50);

fs.watch("./sysinfo.txt", function( event, filename ){
	
	if( event == "change" ){
		console.log( "A change occured" );
		pacify( );
	}
	
});

function pacify( ){
	
	fs.readFile("./sysinfo.txt", function(err, data){
		if(!err){
			document.getElementById("data").innerHTML = data;
		}
	});
	
}


