/* global app */
/* global app_hlink */
/* global app_ip */
/* global app_port */

global.app = require('./assets/js/app.js');

//! CUSTOM EXTENTIONS HERE

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

    //* CLONE A JAVASCRIPT OBJECT
    global.clone = function( obj ){
        return JSON.parse(JSON.stringify(obj));
    };    

    //* EXTEND THE Array TO CATER FOR {{Array}}.inArray
    Array.prototype.has = function( needle ){

        return Array(this).join(",").indexOf(needle) >-1;

    };

   //* COUNT INSTANCES IN ARRAY
    Array.prototype.count = function( val ){
       
	  if( val === undefined ){
		  return this.length;
	  }else{
		 
		 var counter = 0;
		 
		 this.forEach(function(ElementValue,ElementPosition){
		  
		  	if( val == ElementValue ){
				counter++;	  
			}
		  
	  	 });
		   
		return counter;
		  
	  }
      
        
    };

    //** EXTEND Object to cater for {{Object}}.forEach
    var foreach = function( cb ){
    
        if( cb ){
            
            for( var objKey in this ){
                cb( this[objKey], objKey );
            }
    
        }else{
            console.log("\nCannot run a forEach on an object where no callback is defined.\n".err);
            return false;
        }
    
    };
    Object.defineProperty(Object.prototype, 'foreach', { value: foreach, enumerable: false });

//! EO - CUSTOM EXTENSIONS


//! APP IMPORTS
require("./assets/js/app-router.js");
require('./assets/js/services/services.js');
require('./assets/js/directives/directives.js');
require('./assets/js/controllers/controllers.js');
