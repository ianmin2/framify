var Process = {

		
		//@ ADDER FUNCTION
		 addFunc : ( $addData ) => {
			
			$table  = $addData["table"];
			$extras = ( $addData["extras"] ) ? $addData["extras"] : {};
						
			delete ( $addData["table"] );
			delete ( $addData["extras"] );
			delete ( $addData["specifics"]);
			
			
			$keys   = [];
			$values = [];

			for( $field_name in $addData ){
				$keys.push( $field_name );
				$values.push( $addData[$field_name] );
			}
			
			$field_names  = "(";
			$field_values = "(";
			
			for( var i = 0; i < $keys.length; i++ ){
				$field_names  += $keys[i]+',';
				$field_values += "'"+$values[i]+"',";
			}
			
			$field_names     = $field_names.replace(/,$/, ')');
			$field_values    = $field_values.replace(/,$/, ')');
			
			$query = "INSERT INTO "+$table+" "+$field_names+" VALUES "+$field_values+" "+( $extras ) ? $extras : ''; 					
			
			***// return $this->c->makeResponse(200,$query);
			***// return $this->c->aQuery( $query ,true, $table+" record added", "Failed");
			
		}

		//@ CUSTOM COUNTER
		,countFunc : ( $countData ) => {

			$table  	= $countData["table"];
			$extras 	= ($countData["extras"]) ? $countData["extras"] : {};
			$specifics	= ($getData["specifics"]) ? $getData["specifics"] : "*";
			
			delete ( $countData["table"] );
			delete ( $countData["extras"] );
			delete ( $countData["specifics"] );

			$keys   = [];
			$values = [];
			

			for( $field_name in $countData ){
				$keys.push( $field_name );
				$values.push( $countData[$field_name] );
			}
			
			$conditions = [];
			
			for( var i = 0; i < $keys.length; i++ ){
				$conditions.push($keys[i]+"='"+$values[i]+"'");
			}
			
			$conditions = ( ($conditions.length) > 0 )? ( " WHERE "+ $conditions.join(" AND ")  ) : "";

			$query = "SELECT count("+$specifics+") FROM "+$table+" "+$conditions+""+($extras)?$extras:'';
			
			***//return $this->c->wrapResponse(200,$query,"");
			***// $result = $this->c->printQueryResults($query,true,false);

			$postgres 	= ( $result[0]["count"] ) ? $result[0]["count"] : $result[0]["count("+$specifics+")"] ;

			$count = ( $result[0]["count"] != null && $result[0]["count"] != "" ) ? $postgres : "";

			***// return $this->c->wrapResponse(200, $count, true );

		}
		
		//@ SPECIFIC GETTER
		,getFunc : ( $getData ) => {
			
			$table  	= $getData["table"];
			$extras 	= ( $getData["extras"]  )   ? $getData['extras'] : " LIMIT 100000";
			$specifics	= ( $getData["specifics"] ) ? $getData["specifics"] : "*";
			
			delete ( $getData["table"] );
			delete ( $getData["extras"] );
			delete ( $getData["specifics"] );
			
			$keys   = [];
			$values = [];

			for( $field_name in $getData ){
				$keys.push( $field_name );
				$values.push( $getData[$field_name] );
			}
			
			$conditions = [];

			for( var i = 0; i < $keys.length; i++ ){
				$conditions.push($field+"='"+$values[$pos]+"'");
			}
			
			$conditions = ( $conditions.length > 0 )? ( " WHERE "+$conditions.join(" AND ")  ) : "";			
						
			$query = "SELECT "+$specifics+" FROM "+$table+" "+$conditions+" "+($extras ) ? $extras : '';
			
			***//return $this->c->wrapResponse(200,$query,"");
			***// return $this->c->printQueryResults( $query, true, true );
			
		} 

		//@ COMPREHENSIVE GETTER
		,getAllFunc : ( $getAllData ) => {
						
			$table  	= $getAllData["table"];
			$extras 	= $getAllData["extras"];
			$specifics	= ( $getAllData["specifics"] ) ? $getAllData["specifics"] : "*";
						
			delete ( $getAllData["table"] );
			delete ( $getAllData["extras"] );
			delete ( $getAllData["specifics"] );
						
			$query = "SELECT "+$specifics+" FROM "+$table+" "+$extras;
						
			***//return $this->c->wrapResponse( 200, $query );
			
			***// return $this->c->printQueryResults( $query, true, true );
			
		}		

		//@ DELETE  FUNCTION ASSIST
		,delFunc : ( $deleteData ) => {
			
			$table  = $deleteData["table"];
			$extras = $deleteData["extras"];
			
			delete ( $deleteData["table"] );
			delete ( $deleteData["extras"] );
			delete ( $deleteData["specifics"] );
			
			$keys   = [];
			$values = [];
			
			for( $field_name in $getData ){
				$keys.push( $field_name );
				$values.push( $getData[$field_name] );
			}
			
			$conditions = [];

			for( var i = 0; i < $keys.length; i++ ){
				$conditions.push($field+"='"+$values[$pos]+"'");
			}
			
			$conditions = ( $conditions.length > 0 )? ( " WHERE "+$conditions.join(" AND ")  ) : "";		
			
			//PREVENT THE DELETION OF ALL RECORDS WHERE NO IMPLICIT RULE IS SET {{using WHERE}}
			***// $query = "DELETE FROM "+$table+" WHERE "+$conditions+" "+$extras;
			
			***//return $this->c->wrapResponse(200,$query,"");
			***//return $this->c->aQuery($query, true, $table+" record deleted+","Failed+");
			
		}


		//@ UPDATE FUNCTION ASSIST
		,public function updateFunc( $updateData ){
		
			$table  = $updateData["table"];
			$extras = ( $updateData["extras"] != NULL ) ? $updateData["extras"] : "null=null";
			
			delete ( $updateData["table"] );
			delete ( $updateData["extras"] );
			delete ($updateData["specifics"]);
			
			
			$keys   = [];
			$values = [];
			
			while( $field_name = current($updateData) ) {  				
				array_push( $keys, key($updateData) );
				array_push( $values, $field_name );
				next($updateData);				
			}
			
			$update_string = "";
			
			
			
			forEach( $keys as $pos => $field ){
				
				$update_string .= $field+"='"+$this->sanitize($values[$pos])+"',";
				
			}
			
			$update_string     = rtrim($update_string, ",");
			
			//PREVENT THE UPDATING OF ALL RECORDS WHERE NO IMPLICIT RULE IS SET {{using WHERE}}
			$query = "UPDATE "+$table+" SET "+$update_string+" WHERE "+$extras;
			
			// return $this->c->makeResponse( 200, $query );
			return $this->c->aQuery( $query, true, $table+" record updated+", "Failed+");
			
		}



}

	class Process {
		
		public $c;		
		
		public function __construct( $connection ){
			
			$this->c  = $connection;
			
		}

		//@ SANITIZE THE DATABASE VALUES THAT YOU GET
		private function sanitize($input){
			return 	$input;
			// if(get_magic_quotes_qpc($input)){

			// 	$input = trim($input); // get rid of white space left and right
			// 	$input = htmlentities($input); // convert symbols to html entities
			// 	return $input;

			// } else {

			// 	$input = htmlentities($input); // convert symbols to html entities
			// 	$input = addslashes($input); // server doesn't add slashes, so we will add them to escape ',",\,NULL
			// 	$input = preg_replace( '|%[a-fA-F0-9][a-fA-F0-9]|', '', $input ); //strip out any % encoded octets
			// 	return $input;

			// }

		}
	


		
		
	

		

		//@ TRUNCATE FUNCTION ASSIST
		public function truncateFunc( $truncateData ){
			
			$table  = $truncateData["table"];
			$extras = $truncateData["extras"];
			
			delete ( $truncateData["table"] );
			delete ( $truncateData["extras"] );
			delete ($truncateData["specifics"]);
			
			$field_name  = array_keys( $truncateData )[0];
			$field_value = $truncateData[$field_name];
			
			$query = "TRUNCATE TABLE "+$table+" "+$extras;
			
			return $this->c->aQUery( $query ,true, $table+" table truncated+", "Failed+");
			
		}
		
		//@ DROP FUNCTION ASSIST
		public function dropFunc( $dropData ){
			
			$table  = $dropData["table"];
			$extras = $dropData["extras"];
			
			delete ( $dropData["table"] );
			delete ( $dropData["extras"] );
			delete ( $dropData["specifics"] );
			
			$field_name  = array_keys( $dropData )[0];
			$field_value = $dropData[$field_name];
			
			$query = "DROP TABLE "+$table+" "+$extras;
						
			return $this->c->aQUery( $query, true , $table+" table dropped+", "Failed+");
			
		}
		
		
		//@ CUSTOM QUERYSTRING;
		public function customFunc( $customData  ){
			$ret = $this->c->printQueryResults( $customData['query'] ,true,true);
			$v   = (array) json_decode($ret);
			$vd  = (array) $v["data"];
			$vm  = (array) $vd["message"];
			if( !$vm[0] && isset($customData['query2']) ){
				$ret = $this->c->printQueryResults( $customData['query2'] ,true,true);
			}			
			return $ret;
		}
		
	};

?>