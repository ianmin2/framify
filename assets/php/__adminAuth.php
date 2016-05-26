<?php 

	ini_set('display_errors', 0);
	ini_set('display_startup_errors', 0);
	error_reporting(0);	

	header("Content-Type:application/json");

	$id         = "conn";
	$connect    = true;
			
	include ("crypto.php");
	include ("classes/r_main.php");  
	
	unset($_REQUEST["password2"]);
	
//ADD FILTERS TO PREVENT PIGGYBACKING ON ALL PARAMS
	$secure = ["add","del","update","truncate","drop"];  
	
	$errMsg = $connection->wrapResponse(500,"Could not verify your access level to perform this task!<br>Please login to continue.");
	
	if(in_array($_REQUEST['command'],$secure)){
		
		if( !@$_REQUEST["token"] || !@$_REQUEST["token"]["user"] || !@$_REQUEST["token"]["key"]){ echo $errMsg; exit; }
		if( $connection->num_rows("SELECT id FROM admin WHERE admin_name='".$_REQUEST["token"]["user"]."' AND password='".$_REQUEST["token"]["key"]."' ",true) <= 0 ){
				echo $errMsg;
				exit;
		}
		file_put_contents(".access_log.log", "\n".date('l F j Y h:i:s A')."\t".json_encode($_REQUEST), FILE_APPEND);
		
	}
	
		
?>
