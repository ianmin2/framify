app.directive('fileModel',['$parse',function($parse){
    
    return {
        restrict :"A",
        link : function(scope,element,attr){
            var model       = $parse(attr.fileModel);
            var modelSetter = model.assign;
            element.bind('change', ()=>{
                scope.$apply( ()=>{
                    modelSetter(scope,element[0].files[0])
                })
            })
        }
    }
    
}])