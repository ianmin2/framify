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
