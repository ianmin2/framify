(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
app.controller("appController", ['app','$scope','$location','$ionicModal',function( app, $scope, $location, $ionicModal ){
    
    //!APPLICATION GLOBAL SCOPE COMPONENTS
    $scope.current  = {};
    $scope.ui       = {};
        
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
},{}],2:[function(require,module,exports){
require("./app.ctrl.js");
require('./voterlist.ctrl.js');
require('./sidenavleft.ctrl.js');
require('./navbartop.ctrl.js');
},{"./app.ctrl.js":1,"./navbartop.ctrl.js":3,"./sidenavleft.ctrl.js":4,"./voterlist.ctrl.js":5}],3:[function(require,module,exports){
app.controller("NavbarTopController", ['$scope', '$http', function($scope, $http){
    
    $scope.nav = [];

    $scope.setRoute = function( i ){
        alert( i )
    }

    var setNav = function(data){
        $scope.nav = data;
        //console.dir( $scope.nav )
    }
    
    var setLinks = function(data){
        $scope.links = data;
        //console.dir($scope.links)
    }
    
    var failNav = function( errData ){
        console.log( errData )
        alert("FailNav")
    }
    
    var failLinks = function( errData ){
        console.log( errData )
        alert("failLinks")
    }
      
     $scope.app.cors('config/app.json', '', setNav, failNav );
     $scope.app.cors('./config/app-routes.json', '', setLinks, failLinks );
    
    
    
    
        
}]);
},{}],4:[function(require,module,exports){
app.controller("SidenavLeftController", ['$scope', '$http', '$mdSidenav', function($scope, $http, $mdSidenav){
	$scope.toggleSidenav = function(menuId){
        $mdSidenav(menuId).toggle();
    }
}]);
},{}],5:[function(require,module,exports){
app.controller('VoterListController', ['$scope', '$http', function($scope, $http){
    $scope.voters = [];
    
    
    var voteSet = function(data){
        $scope.voters = data;
        alert("Fetched");
    };
    
    var voteFail = function(err){
        alert("Failed to fetch JSON data.");
    };
    
    $scope.app.cors('voters.json', '', voteSet, voteFail );
    
    
}]); 
},{}]},{},[2])