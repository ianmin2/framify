(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
app.controller('framifySampleController', ['$scope', '$http', function($scope, $http){
   
    $scope.voters = [];
        
    var voteSet = function(data){
        $scope.voters = data;
    };
    
    var voteFail = function(err){
        $scope.app.alert( $scope.app.title, "Failed to fetch JSON data.", $scope.app.doNothing);
    };
    
    $scope.customify = function( data ){
        $scope.app.alert( ($scope.nav.alias || $scope.nav.title)  , "<center>DONE!</center>", $scope.app.doNothing );
    }
    
    $scope.sav = function(){
        $scope.app.confirm(($scope.nav.alias || $scope.nav.title), 'Do you really want to save this widget', $scope.customify )
    }
    
    $scope.del = function(){
        $scope.app.confirm( ($scope.nav.alias || $scope.nav.title), 'Are you sure you want to DELETE this widget', $scope.customify)
    }   
    
    $scope.app.getJSON('./sample/sample.json', voteSet );
    x    
    $scope.testify = function(){
        return "Correct!!";
    }
    
    
}]); 
},{}],2:[function(require,module,exports){
app.controller("appController", ['app','$scope','$location','$ionicModal','$rootScope',function( app, $scope, $location, $ionicModal, $rootScope ){
    
    //!APPLICATION GLOBAL SCOPE COMPONENTS
    $scope.current  = {};
    $scope.ui       = {};
    
    $rootScope.nav = [];
    $rootScope.links = [];
    
    var setRoutes = function(data){
        $scope.links = data;
        //console.dir( $scope.nav )
    }
    
    var setData = function(data){
        $scope.nav = data;
        //console.dir( $scope.links )
    }
    
    //!FETCH THE NECESSARY APPLICATION DATA
    $scope.app.getData(setData);
    $scope.app.getRoutes(setRoutes);  
    
    //!RE-INITIALIZE APPLICATION DATA
    $scope.location.path("/framify")
        
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
},{"./app-sample.ctrl.js":1,"./app.ctrl.js":2}]},{},[3])