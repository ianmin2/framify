var db  = require("./dbfy.js");
var log = require("./logger.js")("bixbyte/logs/formify.log");

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

                resolve( { form_name: table_name, form_data: response.data.rows[0].keys() } );

            })
            .catch(function(err){

                reject( err )

            })
        }) 

    };
    
    
    //~ CAPTURE THE FORM FIELDS 
    this.setForm = function( form_data ){
        
        /*
            expects a JSON object with the following fields
            
            {
                form_name : "form_name",
                form_data:  JSON OBJECT 
                
            }
        */
        
        return new Promise(function(resolve, reject){
            
            var  form = '<form name="'+ form_data.form_name +'" id="'+ form_data.form_name +'" > <table class="table table-striped"> ';

            //!ITERATE THROUGH ELEMENTS
            for( f_elem in form_data.form_data ){
                
                //!SPECIALLY HANDLE AUTHENTICATION ELEMENTS
                if( (form_data.form_data[f_elem].toString()).match(/.key./g) || form_data.form_data[f_elem].toString().match(/.pass./g)  ){
                    
                    //!
                   form += '<tr><td><input type="password" name="'+ form_data.form_data[f_elem] +'" id="'+ form_data.form_data[f_elem] +'" ></td></tr>';
                    
                }else{
                    
                    form += '<tr><td><input type="input" name="'+ form_data.form_data[f_elem] +'" id="'+ form_data.form_data[f_elem] +'" ></td></tr>';
                    
                }
                
            }

            form += '</table></form>';
            
            resolve( {form_data: form_data.form_data , form: form } );
            
        });
        
    };
        
    
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
    
    //console.log(r)
    f.setForm(r)
    .then(function(data){
        console.log("\nFRAMIFY 'SETFORM' RESULTS\n\n")
        console.log(data)
    })
    .catch(function(err){
        console.log( "\nFRAMIFY 'SETFORM' EXPERIENCED A CRITICAL ERROR:\n\n" + JSON.stringify(err.message) );
    });
    
})
.catch(function(err){
    console.log( "\nFRAMIFY 'SETFORM' EXPERIENCED A CRITICAL ERROR:\n\n" + JSON.stringify(err.message) );
});

//var dbConfig = {  
//    dbUser: "postgres",
//    dbPass: "",
//    dbHost: "localhost",
//    dbName: "codepamoja"
//};
//
//
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
//            console.log("\nFailed with the error " +  err.message );
//        }else{
//
//            //console.log("\n\n" + JSON.stringify(Object.getOwnPropertyNames(done.rows[0])) + "\n\n");
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