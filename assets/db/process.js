var prcs = {};

//@ SANITIZE THE DATABASE VALUES THAT YOU GET
prcs.sanitize = ($input) => $input;

//@ ADDER FUNCTION
prcs.addFunc = ( $addData ) => {
	
	return new Promise( (resolve,reject) => {

		$table  = ($addData["table"]) ? clone( $addData["table"] ) : "";
		$extras = ( $addData["extras"] ) ? clone( $addData["extras"] ) : "";
					
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
		$field_params = []
		$field_values = "(";

		for( var i = 0; i < $keys.length; i++ ){
			$field_names  += $keys[i]+',';
			$field_params.push( ($values[i] || "") );
			$field_values += "$"+(i+1)+",";
		}
		
		$field_names     = 	$field_names
							.split(",")
							.reduce((init,val)=>{ 
								return init.concat( ( val.indexOf(".") === -1 ) ? val:(`"${val}"`) ); 
							},[])
							.join(",")
							.replace(/,$/, ')')

		// $field_names     = $field_names.replace(/,$/, ')');
		$field_values    = $field_values.replace(/,$/, ')');
		
		$query = "INSERT INTO "+$table+" "+$field_names+" VALUES "+$field_values+" "+( ( $extras ) ? $extras : '' ); 					
	
		// c_log("\n\n")
		// console.log( $query )
		// j_log($field_params)
		// c_log("\n\n")

		$connection.query( $query, $field_params )
		.then( response => {

			resolve( make_response( 200, `${$table} record added` ) );

		})
		.catch( err => {

			resolve( make_response( 500, `Failed to add ${$table} record. <br> ${err.message}` ) );

		})


	})

};

//@ CUSTOM COUNTER
prcs.countFunc = ( $countData ) => {

	return new Promise( (resolve,reject) => {

		$table  	= ($countData["table"]) ? clone( $countData["table"] ) : "";
		$extras 	= ($countData["extras"]) ? clone( $countData["extras"] ) : "";
		$specifics	= ($countData["specifics"]) ? clone( $countData["specifics"] ) : "*";
		
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
		$condition_params = [];
		
		for( var i = 0; i < $keys.length; i++ ){
			$conditions.push($keys[i]+"=$"+(i+1));
			$condition_params.push( ($values[i] || "") );
		}
		
		$conditions = ( ($conditions.length) > 0 )? ( " WHERE "+ $conditions.join(" AND ")  ) : "";

		$query = "SELECT count("+$specifics+") FROM "+$table+" "+$conditions+""+(($extras)?$extras:'');
	
		$connection.query(  $query, $condition_params )
		.then( response => {

			resolve( make_response( 200, response[0].count ) );

		})
		.catch( err => {

			resolve( make_response( 500, err.message ) );

		})

	});

};
		
//@ SPECIFIC GETTER
prcs.getFunc = ( $getData ) => {
	
	return new Promise( (resolve,reject) =>{

		$table  	= ($getData["table"]) ? clone( $getData["table"] ) : "";
		$extras 	= ( $getData["extras"]  )   ? clone( $getData['extras'] ) : " LIMIT 100000";
		$specifics	= ( $getData["specifics"] ) ? clone( $getData["specifics"] ) : "*";
		
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
		$condition_params = [];
			
		for( var i = 0; i < $keys.length; i++ ){
			$conditions.push($keys[i]+"=$"+(i+1));
			$condition_params.push( ($values[i] || "") );
		}
		
		$conditions = ( $conditions.length > 0 )? ( " WHERE "+$conditions.join(" AND ")  ) : "";			
					
		$query = "SELECT "+$specifics+" FROM "+$table+" "+$conditions+" "+ ( ($extras ) ? $extras : '' );
		

		$connection.query(  $query, $condition_params )
		.then( response => {

			resolve( make_response( 200, response ) );

		})
		.catch( err => {

			resolve( make_response( 500, err.message ) );

		})

	})
	
};

//@ COMPREHENSIVE GETTER
prcs.getAllFunc = ( $getAllData ) => {
				
	return new Promise( (resolve,reject) => {

		$table  	= ($getAllData["table"]) ? clone( $getAllData["table"] ) : "";
		$extras 	= ($getAllData["extras"]) ? clone($getAllData["extras"]) : "";
		$specifics	= ( $getAllData["specifics"] ) ? clone($getAllData["specifics"]) : "*";
					
		delete ( $getAllData["table"] );
		delete ( $getAllData["extras"] );
		delete ( $getAllData["specifics"] );
					
		$query = "SELECT "+$specifics+" FROM "+$table+" "+(($extras)?$extras:'');

		$connection.query( $query  )
		.then( response => {

			resolve( make_response( 200, response ) );

		})
		.catch( err => {

			resolve( make_response( 500, err.message ) );

		})

	})

	
};		

