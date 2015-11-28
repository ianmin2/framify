//!LOAD THE NECESSARY LIBRARIES FOR GOOGLE DRIVE
var readline 	= require('readline');
var google 		= require('googleapis');
var GoogleAuth 	= require('google-auth-library');

//!DEFINE THE BASIC DRIVE CONFIGURATIONS 
var SCOPES 		= ['https://www.googleapis.com/auth/drive.metadata.readonly'];
var TOKEN_DIR 	= (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.bixbyte/.framify/';
var TOKEN_PATH 	= TOKEN_DIR + 'auth.json';
