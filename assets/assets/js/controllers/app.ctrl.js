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
        //console.dir(appl.links)
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