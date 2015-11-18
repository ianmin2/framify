/* global app */
/* global app_hlink */
/* global app_ip */
/* global app_port */

//! APP CONFIGURATIONS
app_ip = "127.0.0.1";
app_port = 5000;
app_hlink = "http://"+app_ip+":" + app_port;
app = require('./assets/js/app.js');

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


    //* EXTEND THE Array TO CATER FOR {{Array}}.inArray
    Array.prototype.has = function( needle ){

        return Array(this).join(",").indexOf(needle) >-1;

    };

//! EO - CUSTOM EXTENSIONS


//! APP IMPORTS
require("./assets/js/app-router.js");
require('./assets/js/services/services.js');
require('./assets/js/directives/directives.js');
require('./assets/js/controllers/controllers.js');