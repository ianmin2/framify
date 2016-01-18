app.controller("formController",["$scope", function($scope){
    
   $scope.vm = {};
    
    $scope.vm.onSubmit =  function (){
        
        alert( JSON.stringify($scope.vm.model),null,2 );
        
    };
    
    $scope.vm.model = { terms: true};
    
    $scope.vm.fields = [
        {
            key: "firstName",
            type: "inline-input",            
            templateOptions: {
                label: "First Name",
                type: "text",
                placeholder: "First Name",
                required: "true"
            }
        },
        {
             key: "lastName",
            type: "inline-input",           
            templateOptions: {
                label: "Last Name",
                type: "text",
                placeholder: "Last Name",
                required: "true"
            }
        },
        {
          'key': 'password',
          'type': 'inline-input',
          'templateOptions': {
            'type': 'password', // html input type values [text, email, password, url, number]
            'label': 'Password', // acts as a placeholder & label
            'placeholder': "Password",
            'disabled': false, // ng-disabled
            'required': false, // ng-required
          }
        },
        {
          'key': 'terms',
          'type': 'terms', 
          
        },
        {
            'type': "submit",
            'key': "submit",
            'templateOptions': {
                'label' : "Join Bixbyte" ,
                'disabled' : '!model.terms'
            }
        }
    ];
    
    // $scope.vm.fields = [
    //             {
    //                 "key": "username",
    //                 "type": "inline-input",
    //                 "templateOptions": {
    //                     "type": "text",
    //                     "label": "Username"
    //                 }
    //             }, {
    //                 "key": "password",
    //                 "type": "inline-input",
    //                 "templateOptions": {
    //                     "type": "password",
    //                     "label": "Password"
    //                 }
    //             }
    //         ];
    
    
    
    $scope.vm.originalFields = angular.copy($scope.vm.fields);      
    
   
    
}]);