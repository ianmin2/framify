module.exports = ( req,res,callback ) => {
	
	//@Ensure that the callback has presidence over the response object
	// res = ( callback ) ? callback : ( res.jsonp ) ? res.jsonp : res.json;
	// res = ( callback ) ? callback : res.send;
	// res = res.send

	var $_REQUEST = ( get_params( req ) );

	$command =  ($_REQUEST["command"]) ? clone( $_REQUEST["command"] ) : undefined;
	
	delete ( $_REQUEST["command"] );

	//# REMOVE THE CALLBACK VARIABLES 
	delete ($_REQUEST["callback"]);
	delete ($_REQUEST["_"]);
	delete ($_REQUEST["token"]);

	if( $command ){
		
		$proc = require(`${__dirname}/process.js`);

		// $proc.bkup()
		// .then(d=>{res.send(d)})
		// .catch(d=>{res.send(d)})

		// log( make_response( 200, $proc ) )

		// res.send( make_response( 200, $proc ) )
				
		switch ($command) {
			
			//# ADDER HANDLER
			case 'add':
				$proc.addFunc( $_REQUEST )
				.then(response => { 
					res.json(response)
				})
				.catch( e => { 
					res.json( make_response(500, e.message) )
				});
			break;
			
			//# SIMPLE COUNTER FUNCTION 
			case 'count':
				$proc.countFunc( $_REQUEST )
				.then(response => { 
					res.json(response);
				})
				.catch( e => { 
					res.json( make_response(500, e.message) );
				});
			break;

			//# SIMPLE GETTER HANDLER
			case 'get':
				$proc.getFunc( $_REQUEST )
				.then(response => { 
					res.json(response);
				})
				.catch( e => { 
					res.json( make_response(500, e.message) );
				});				
			break;
			
			//# ADVANCED GETTER FUNCTION
			case 'getAll':
				$proc.getAllFunc( $_REQUEST )
				.then(response => { 
					res.json(response);
				})
				.catch( e => { 
					res.json( make_response(500, e.message) );
				});			
			break;
			
			//# DELETION HANDLER
			case 'del':		
	
				$proc.delFunc( $_REQUEST )
				.then(response => { 
					res.json(response);
				})
				.catch( e => { 
					res.json( make_response(500, e.message) );
				});			
			break;
			
			//# UPDATE HANDLER
			case 'update':
				$proc.updateFunc( $_REQUEST )
				.then(response => { 
					res.json(response);
				})
				.catch( e => { 
					res.json( make_response(500, e.message) ); 
				});				
			break;
			
			//# TRUNCATE HANDLER
			case 'truncate':
				$proc.truncateFunc( $_REQUEST )
				.then(response => { 
					res.json(response);
				})
				.catch( e => { 
					res.json( make_response(500, e.message) );
				});			
			break;
			
			//# TABLE DROP HANDLER
			case 'drop':
				$proc.dropFunc( $_REQUEST )
				.then(response => { 
					res.json(response);
				})
				.catch( e => { 
					res.json( make_response(500, e.message) );
				});				
			break;
			
			//# PERFORM FULLY CUSTOM MANIPULATIONS
			case 'custom':
				$proc.customFunc( $_REQUEST )
				.then(response => { 
					res.json(response);
				})
				.catch( e => { 
					res.json( make_response(500, e.message) );
				});				
			break;

			//@ PERFORM A FULL DATABASE DATA BACKUP
			case 'backup': 
				$proc.bkup()
				.then(response => { 
					res.json(response);
				})
				.catch( e => { 
					res.json( make_response(500, e.message) ); 
				});
			break;
			
			default:
				res.json( make_response( 500, "The required parameters were not met. Please ensure that they are defined" ) );				
			break;
			
		}
		
	}else{
		
		res.json( make_response( 500, "The main action definition parameter was not defined. Could not proceed with the specified command." ) );
		
	}


};