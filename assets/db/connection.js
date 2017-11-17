var conn = {};

/**
* MAKE A WRAPPED RESPONSE 
*/ 
conn.wrapResponse = ( $status, $message = '', $command = '' ) => 
{
	
	return ( make_response( $status, $message, $command ) );
	
};


/** 
* THE BASIC QUERY PERFORMER 
* */
conn.query = ( $statement, $params=[] ) => 
{
	
	/* 
		* Execute the query then fetch the returned associateive array for all values 
		* */
	return new Promise( (resolve,reject)=> {
		
		sqldb.query( $statement , 
		{ bind: $params ,type: sqldb.QueryTypes.SELECT}
		).then(data => {
			resolve(data)
		})
		.catch(err=>{
			console.log(`\n${$statement}`.yell)
			console.log(`${err.message}\n`.err)
			reject(err)
		});		

	}) 
			
};

	
/** 
* THE BASIC MULTI QUERY PERFORMER 
* */
conn.mQuery = ( $statement, $params=[] ) => 
{
	
	/* 
		* Execute the query then fetch the returned associateive array for all values 
		* */
	return new Promise( (resolve,reject)=> {
		
		sqldb.query( $statement , 
		{ bind: $params ,type: sqldb.QueryTypes.SELECT}
		).then(data => {
			resolve(data)
		})
		.catch(err=>{
			console.log(`\n${$statement}`.yell)
			console.log(`${err.message}\n`.err)
			reject(err)
		});	

	})
			
};


/** 
* THE ADVANCED QUERY  
* { basic query with pre-defined conditional results }   
* [ ideal for inserts, updates, and deletion  ]
* */
conn.aQuery = ( $statement, $params, $success, $failure, $scommand='', $fcommand='' ) => 
{
	
	return new Promise( (resolve,reject) => {

		/* 
		* Perform a basic query 
		* */
		conn.query($statement, $params)
		/* 
		* If the query is successfull 
		* */
		.then( data => {
			
			/* 
			* Model and return a success message 
			* */
			resolve( make_response( 200, $success, $scommand ) );

		})
		/* 
		* If the query is not successfull 
		*/
		.catch( err => {

			/* 
			* Model and return a failure message 
			*/
			resolve( make_response( 500, $failure, $fcommand ) );

		})

	})

	
};


/** 
* 	THE SUPER QUERY 
* 	{ Returns all the values from the specified table field separated by the specified delimeter or as an array where none is defined } 
* 	[ ideal for medium level queries ]
* */
conn.sQuery = ( $statement, $params, $dbField, $delimeter ) => 
{
	
	return new Promise( (resolve,reject)  => {

		if($dbField){

			conn.query($statement, $params)
			.then( data => {

				let q = data.reduce((accrued,current,index)=>{

					//@ Add to the accrued object
					accrued.push( current[$dbField] )
					return accrued;

				},[] )
				.filter(e=>e)

				if($delimeter){
					resolve(q.join($delimeter));
				}else{
					resolve(q)
				}

			})
			.catch(err =>{
				reject( err )
			})

		}else{

			reject( { message: "A database field is required for the list to be resolved"  })

		}

	})
	
};


/**
*  THE NUMBER OF ROWS ENUMERATOR
*  */
conn.num_rows = ( $statement, $params ) => 
{
	
	return  new Promise( (resolve,reject) => {
		
		conn.query($statement, $params)
		.then( d=>{
			resolve( d.length )
		})
		.catch( err=>{
			reject( err )
		})

	})
	
	
};


/**
* A SIMPLE QUERY RESULTS GENERATOR  
*/
conn.printQueryResults = ( $statement, $params , $encoded = false ) => 
{
	
	if( !$encoded ){
	
		/*
			* return the results of the query as an associative array
			* */
		return new Promise( (resolve,reject) => {

			conn.query( $statement , $params )
			.then(d=>{
				resolve(d)
			})
			.catch(err=>{
				reject(e)
			})

		})
	
	}else{
	
		/*
			* return the results in JSON format
			* */
		return new Promise( (resolve,reject) => {

			conn.query( $statement , $params )
			.then(d=>{
				resolve( make_response(200,d) )
			})
			.catch(err=>{
				reject( make_response(500,e.message) )
			})

		})
	
	}
	
};
	

