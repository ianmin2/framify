//!LOAD THE NECESSARY LIBRARIES FOR GOOGLE DRIVE
global.readline 	= require('readline');
global.google 		= require('googleapis');
global.GoogleAuth 	= require('google-auth-library');

//!DEFINE THE BASIC DRIVE CONFIGURATIONS 
global.SCOPES 		= ['https://www.googleapis.com/auth/drive'];
global.TOKEN_DIR 	= (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.bixbyte/.framify/';
global.TOKEN_PATH 	= TOKEN_DIR + 'auth.json';