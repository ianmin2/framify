var db  = require("./dbfy.js");
var log = require("./logger.js")("bixbyte/logs/formify.logs");

//* EXTEND Object to cater for {{Object}}.keys
function keys(){
    var k = [];
    for(var p in this) {
        if(this.hasOwnProperty(p))
            k.push(p);
    }
    return k;
}
Object.defineProperty(Object.prototype, "keys", { value : keys, enumerable:false });

//* EXTEND THE Array TO CATER FOR {{Array}}.inArray
Array.prototype.has = function( needle ){

    return Array(this).join(",").indexOf(needle) >-1;

};


//# FORMIFY FACTORY
var Formify =  function( dbConfig ){
    
    dbConfig = dbConfig || null;
   
    //~ GET FIELDS NAMES METHOD   
    this.getFields = function( table_name ){
        
       return new Promise(function(resolve, reject){
           
            db.single( dbConfig, "SELECT * FROM " + table_name + " LIMIT 1")
            .then(function( response ){

                resolve( response.data.rows[0].keys() )

            })
            .catch(function(err){

                resolve( err )

            })
        }) 
        
    };
    
    //~ CREATE THE 
        
    
};
//# EO - FORMIFY FACTORY

var f = new Formify({  
    dbUser: "postgres",
    dbPass: "",
    dbHost: "localhost",
    dbName: "codepamoja"
})

f.getFields("entitys")
.then(function(r){
    console.log(r)
})

//var dbConfig = {  
//    dbUser: "postgres",
//    dbPass: "",
//    dbHost: "localhost",
//    dbName: "codepamoja"
//};


//db.multiple(dbConfig)
//.then(function(resp){
//    //console.log(resp)
//    
//    var conn = resp.data.connection;
//    var close = resp.data.terminator;
//      
//    conn.query("SELECT * FROM entitys LIMIT 1", function(err,done){
//
//        if(err){
//            console.log("\nFailed at " + i )
//        }else{
//
//            console.log("\n\n" + JSON.stringify(Object.getOwnPropertyNames(done.rows[0])) + "\n\n")
//
//        }
//        close();
//
//    });  
//    
//})
//.catch(function(err){
//    console.log(err)
//});