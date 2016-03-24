(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
app.controller('framifySampleController', ['$scope', '$http', function($scope, $http){
   
    $scope.voters = [];
        
    var voteSet = function(data){
        console.log("SETTING VOTERS")
        $scope.voters = data;
    };
    
    var voteFail = function(err){
        $scope.app.alert( $scope.app.title, "Failed to fetch JSON data.", $scope.app.doNothing);
    };
    
    $scope.customify = function( data ){
        $scope.app.alert( ($scope.nav.alias || $scope.nav.title)  , "<center>DONE!</center>", $scope.app.doNothing );
    };
    
    $scope.sav = function(){
        $scope.app.confirm(($scope.nav.alias || $scope.nav.title), 'Do you really want to save this widget', $scope.customify );
    };
    
    $scope.del = function(){
        $scope.app.confirm( ($scope.nav.alias || $scope.nav.title), 'Are you sure you want to DELETE this widget', $scope.customify);
    };   
    
    $scope.app.getJSON('./sample/sample.json', voteSet );
    
    $scope.testify = function(){
        return "Correct!!";
    };
    
    
}]); 
},{}],2:[function(require,module,exports){
app.controller("appController", ['app','$scope','$location','$ionicModal','$rootScope','$ionicSideMenuDelegate','$ionicSlideBoxDelegate',function( app, $scope, $location, $ionicModal, $rootScope, $ionicSideMenuDelegate, $ionicSlideBoxDelegate ){
    
    //!APPLICATION GLOBAL SCOPE COMPONENTS
    $scope.current  = {};
    $scope.ui       = {};
    
    $rootScope.nav = [];
    //$rootScope.nav.search; 
    $rootScope.links = [];
    
    $scope.nav.hasFilters = false;
    
    //** MANAGE THE SIDENAV TOGGLE EVENTS
    //!Right sidenav
    $scope.nav.right = {};
    $scope.nav.right.toggle = function(){
        $ionicSideMenuDelegate.toggleRight();
    }
    
    //!Left sidenav
    $scope.nav.left = {};
    $scope.nav.left.toggle = function(){
        $ionicSideMenuDelegate.toggleLeft();
    }
    
    //** MANAGE THE NAVIGATION SEARCH STATUS
    $scope.openFilters = function(hasFilters){
        if(hasFilters === true) { $scope.nav.hasFilters = false; }else{ $scope.nav.hasFilters = true; }
    };
    
    //!INITIALIZE THE APPLICATION ROUTES
    var setRoutes = function(data){
        $scope.links = data;
        //console.dir( $scope.nav )
    };
    
    //!INITIALIZE THE APPLICATION DATA
    var setData = function(data){
        $scope.nav = data;
        //console.dir( $scope.links )
    };
    
    //!FETCH THE NECESSARY APPLICATION DATA
    $scope.app.getData(setData);
    $scope.app.getRoutes(setRoutes);  
    
    
    //!RE-INITIALIZE APPLICATION DATA
    $rootScope.app.reinit = function(){
      $scope.location.path("/framify");  
    };
    
    //!MOVE TO THE NEXT SLIDE
    $rootScope.app.navSlide =  function(index){
			$ionicSlideBoxDelegate.slide(index,500);
	};
        
    //!ESTABLISH APPLICATION UI COMPONENTS AND THEIR HANDLERS
        
    //*CALL A CUSTOM MODAL
    $scope.ui.modal = function( modal_template, modal_animation, modal_onHide, modal_onRemove ){
      
        modal_template = modal_template || "views/app.html";
        
        //~ Setup the custom modal
        $ionicModal.fromTemplateUrl( modal_template , {
            
            scope: $scope,
            animation: modal_animation || 'slide-in-up'
            
        })
        .then(function(modal) {
            
            $scope.current.modal = modal;
            
        });
        
        //~ Handle display of the modal
        $scope.current.openModal = function() {
            
            $scope.current.modal.show();
            
        };
        
       //~ Handle closure of the modal
       $scope.current.closeModal = function() {
           
            $scope.current.modal.hide();
           
       };
      
       //~ Destroy the modal after use
       $scope.$on('$destroy', function() {
           
            $scope.current.modal.remove();
           
       });
          
       //~ Perform an action on modal hide
       $scope.$on('current.modal.hidden', modal_onHide);
        
       //~ Perform an action on modal removal
       $scope.$on('current.modal.removed',modal_onRemove);
        
    };
    //*EO - CALL CUSTOM MODAL 
    
   
    
}])

},{}],3:[function(require,module,exports){
require("./app.ctrl.js");
require('./app-sample.ctrl.js');
require('./formly.ctrl.js');
},{"./app-sample.ctrl.js":1,"./app.ctrl.js":2,"./formly.ctrl.js":4}],4:[function(require,module,exports){
app.controller("AuthController",["$scope", "$http", function($scope,$http){
    
   $scope.vm = {};
    
    $scope.vm.onSubmit =  function (){
        
       // alert( JSON.stringify($scope.vm.model),null,2 );
       
        var regSucc = function(resp){
            
            if( resp.response ===  200 || resp.response === "SUCCESS" ){
            
                $scope.app.UID( "resp", $scope.app.str(resp.data.message), "success" );
                $scope.vm.model = {};
             
            }else{
                
                $scope.app.UID( "resp", $scope.app.str(resp.data.message) , "danger" ); 
                
            }
            
        };
        
       
        $scope.app.cors($scope.app.url + "/register", $scope.vm.model, regSucc )

        
       
        
    };
    
    $scope.vm.model = { terms: true};
    
    $scope.vm.fields = [
	{
            'key': "username",
            'type': "inline-input",           
            'templateOptions': {
                'label': "Username*",
                'type': "text",
                'placeholder': "Username",
                'required': true
            }
        },
        {
            'key': "first_name",
            'type': "inline-input",            
            'templateOptions': {
                'label': "First Name*",
                'type': "text",
                'placeholder': "First Name",
                'required': true
            }
        },
        {
             'key': "last_name",
            'type': "inline-input",           
            'templateOptions': {
                'label': "Last Name",
                'type': "text",
                'placeholder': "Last Name",
                'required': false
            }
        },
 	{
          'key': 'password',
          'type': 'inline-input',
          'templateOptions': {
            'type': 'password', // html input type values [text, email, password, url, number]
            'label': 'Password*', // acts as a placeholder & label
            'placeholder': "Password",
            'disabled': false, // ng-disabled
            'required': true, // ng-required
          }
        },
        {
          'key': 'password2',
          'type': 'inline-input',
          'templateOptions': {
            'type': 'password', // html input type values [text, email, password, url, number]
            'label': 'Repeat Password*', // acts as a placeholder & label
            'placeholder': "********",
            'disabled': false, // ng-disabled
            'required': true, // ng-required
          }
        },
        {
          'key': "telephone",
          'type': 'inline-input',
          'templateOptions': {
            'type': 'text', // html input type values [text, email, password, url, number]
            'label': 'Telephone*', // acts as a placeholder & label
            'placeholder': "+123456789123",
            'disabled': false, // ng-disabled
            'required': true, // ng-required
          }
        },
        {
          'key': 'postal_address',
          'type': 'inline-input',
          'templateOptions': {
            'type': 'text', // html input type values [text, email, password, url, number]
            'label': 'Address', // acts as a placeholder & label
            'placeholder': "P.O BOX STH",
            'disabled': false, // ng-disabled
            'required': false, // ng-required
          }
        },
        {
          'key': 'city',
          'type': 'inline-input',
          'templateOptions': {
            'type': 'text', // html input type values [text, email, password, url, number]
            'label': 'City', // acts as a placeholder & label
            'placeholder': "SOME CITY",
            'disabled': false, // ng-disabled
            'required': false, // ng-required
          }
        },
        {
          'key': 'zip',
          'type': 'inline-input',
          'templateOptions': {
            'type': 'text', // html input type values [text, email, password, url, number]
            'label': 'ZIP', // acts as a placeholder & label
            'placeholder': "0000",
            'disabled': false, // ng-disabled
            'required': false, // ng-required
          }
        },
        {
          'key': 'email',
          'type': 'inline-input',
          'templateOptions': {
            'type': 'email', // html input type values [text, email, password, url, number]
            'label': 'Email*', // acts as a placeholder & label
            'placeholder': "john@doe.ext",
            'disabled': false, // ng-disabled
            'required': true, // ng-required
          }
        },
        {
            'key': "country",
            'type': "countries",
            templateOptions: {
                label : "Country*"
            }          
        },
        {
          'key': 'terms',
          'type': 'terms'
          
        },
        {
            'type': "submit",
            'key': "submit",
            'templateOptions': {
                'label' : "Join Bixbyte" ,
                'disabled' : '!model.terms || form.$invalid'
            }
        },
        {
            type: "space",
            key : ""
        }
    ];
    
    $scope.vm.originalFields = angular.copy($scope.vm.fields);      
    
   
    
}]);

},{}]},{},[3])