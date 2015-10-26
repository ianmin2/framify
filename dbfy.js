//!The Bixbyte Framify Database Frame Generator
var pg = require("pg");

//!FRAMIFY MULTI CLIENT QUERY EXECUTOR
var  mQuery = function( db_cred ){
    
    //!Prevent a no such object error
    db_cred = db_cred || {};
    
    //!Ensure that the db credentials are always filled
    var db_cred = {
            dbUser: db_cred.dbUser || "postgres",
            dbPass: db_cred.dbPass || "",
            dbName: db_cred.dbName || "postgres",
            dbHost: db_cred.dbHost || "localhost"
           };

    //!Set up the connection string
    var cString = "postgres://"+db_cred.dbUser+":"+db_cred.dbPass+"@"+db_cred.dbHost+"/"+db_cred.dbName;
    
    //!The promise
    return new Promise(function(resolve,reject){
        
        //!Establish a pool of connections
        pg.connect( cString, function( err, client, done ){

            if( err ){
                
                //!Handle the error gracefuly
                resolve({ status: 500, message: "Failed to establish a database connection pool.\nReason:\t" + err });
                
            }else{
                
                //!Return the connection object ( and hope that is works well );
                resolve({status:200, message: "Successfully created database pool", data: { connection: client, terminator: done } });
            
            //!EO - Hopefully Return connection pool
            }

        //!EO - Connection Pool
        });

    //!EO - Promise    
    });
    
//EO - MULTI CLIENT QUERY EXECUTOR
};


//FRAMIFY SINGLE CLIENT QUERY EXECUTOR
var sQuery = function( db_cred, F_QUERY ){
    
    //!Prevent a no such object error
    db_cred = db_cred || {};
    
//    //!Ensure that the db credentials are always filled
//    db_cred = {
//                dbUser: db_cred.dbUser || "postgres",
//                dbPass: db_cred.dbPass || "",
//                dbName: db_cred.dbName || "postgres",
//                dbHost: db_cred.dbHost || "localhost"
//               };
    
    //!Ensure that the provided query is valid
    if( typeof(F_QUERY) == "undefined" ){
        resolve({ status: 500, message: "The SQL String provided could not be read."});
    }
    
    
    //!Set up the connection string
    var cString = "postgres://"+db_cred.dbUser+":"+db_cred.dbPass+"@"+db_cred.dbHost+"/"+db_cred.dbName;
    
    //!Create a new db connection client
    var fClient = new pg.Client( cString  );
    
    
    //!Set up the promise 
    return new Promise( function(resolve, reject){
        
        //!Establish a database connection
        fClient.connect(function(err){

            //!Log the current process
            console.log("Framify is running a query");
            
            //!If faced by an error
            if(err){

                //!Handle the error occurance
                
                resolve({ status: 500, message: "There was an error trying to establish a database connection.\nCause:\n" + err.message + "\nConnection String: " + cString });
                fClient.end();
                
            //!If things are good to go
            }else{

                //!EXECUTE A DB QUERY 
                fClient.query( F_QUERY , function(err,result){

                    //!React to errors
                    if(err){

                         //!handle the error occurance
                          resolve({ status: 500, message: "There was an error trying to execute a query.\nCause:\n".err + err.message + "\nQuery: ".err + F_QUERY });
                          fClient.end();
                    }
                    //!If things are good to go
                    else{

                        //!Handle the successfull event                        
                        resolve({ status: 200, message: "Query Successfully executed!\nDETAILS:\n".succ + F_QUERY, data: result });
                        fClient.end();
                        
                    //!EO - Query Executed   
                    }

                //!EO - Execute db query
                });

            //!EO - Successfull query execution    
            }

        //!EO - DB connection client
        });
      
    //!EO - DB connection promise
    });    

//!EO -  Framify Single client query executor 
};

//!EXPOSE THE SINGLE CLIENT CONNECTION
exports.single = function( parameters, query ){
    
    return new sQuery( parameters, query );
    
};

//!EXPOSE THE MULTIPLE CLIENT CONNECTION
exports.multiple = function( parameters ){
    
    return new mQuery( parameters );
    
};