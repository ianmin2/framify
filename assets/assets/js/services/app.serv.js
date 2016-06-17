app.service("app",['$http','$ionicPopup',function( $http, $ionicPopup ){
  
    //!SETUP THE APPLICATION BASICS
    var url = window.location.href.split('/').filter(function(urlPortion){ return ( urlPortion != '' && urlPortion != 'http:' && urlPortion !=  'https:'  )  }) ;
	
    //! APP CONFIGURATIONS
    this.ip = url[0].split(':')[0];
    this.port = url[0].split(':')[1];
    //this.hlink = "http://"+this.ip+":"+this.port;
    this.hlink = "http://localhost:"+this.port;
    
    global.hlink = this.hlink;
      
    //@ THE OFFICIAL FILE UPLOAD SERVICE
    this.upload = (data,destination) => {
        
        const fd = new FormData();
        for(var key in data ){
            fd.append(key,data[key]);
        };
        
        return $http.post( `${hlink}/upload/${destination}`, fd, { 
                    transformRequest: angular.identity,
                    headers: { 'Content-Type' : undefined }   
                });
        
    };
      
    //!APPLICATION URL
    //this.url = "http://41.89.162.4:3000";
    this.url = this.hlink;
    
    //! PARSE AN INTEGER
    this.parseInt = str=>parseInt(str);
    
    //! EMPTY CALLBACK
   this.doNothing = function(){
       
   };    
    
    var uiTimeout; 
    
    //!WRITE TO THE UI
    this.UID = function( objectID, pageContent, c ){
        clearTimeout(uiTimeout);
        objectID = (objectID)?objectID:"response";
        document.getElementById(objectID).innerHTML = `<div class='alert alert-${c}'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>${pageContent}</div>`;
        uiTimeout = setTimeout(function(){
            document.getElementById(objectID).innerHTML = "";
        },15000)
    //   console.log(`id:\t${objectID}\ncontent:\t${pageContent}\nclass:\t${c}`)
    }; 
    
    //!AVAIL THE APPLICATION LINKS    
    this.getData = function( success_callback , error_callback ){
       
       $.getJSON("./config/app.json", function( data ){
            success_callback(data);
        });
        
    };
    
    //!AVAIL THE APPLICATION ROUTES
    this.getRoutes = function( success_callback , error_callback ){
              
        $.getJSON("./config/app-routes.json", function( data ){
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
    
    //!FORMAT TO ISODATE
    this.isoDate    = () => new Date().format('isoDate');
    this.newIsoDate = (d) => new Date(d).format('isoDate')
    this.toIsoDate  = dObj => dObj.format('isoDate');
    
    this.monthNum     = () => new Date().format('monthNum');
    this.newMonthNum  = d  => new Date(d).format('monthNum');
    this.toMonthNum   = dObj => dObj.format('monthNum');
    
        
    //* MONTHS ARRAY
    var $month_array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.month_array = $month_array;
    this.month_o_array = [
                            { id: 0, name: "January" }, 
                            { id: 1, name:"February" }, 
                            { id: 2, name: "March" }, 
                            { id: 3, name: "April" }, 
                            { id: 4, name: "May" }, 
                            { id: 5, name: "June" }, 
                            { id: 6, name: "July" }, 
                            { id: 7, name: "August" }, 
                            { id: 8, name: "September" }, 
                            { id: 9, name: "October" }, 
                            { id: 10, name: "November" }, 
                            { id: 11, name: "December" }
                        ];
    
    // this.printMonths = $month_array
    //                     .reduce((mobj,m)=>{
    //                         mobj[m] = m   
    //                     },{})
    //                     .filter(m=>m)
    
   //! HANDLE APPLICATION NATIVE SERVICE REQUESTS
   this.ajax =function( path , data, success_callback, error_callback , config ){ 
	   
      //$http.post( bix_hlink + path, data, config).then( success_callback, error_callback );
      $.ajax({
            method: "POST",
            url: this.hlink + path,
            data: data,
            success: success_callback,
            error: success_callback  
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
            success: success_callback,
            error: success_callback   
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
   
   
   //!HANDLE JSON REQUESTS OF ANY CALIBER
   this.JSON = function( link ){
       
       return $.getJSON( link );
       
   };
   
   //! HANDLE CORS CALLS TO THE PHP FCGI MODULE
   this.cgi = ( url, data ) => {
       
      return $.ajax({
                method: "GET",
                url: url,
                data: data,
                dataType: 'jsonp',
            });
       
   }
  
   //!HANDLE THE DISPLAY OF DIALOG BOXES
   
   //* SHOW A "LOADING" ELEMENT
   this.loadify = function( el ){
       
       el.html('<ion-spinner icon="lines" class="spinner-energized"></ion-spinner>');
       
   };
   
   let alert = ( title ,message, cb ,ok )=>{
       return $ionicPopup.alert({
            
            title: title,
            template: message,
            okText: ok || "OK"
            /*cssClass: '', // String, The custom CSS class name
            subTitle: '', // String (optional). The sub-title of the popup.
            templateUrl: '', // String (optional). The URL of an html template to place in the popup   body.
            okType: '', // String (default: 'button-positive'). The type of the OK button.*/
            
        }).then(function(res) {
            if( typeof(cb) == "function"){
                cb(res);
            }            
        },function(error){
            console.log('error', error);
        }, function(popup){
            popup.close();
        });
   }
   
   //*GENERATE A CUSTOM ALERT DIALOG
   this.alert = function( title ,message, cb ,ok ) {
       
        alert(title ,message, cb ,ok);
        
        // setTimeout(function(){
        //     alertPopup.close();
        // },12000)
       
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
    this.isemail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/;
    this.isEmail = prospective_email=>this.isemail.test( prospective_email );
    
    //*VALIDATE USERNAMES
    this.isusername= /^[a-z0-9_-]{4,16}$/;
    this.isUsername= prospective_username=>this.isusername.test( prospective_username );
    
    //*VALIDATE PASSWORDS
    
    this.ispassword = /^[-@./\!\$\%\^|#&,+\w\s]{6,50}$/;    
    this.isPassword = prospective_password=>this.ispassword.test( prospective_password );

   //* VALIDATE NUMBERS
   this.isnumber = /^-{0,1}\d*\.{0,1}\d+$/;
   this.isNumber = prospective_number=>this.isnumber.test( prospective_number );


    //*VALIDATE TELEPHONE NUMBERS

    this.istelephone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    this.isTelephone = prospective_telephone=>this.istelephone.test( prospective_telephone );
    
    //*VALIDATE WHETHER TWO GIVEN VALUES MATCH
    this.matches = (val1, val2 )=>( val1 === val2 );
    
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
    
    
    //* CONDITIONALLY TRANSFORM TO STRING
    this.str = function( obj ){
        return  ( typeof(obj) === "object" ) ? JSON.stringify(obj) : obj ;
    };
    
     //* CONDITIONALLY TRANSFORM TO JSON
    this.json = function( obj ){
        return ( typeof(obj) === 'object' ) ? obj : JSON.parse( obj );
    };
    
    
    this.md5 = function(str) {
        if(/^[a-f0-9]{32}$/gm.test(str)){
            return str;
        }else{
            return CryptoJS.MD5(str).toString();
        }        
    };

           
}]);