#! /usr/bin/env node

require("../../config.js");

require("shelljs/global");

var options = {
	"host": "api.github.com",
	"path": ""	
};

//var username = JSON.stringify( exec("git config user.name").output.replace("\n","") );
var username = "ianmin2";
var token = "f2628158b0d92a29fa17ff5a8fd81e5728a84593";


var gitify = function( repoName ){

	mkdir( repoName );
	
	cd( repoName );
	
	var  data = '"' + "{'name':'"+repo_name+"' }" + '"';
	
	//PUSH LOCAL CODE TO REMOTE REPOSITORY
	exec( 'git remote add origin git@github.com:'+username+"/"+repoName+".git ");
	exec( 'git add * ' );
	exec( 'git commit -m ":earth_africa: Another commit from bixbyte-frame"' )
	exec( 'git push -u origin master ' );
	
};

gitify( app.vars.repository );