/**
* SIMPLE KEY => VALUE TYPE ARRAY GENERATOR
* EXPECTS AN SQL STATEMENT, THE NAME OF THE IDENTIFIER KEY AND THE NAME OF THE VALUE KEY
*/
conn.keyVal = ( $sql_statement, $params, $key_name, $value_name ) => 
{

	return new Promise( (resolve,reject) => {

		conn.query($sql_statement, $params)
		.then( data => {

			resolve( 

				data.reduce((accrued,current,index)=>{

					//@ Add to the accrued object
					accrued[ current[$key_name] ] =  current[$value_name]
					return accrued;

				},{})

			)

		})
		.catch(e=>{
			reject(e)
		})

	})

};


/**
* THE IMPLICIT ERROR DISPLAYER
*/
conn.error_alert = ( $error, $status = true ) => 
{
	
	if( $status ){
		
		return ( make_response( 500, $error, "" ) );
	
	}else{
		return false;
	}
	
};


/**
* PERFORM A TABLE SPECIFIC BACKUP
*/
conn.doStore = ( $table, $bkup_path_all = __dirname+'/backup/history' ) => 
{
	
	return new Promise(  (resolve,reject) => {

		let pth = $bkup_path_all.split("/").filter(a=>a)
		pth[0] = ( $bkup_path_all[0] == "/" ) ? '/'+pth[0] : pth[0];

		let curr = '';

		pth.forEach((ph) => {
			
			let p = ( curr == '' ) ? ph : '/'+ph;

			curr += p;

			if( !fs.existsSync(curr) ){
				fs.mkdirSync(curr)
			}

		});

		
		conn.query( `SELECT * FROM ${$table} ` )
		.then(d=>{

			$bkupfile 	= ($bkup_path_all+"/"+$table+"_"+( new Date() )+'.json').replace(/\\/ig,"").replace(/\s/ig,'_');

			if(fs.existsSync($bkupfile)){
				fs.unlinkSync($bkupfile);
			} 

			fs.writeFileSync($bkupfile,str(d));

			resolve( make_response( 200, "Backup for the table "+$table+" completed successfully." ) );

		})
		.catch(e=>{
			reject(  make_response( 500, "Backup for the table " + $table + " failed with the error: " + e.message ) )
		}) 

	})
	
};


/**
* PERFORM A COMPLETE [ or selective  ] BACKUP OF TABLES ( multiple ) 
*/
conn.bkup = ( $tables = "*", $bkup_path_all = __dirname+'/backup/history' ) => 
{
		
	return new Promise(  (resolve,reject) => {

		/* 
		* If all the tables are to be backed up 
		* */
		if( $tables == '*' ){
			
			$q = "SELECT table_name FROM information_schema.tables";

			conn.query( $q, [] )
			.then( tables => {

				var responses =[];

				tables.forEach(function(table) {
					
					conn.doStore( table.table_name, $bkup_path_all+"/"+table.table_name )
					.then(d => {

						responses.push( d )

						if(responses.length == tables.length){
							resolve(responses)
						}

					})
					.catch(e => {

						responses.push( e )

						if(responses.length == tables.length){
							resolve(responses)
						}

					})

				});

			})
			.catch( e => {

				resolve( [ e.message ] )

			})
			
		}else{
		
			/*
			* Extract table names from the comma delimited string and perform a backup for each one
			*/
			$i = 0;
			$tables = $tables.split(",");

		
			
			var responses = []

			$tables.forEach(function($table){
				
				// console.log(`\n\nProcessing the storage  of ${ $table } in ${ $bkup_path_all+"/"+$table }`)

				// console.log("<=====================================>")
				// console.log( $table )
				// console.log("<=====================================>")

				// resolve(`Processing the storage  of ${$table} in ${$bkup_path_all+"/"+$table}`)

				conn.doStore( $table , $bkup_path_all+"/"+$table )
				.then(d => {

					responses.push( d )

					if(responses.length == $tables.length){
						resolve(responses)
					}

				})
				.catch(e => {

					responses.push( e )

					if(responses.length == $tables.length){
						resolve(responses)
					}

				})
				
			})
		
		}
	
	})

		
};


/** 
* THE API STYLE JSON [optional] RESPONSE FORMULATOR 
* */
conn.make_response 	= make_response;


/**
* RECURRSIVELY SEARCH IN ARRAY
**/
conn.inArray = ( $needle, $haystack ) => 
{
	
	return ( $haystack.indexOf($needle) == -1) ? false : true ;
	
}


global.$connection = conn;

module.exports = conn;
