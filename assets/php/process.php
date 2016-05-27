<?php 
header("Content-Type:application/json");
	class Process {
		
		public $c;		
		
		public function __construct( $connection ){
			
			$this->c  = $connection;
			
		}
		
		//@ ADDER FUNCTION
		public function addFunc( $addData ){
			
			$table  = $addData["table"];
			$extras = @$addData["extras"];
						
			unset( $addData["table"] );
			unset( $addData["extras"] );
			unset( $addData["specifics"]);
			
			
			$keys   = [];
			$values = [];
			
			while( $field_name = current($addData) ) {   
				//echo key($addData).' '.$field_name.'<br>';
				array_push( $keys, key($addData) );
				array_push( $values, $field_name );
				next($addData);
			}
			
			$field_names  = "(";
			$field_values = "(";
			
			
			
			forEach( $keys as $pos => $field ){
				
				$field_names  .= $field.",";
				
				$field_values .= "'".$values[$pos]."',";
				
			}
			
			$field_names     = rtrim($field_names, ",").")";
			$field_values    = rtrim($field_values, ",").")";
			
			$query = "INSERT INTO ".$table." ".$field_names." VALUES ".$field_values." ".@$extras; 					
			
			
			return $this->c->aQuery( $query ,true, "Done", "Failed");
			
		}
		
		//@ SPECIFIC GETTER
		public function getFunc( $getData ){
			
			$table  	= $getData["table"];
			$extras 	= @$getData["extras"];
			$specifics	= ( @$getData["specifics"] != NULL ) ? $getData["specifics"] : "*";
			
			unset( $getData["table"] );
			unset( $getData["extras"] );
			unset( $getData["specifics"] );
			
			$keys   = [];
			$values = [];
			
			while( $field_name = current($getData) ) {   
				//echo key($addData).' '.$field_name.'<br>';
				array_push( $keys, key($getData) );
				array_push( $values, $field_name );
				next($getData);
			}
			
			$conditions = [];
			
			forEach( $keys as $pos => $field ){
				
				array_push($conditions, $field."='".$values[$pos]."'");
				
			}
			$conditions = ( sizeof($conditions) > 0 )? ( " WHERE ".implode(" AND ", $conditions)  ) : "";			
						
			$query = "SELECT ".$specifics." FROM ".$table." ".$conditions."".@$extras;
			
			//return $this->c->wrapResponse(200,$query,"");
			return $this->c->printQueryResults( $query, true, true );
			
		} 
		
		//@ COMPREHENSIVE GETTER
		public function getAllFunc( $getAllData ){
						
			$table  = $getAllData["table"];
			$extras = @$getAllData["extras"];
			$specifics	= ( @$getAllData["specifics"] != NULL ) ? $getAllData["specifics"] : "*";
						
			unset( $getAllData["table"] );
			unset( $getAllData["extras"] );
			unset( $getAllData["specifics"] );
						
			$query = "SELECT ".$specifics." FROM ".$table." ".@$extras;
						
			//return $this->c->wrapResponse( 200, $query );
			
			return $this->c->printQueryResults( $query, true, true );
			
		}
		
		//@ DELETE  FUNCTION ASSIST
		public function delFunc( $deleteData ){
			
			$table  = $deleteData["table"];
			$extras = @$deleteData["extras"];
			$specifics	= ( @$deleteData["specifics"] != NULL ) ? $deleteData["specifics"] : "*";
			
			unset( $deleteData["table"] );
			unset( $deleteData["extras"] );
			unset( $deleteData["specifics"] );
			
			$keys   = [];
			$values = [];
			
			while( $field_name = current($deleteData) ) {   
				//echo key($addData).' '.$field_name.'<br>';
				array_push( $keys, key($deleteData) );
				array_push( $values, $field_name );
				next($deleteData);
			}
			
			$conditions = [];
			
			forEach( $keys as $pos => $field ){
				
				array_push($conditions, $field."='".$values[$pos]."'");
				
			}
			
			$conditions = ( sizeof($conditions) > 0 )? ( " WHERE ".implode(" AND ", $conditions)  ) : "";			
			
			$query = "DELETE FROM ".$table.$conditions." ".@$extras;
			
			//return $this->c->wrapResponse(200,$query,"");
			return $this->c->aQuery($query, true,"Done.","Failed.");
			
		}
		
		//@ UPDATE FUNCTION ASSIST
		public function updateFunc( $updateData ){
		
			$table  = $updateData["table"];
			$extras = @$updateData["extras"];
			
			unset( $updateData["table"] );
			unset( $updateData["extras"] );
			unset($updateData["specifics"]);
			
			
			$keys   = [];
			$values = [];
			
			while( $field_name = current($updateData) ) {  				
				array_push( $keys, key($updateData) );
				array_push( $values, $field_name );
				next($updateData);				
			}
			
			$update_string = "";
			
			
			
			forEach( $keys as $pos => $field ){
				
				$update_string .= $field."='".$values[$pos]."',";
				
			}
			
			$update_string     = rtrim($update_string, ",");
			
    
            		$query = "UPDATE ".$table." SET ".$update_string." WHERE ".@$extras;
			
			return $this->c->aQuery( $query, true, "Done.", "Failed.");
			
		}

		//@ TRUNCATE FUNCTION ASSIST
		public function truncateFunc( $truncateData ){
			
			$table  = $truncateData["table"];
			$extras = @$truncateData["extras"];
			
			unset( $truncateData["table"] );
			unset( $truncateData["extras"] );
			unset($truncateData["specifics"]);
			
			$field_name  = array_keys( $truncateData )[0];
			$field_value = $truncateData[$field_name];
			
			$query = "TRUNCATE TABLE ".$table." ".@$extras;
			
			return $this->c->aQUery( $query ,true,"Done.", "Failed.");
			
		}
		
		//@ DROP FUNCTION ASSIST
		public function dropFunc( $dropData ){
			
			$table  = $dropData["table"];
			$extras = @$dropData["extras"];
			
			unset( $dropData["table"] );
			unset( $dropData["extras"] );
			unset( $dropData["specifics"] );
			
			$field_name  = array_keys( $dropData )[0];
			$field_value = $dropData[$field_name];
			
			$query = "DROP TABLE ".$table." ".@$extras;
						
			return $this->c->aQUery( $query, true , "Done.", "Failed.");
			
		}
		
		
	};

?>

