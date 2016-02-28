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
