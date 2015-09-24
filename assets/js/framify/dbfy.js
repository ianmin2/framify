//!The Bixbyte Framify Database Frame Generator
var pg = require("pg");



var FClient;
var FDone;

//!FRAMIFY MULTI CLIENT QUERY EXECUTOR
var  mQuery = function( db_cred ,F_QUERY ){
    
    //!Ensure that the db credentials are always filled
    var db_cred = {
            dbUser: db_cred.dbUser | "postgres",
            dbPass: db_cred.dbPass | "",
            dbName: db_cred.dbName | "postgres",
            dbHost: db_cred.dbHost | "localhost"
           };

    //!Set up the connection string
    var cString = "postgres://"+db_cred.dbUser+":"+db_cred.dbPass+"@"+db_cred.dbHost+"/"+db_cred.dbName;
    
    //!The promise
    return new Promise(function(resolve,reject){
        
        //!Establish a pool of connections
        pg.connect( cString, function( err, client, done ){

            if( err ){
                
                //!Handle the error gracefuly
                resolve({ status: 500, message: "There was an error trying to establish a database connection.\nCause:\n" + err.message + "\nConnection String: " + cString });
                
            }else{
                
                
                
                
            }


        });

        
    });
    
//EO - MULTI CLIENT QUERY EXECUTOR
};


//FRAMIFY SINGLE CLIENT QUERY EXECUTOR
var sQuery = function( db_cred, F_QUERY ){
    
    //!Ensure that the db credentials are always filled
    db_cred = {
                dbUser: db_cred.dbUser | "postgres",
                dbPass: db_cred.dbPass | "",
                dbName: db_cred.dbName | "postgres",
                dbHost: db_cred.dbHost | "localhost"
               };
    
    //!Ensure that the provided query is valid
    if( typeof(F_QUERY) == "undefined" ){
        resolve({ status: 500, message: "The SQL String provided could not be read."});
    }
    
    
    //!Set up the connection string
    var cString = "postgres://"+db_cred.dbUser+":"+db_cred.dbPass+"@"+db_cred.dbHost+"/"+db_cred.dbName;
    
    //!Create a new db connection client
    var fClient = new pg.Client(connString);
    
    
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

            //!If things are good to go
            }else{

                //!EXECUTE A DB QUERY 
                fClient.query( F_QUERY , function(err,result){

                    //!React to errors
                    if(err){

                         //!handle the error occurance
                         fClient.close();
                         resolve({ status: 500, message: "There was an error trying to execute a query.\nCause:\n" + err.message + "\nQuery: " + F_QUERY });

                    }
                    //!If things are good to go
                    else{

                        //!Handle the successfull event
                        fClient.close();
                        resolve({ status: 200, message: "Query Successfully executed!\nDETAILS:\n" + F_QUERY, data: result });
                        
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
module.exports = sQuery;