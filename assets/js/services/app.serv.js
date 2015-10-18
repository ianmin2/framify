app.service("app",['$http','$ionicPopup',function( $http, $ionicPopup ){
  
  //!HANDLE APPLICATION NATIVE SERVICE REQUESTS
   this.ajax =function( path , data, success_callback, error_callback , config ){ 
	   
      //$http.post( bix_hlink + path, data, config).then( success_callback, error_callback );
      $.ajax({
            method: "POST",
            url:  app_hlink + path,
            data: data,
            success: success_callback,
            error: error_callback            
        });
      
   };
   
   //!HANDLE CROSS ORIGIN APPLICATION SERVICE REQUESTS
   this.cors =function( link , data, success_callback, error_callback , config ){ 
	   
      //$http.post( link, data, config).then( success_callback, error_callback );
       $.ajax({
            method: "POST",
            url: link,
            data: data,
            success: success_callback,
            error: error_callback            
        });
        
   };   
  
   //!HANDLE THE DISPLAY OF DIALOG BOXES
   
   //*GENERATE A CUSTOM ALERT DIALOG
   this.alert = function( title, message, cb ,ok ) {
       
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
           cb(res);
        });
       
    };
    
   //*GENERATE A CUSTOM CONFIRM DIALOG
   this.confirm = function( title, message, success_cb, error_cb ) {
       
       var confirmPopup = $ionicPopup.confirm({
         title: 'Consume Ice Cream',
         template: 'Are you sure you want to eat this ice cream?'
       });
       confirmPopup.then(function(res) {
         if(res) {
            success_cb();
         } else {
            error_cb();
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
    
    
    //*VALIDATE VALUES FOR MATCHING
    
    
    
   
}]);