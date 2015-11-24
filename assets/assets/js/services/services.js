(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
app.service("app",['$http','$ionicPopup',function( $http, $ionicPopup ){
  
    //!SETUP THE APPLICATION BASICS
    
    //!AVAIL THE APPLICATION LINKS    
    this.getData = function( success_callback , error_callback ){
       
       $.getJSON("config/app.json", function( data ){
            success_callback(data);
        });
        
    };
    
    //!AVAIL THE APPLICATION ROUTES
    this.getRoutes = function( success_callback , error_callback ){
              
        $.getJSON("config/app-routes.json", function( data ){
            success_callback(data);
        });
        
    };
      
    //! BASIC RESPONSE FORMATTER
    this.makeResponse = function( response, message, command ){
        
        return {
            response: response,
            data: {
                message: message,
                command: command
            }
        };
        
    };
    
        
    //* MONTHS ARRAY
    var $month_array = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    
   //! HANDLE APPLICATION NATIVE SERVICE REQUESTS
   this.ajax =function( path , data, success_callback, error_callback , config ){ 
	   
      //$http.post( bix_hlink + path, data, config).then( success_callback, error_callback );
      $.ajax({
            method: "POST",
            url:  app_hlink + path,
            data: data,
            success: success_callback      
        });
       /*,
            error: error_callback      */
      
   };
   
   //!HANDLE CROSS ORIGIN APPLICATION SERVICE REQUESTS
   this.cors = function( link , data, success_callback, error_callback , config ){ 
	   
      //$http.post( link, data, config).then( success_callback, error_callback );
       $.ajax({
            method: "POST",
            url: link,
            data: data,
            success: success_callback      
        });
       
        /*,
            error: error_callback      */
   };  
   
   //!HANDLE JSON REQUESTS OF ANY CALIBER
   this.getJSON = function( link, callback_function ){
       
       $.getJSON( link, function( response ){
           callback_function(response);
       });
       
   };
   
   //! EMPTY CALLBACK
   this.doNothing = function(){
       
   };
  
   //!HANDLE THE DISPLAY OF DIALOG BOXES
   
   //* SHOW A "LOADING" ELEMENT
   this.loadify = function( el ){
       
       el.html('<ion-spinner icon="lines" class="spinner-energized"></ion-spinner>');
       
   };
   
   //*GENERATE A CUSTOM ALERT DIALOG
   this.alert = function( title ,message, cb ,ok ) {
       
        var alertPopup = $ionicPopup.alert({
            
            title: title,
            template: message,
            okText: ok || "OK"
            /*cssClass: '', // String, The custom CSS class name
            subTitle: '', // String (optional). The sub-title of the popup.
            templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
            okType: '', // String (default: 'button-positive'). The type of the OK button.*/
            
        });
       
        alertPopup.then(function(res) {
            
            if( typeof(cb) == "function"){
                cb(res);
            }else{
                console.error("Invalid callback function passed for an alert dialog.\nCALLBACK DATA:\n\n" + cb + "\n\nData Type:\t\t" + typeof(cb) + "\nExpected:\t\tfunction" );
            }
            
        });
       
    };
    
   //*GENERATE A CUSTOM CONFIRM DIALOG
   this.confirm = function( title ,message, success_cb, error_cb ) {
       
       var confirmPopup = $ionicPopup.confirm({
         title: title,
         template: message
       });
       
       confirmPopup.then(function(res) {
           
         if(res) {
             
            success_cb(res);
             
         } else {
             
            if(error_cb){
                error_cb(res);
            }else{
                success_cb(res);
            }
            
         }
           
       });
       
    };    
    
    //*GENERATE A CUSTOM PROMPT DIALOG
    this.prompt = function( title, message, i_type, i_pholder, cb ){
        
         $ionicPopup.prompt({
           title: title,
           template: message,
           inputType: i_type,
           inputPlaceholder: i_pholder
         }).then(cb);
        
    };
    
    
    //!BASIC VALIDATION METHODS
    
    //*VALIDATE EMAIL ADDRESSES
    this.isEmail = function( prospective_email ){
      
        return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/.test( prospective_email );
        
    };
    
    //*VALIDATE USERNAMES
    this.isUsername= function( prospective_username ){
        
        return /^[a-z0-9_-]{4,16}$/.test( prospective_username );
        
    };
    
    //*VALIDATE PASSWORDS
    this.isPassword = function( prospective_password ){
        
        return /^[-@./\!\$\%\^|#&,+\w\s]{6,50}$/.test( prospective_password );
        
    };
    
    //*VALIDATE WHETHER TWO GIVEN VALUES MATCH
    this.matches = function( val1, val2 ){
        
        return ( val1 === val2 );
        
    };
    
    //*TRANFORM NUMBER TO MONTH
    this.num2month = function( month_number ){
        
        if( !isNaN(month_number) ){
            
            return $month_array[month_number];
            
        }else{
            return "Invalid Month";
        }
        
    }; 
    
    //*REMOVE DUPLICATES FROM ARRAY
    this.unique = function (array_ ){
        
        var ret_array = new Array();
        
        for (var a = array_.length - 1; a >= 0; a--) {
            
            for (var b = array_.length - 1; b >= 0; b--) {
                
                if(array_[a] == array_[b] && a != b){
                    
                    delete array_[b];
                    
                }
                
            };
            
            if(array_[a] != undefined)
                
                ret_array.push(array_[a]);
            
        };
        
        return ret_array.reverse();
        
    };
    
    //* COUNT OCCURANCES IN AN ARRAY
    this.count = function( val, obj ){
      
        var cnt = 0;
      
        for( v in obj ){
            if( val === obj[v] ){
                cnt +=1;
            }
        }
        return cnt;
        
    };
    
       
}]);

},{}],2:[function(require,module,exports){
require("./app.serv.js");
},{"./app.serv.js":1}]},{},[2])