//@ DELETE  FUNCTION ASSIST
prcs.delFunc = ( $deleteData ) => {
	
	return new Promise( (resolve,reject) => {

		

		$table  = ($deleteData["table"]) ? clone($deleteData["table"]) : "";		
		$extras =  ( $deleteData["extras"] ) ?  clone( $deleteData["extras"] ) : '';

		delete ( $deleteData["table"] );
		delete ( $deleteData["extras"] );
		delete ( $deleteData["specifics"] );
		
		$keys   = [];
		$values = [];
		
		for( $field_name in $deleteData ){
			$keys.push( $field_name );
			$values.push( $deleteData[$field_name] );
		}
		
		$conditions = [];
		$condition_params = [];
			
		for( var i = 0; i < $keys.length; i++ ){
			$conditions.push($keys[i]+"=$"+(i+1));
			$condition_params.push( ($values[i] || "") );
		}
		
		
		$conditions = ( $conditions.length > 0 )? ( " WHERE "+$conditions.join(" AND ")  ) : " IMPLICIT DELETES ARE NOT ALLOWED";		
		
		$query = `DELETE FROM ${$table} ${$conditions}`;

		$connection.query( $query, $condition_params )
		.then( response => {

			resolve( make_response( 200, `${$table} record removed` ) );

		})
		.catch( err => {

			resolve( make_response(500, `Failed to remove ${$table} record. <br> ${err.message}` ) );

		})


	})
	
};

//@ UPDATE FUNCTION ASSIST
prcs.updateFunc = ( $updateData ) => {

	return new Promise( (resolve,reject) => {

		$table  = ($updateData["table"]) ? clone($updateData["table"]) : "";
		$extras = ( $updateData["extras"] ) ? clone($updateData["extras"]) : "null<>null";
		
		delete ( $updateData["table"] );
		delete ( $updateData["extras"] );
		delete ($updateData["specifics"]);			
		
		$keys   = [];
		$values = [];			

		for( $field_name in $updateData ){
			$keys.push( $field_name );
			$values.push( $updateData[$field_name] );
		}
		
		$keys     = $keys
					.reduce((init,val)=>{ 
						return init.concat( ( val.indexOf(".") === -1 ) ? val:(`"${val}"`) ); 
					},[])

		$update_string = "";
		$update_params = [];

		for( var i = 0; i < $keys.length; i++ ){
			$update_string += $keys[i]+"=$"+((i+1))+",";
			$update_params.push( ($values[i] || "") );
		}
		

		$update_string     = $update_string.replace(/,$/,'');
		
		//PREVENT THE UPDATING OF ALL RECORDS WHERE NO IMPLICIT RULE IS SET {{using WHERE}}
		$query = "UPDATE "+$table+" SET "+$update_string+" WHERE "+(($extras)?$extras:'');

		$connection.query( $query, $update_params )
		.then( response => {

			resolve( make_response(200, `${$table} record updated` ) );

		})
		.catch( err => {

			resolve( make_response(500, `Failed to update ${$table} record. <br> ${err.message}`  ) );

		})

	})

};

//@ TRUNCATE FUNCTION ASSIST
prcs.truncateFunc = ( $truncateData ) => {
	
	return new Promise( (resolve,reject) => {

		$table  = ($truncateData["table"]) ? clone($truncateData["table"]) : "";
		$extras =  ( $truncateData["extras"] ) ? clone($truncateData["extras"]) : "";
		
		delete ( $truncateData["table"] );
		delete ( $truncateData["extras"] );
		delete ( $truncateData["specifics"] );
		
		
		$query = "TRUNCATE TABLE "+$table+" "+(($extras)?$extras:'');

		$connection.aQuery( $query,[],`${$table} truncated`, `Failed to truncate ${$table}, please ensure that it exists` )
		.then( response => {

			resolve( ( response ) );

		})
		.catch( err => {

			resolve( ( err.message ) );

		})

	})
	
};

//@ DROP FUNCTION ASSIST
prcs.dropFunc = ( $dropData ) => {
	
	return new Promise( (resolve,reject) => {

		$table  = ($dropData["table"]) ? clone($dropData["table"]) : "";
		$extras = ( $dropData['extras'] ) ? clone( $dropData["extras"] ) : "";
		
		delete ( $dropData["table"] );
		delete ( $dropData["extras"] );
		delete ( $dropData["specifics"] );
		
		$query = "DROP TABLE "+$table+" "+(($extras)?$extras:'');

		$connection.aQuery( $query, [],`${$table} dropped`, `Failed to drop ${$table}, please ensure that it exists.` )
		.then( response => {

			resolve( ( response ) );

		})
		.catch( err => {

			resolve( ( err.message ) );

		})

	})
	
};
		
//@ CUSTOM QUERYSTRING;
prcs.customFunc = ( $customData  ) => {
	
	return new Promise( (resolve,reject) => {

		$connection.query( $customData["query"], [$customData["params"]] )
		.then( response => {

			resolve( make_response( 200, response ) );

		})
		.catch( err => {

			resolve( make_response( 500, err.message ) );

		})

	})

};

//@ BACKUP FUNCTION
prcs.bkup =  () => {

	return new Promise( (resolve,reject) => {

		$connection.bkup()
		.then(response => {
			resolve( make_response(200,response) )
		})
		.catch( err => {
			resolve( make_response(200, err) )
		})

	})

};

module.exports = prcs;
