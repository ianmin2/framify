#! /usr/bin/env node

var fs = require("fs");
var home = require("./config").home;
var https = require("https");

require("shelljs/global");

var options = {
	host: 'api.gihub.com',
	path: ''	
};


var repo_name = ( process.argv[2] || "framify\ test\ \app" ).replace(/ +/g, '_').toLowerCase();;

//var username = JSON.stringify( exec("git config user.name").output.replace("\n","") );
var username = "ianmin2";
var token = "f2628158b0d92a29fa17ff5a8fd81e5728a84593";


var gitify = function( repo_name ){
	
	mkdir(repo_name);
	cd(repo_name);
	
	//CREATE THE REMOTE REPOSITORY
	var data = '"' + "{'name':'"+repo_name+"' }" + '"';
	exec( 'curl -u "'+ username +':'+ token +'" https://api.github.com/user/repos -d ' + data );
	
	//PUSH LOCAL CODE TO REMOTE REPOSITORY
	exec( 'git remote add origin git@githum.com:'+username+"/"+repo_name+".git ");
	exec( 'git push -u origin master ' );
	
};


gitify(repo_name);