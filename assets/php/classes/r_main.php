<?php
/*
	* m4Labs Framework
	*The main connector file.
	*Allows the collective manipulation of a package
	*
	*
	*
	*
*/

/*
	* m4Labs Framework Database connection variables ... and more! */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type:application/json");
error_reporting(0);

date_default_timezone_set("Africa/Nairobi");

//$this_site = "eleanor/concept";

$db = 'mabati'; $host = 'localhost'; $user = 'postgres'; 
$pass = '146450f7'; $driver="pgsql"; //YOUR_DATABASE_PASSWORD_GOES_HERE

/*
	* m4Labs FrameworkEnd of database connection variable declaration*/
if (@$jsoncallback == ""){$jsoncallback = @$_REQUEST['callback'];}
//If the page resource identifier is provided
if(@$id != ''){

// WARNING ONLY ADD PAGES THAT ARE FULLY CLASSES OR PURELY FUNCTIONS TO THIS ARRAY Else Face the wrath of a broken connection 
    if( $id == "conn"):
        
		$connect = true;
        $ids = array('',
                 'r_connection.php',
		         'r_obsfucate.php'
                );
      
    else:
    
        $ids = array('',
                 't_mailer.php',		//Framework Mailing	Component
                 'r_obsfucate.php',		//Framework Obsfucation Component
                 'r_connection.php', 	//Framework Database Manipulation Component
                 'r_minify.php',		//Framework File Minifying component
                 'r_cleaner.php',		//Framework File Deletion Component	
                 'r_redirect.php',		//Framework Page Redirect Cmponent
		'class.login.php'		//for login purposes
	
                );
       
    endif;
	
	//find the position of the given page-id in the above array
	$pos = array_search($id, $ids);
	
	//if the given page-id is non existent in the array give it's position [currently 'NULL'] the value 'unknown'
	if($ids[$pos]==''){$ids[$pos] = 'unknown';}
	
	//Loop through the entire resource array			
	for($i = 0; $i <= (count($ids)-1); $i++){
	
		//if the current position in the array is not the current one, include the given resource page 
		if($i <> $pos){	
				 
			if($ids[$i] != ''){
				
				include "$ids[$i]";	
				
			}
			
		} 
		
	}
	
	//Establish a database connection where required
	if(@$connect){
		
		//Establishing a database connection courtesy of the imported  resource files
		$connection = new connection($db, $host, $user, $pass, $driver, $jsoncallback);
		//$respArray = makeResponse("SUCCESS", "SUCCESSFULLY ESTABLISHED A DATABASE CONNECTION", "{alert, iara}");
		//echo $jsoncallback."(".json_encode($respArray).")";
		
	}
    
    if(@$crypt[0] && @$crypt['key'] != "" && @$crypt['salt'] != ""){
           
        $crypto = new obsfucate($crypt['key'], $crypt['salt']);
           
    }

//If the page resource identifier is not provided
}else{
	
	$respArray = makeResponse("ERROR", "Critical Error: Failed to recognize application!", "");
	echo $jsoncallback."(".json_encode($respArray).")"; 
	die;
	
}

/*
	* m4Labs Framework******************************************************
	SIMPLE FUNCTIONS PLACED TO BE COPIED TO THE ACTUAL PAGES WHERE NEEDED
*/

function makeResponse($response, $message, $command){
		
		return array( "response" => $response, "data" => array( "message" => $message, "command" => $command ) );
		
}


function sanitize($value){

	return htmlspecialchars(str_replace("'","\'",$value));	

}

function makeCookie($cname, $cval, $days){
	
		$days = ($days * 24 * 60 * 60 * 1000);
		@setcookie($cname,$cval,$days);
		
}

/*
	* m4Labs Framework*****************************************************

*/

?>
