<?php

    //@ p-connect-framify SETUP
	$id         = "conn";
	$connect    = true;
			
	include ("crypto.php");
	include ("classes/r_main.php");

    print_r( $connection->keyVal("SELECT * FROM tests", "test_id", "name") );