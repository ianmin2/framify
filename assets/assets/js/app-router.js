//!CONFIGURE THE BNASIC PRE-RUNTIME STATES OF THE APPLICATION
app.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){
    
    $stateProvider.state( "framify" , {
               url          :"/framify",
               templateUrl  : "views/1app.html"
            }); 
    
    //!THE DYNAMIC ROUTE SETTER
    var setRoutes = function( routeArray ){
        
        routeArray = routeArray || [];
               
        for( r in routeArray ){
            
            var rData = routeArray[r]
            
            $stateProvider.state( rData.path , {
               url          : rData.url,
               templateUrl  : rData.view,
               controller   : rData.controller
            });       
            
        }
        
    }; 
    
    	
    //!CAPTURE THE DEFINED JSON ROUTES
    $.getJSON( "./config/app-routes.json", function( response ){
         setRoutes( response );
    });
        
    //!REDIRECT APP TO THE ROOT ROUTE
    $urlRouterProvider.otherwise('/framify');
    
}]);

//!DEFINE THE APPLICATION RUNTIME DEFAULTS
app.run(["app","$rootScope","$location", "formlyConfig","formlyValidationMessages",function( app, $rootScope, $location, formlyConfig, formlyValidationMessages ){
    
    //!INJECT THE LOCATION SOURCE TO THE ROOT SCOPE
    $rootScope.location = $location;
    
    //!INJECT THE APPLICATION'S MAIN SERVICE TO THE ROOT SCOPE SUCH THAT ALL SCOPES MAY INHERIT IT
    $rootScope.app = app;
    
    //! FORMLY ERROR MESSAGE CONFIGURATION
   // formlyConfig.extras.ngModelAttrsManipulatorPreferBound = true;
    
    // formlyValidationMessages.addStringMessage('maxlength', 'Your input is WAAAAY too long!');
    
    // formlyValidationMessages.messages.pattern = function(viewValue, modelValue, scope) {
    //   return 'invalid input';
    // };
    
    // formlyValidationMessages.addTemplateOptionValueMessage('minlength', 'minlength', '', 'is the minimum length', 'Too short');
      
    //!ANGULAR FORMLY CONFIGURATION
    formlyConfig.setWrapper([
      {
        template: [
          '<div class="formly-template-wrapper form-group"',
          'ng-class="{\'has-error\': options.validation.errorExistsAndShouldBeVisible}">',
          //'<label for="{{::id}}">{{options.templateOptions.label}} {{options.templateOptions.required ? \'*\' : \'\'}}//</label>',
          '<formly-transclude></formly-transclude>',
          '<div class="validation"',
          'ng-if="options.validation.errorExistsAndShouldBeVisible"',
          'ng-messages="options.formControl.$error">',
          '<div ng-messages-include="validation.html"></div>',
          '<div ng-message="{{::name}}" ng-repeat="(name, message) in ::options.validation.messages"><font color="red" style="text-align:left;" >',
          '{{message(options.formControl.$viewValue, options.formControl.$modelValue, this)}} </font>',
          '</div>',
          '</div>',
          '</div>'
        ].join(' ')
      },
      {
        template: [
          '<div class="checkbox formly-template-wrapper-for-checkboxes form-group">',
          '<label for="{{::id}}">',
          '<formly-transclude></formly-transclude>',
          '</label>',
          '</div>'
        ].join(' '),
        types: 'checkbox'
      }
    ]);

    /*formlyConfig.setType({
        name: "stats",
        template: '<div class="p+ bgc-green-100" style="margin:10px; max-width:450px;" ng-repeat="(key,val) in this">$scope.{{key}} = {{val | json}}</div><br><br>'       
    });*/
    
   /* formlyConfig.setType({
        name: "checkbox",
        template: '<br><div class="switch">\
            <input type="checkbox" class="switch__input" id="model[options.key]" ng-model="model[options.key]">\
            <label for="model[options.key]" class="switch__label">{{options.templateOptions.label}}</label>\
            <switch class="switch__help">{{options.templateOptions.description}}</switch>\
        </div>'
    })*/

    formlyConfig.setType({
        name: "submit",
        template: '<div id="resp"></div><br><button type="submit" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-color--blue mdl-cell mdl-cell--2-col" style="min-width: 200px; margin:10px; min-height:25px; color:whitesmoke; font-weight:bold;" ng-hide="{{options.templateOptions.disabled}}">{{options.templateOptions.label}}</button>',
        defaultOptions: {
            templateOptions: {
                label: "SUBMIT"
            }
        }
    });
    
    formlyConfig.setType({
        name: "countries",
       extends: 'select',
        defaultOptions: {
            templateOptions :{
                label : "Country",
                options :[{ name:"Afghanistan", value:"1" },{ name:"Albania", value:"2" },{ name:"Algeria", value:"3" },{ name:"American Samoa", value:"4" },{ name:"Andorra", value:"5" },{ name:"Angola", value:"6" },{ name:"Anguilla", value:"7" },{ name:"Antarctica", value:"8" },{ name:"Antigua and Barbuda", value:"9" },{ name:"Argentina", value:"10" },{ name:"Armenia", value:"11" },{ name:"Aruba", value:"12" },{ name:"Australia", value:"13" },{ name:"Austria", value:"14" },{ name:"Azerbaijan", value:"15" },{ name:"Bahamas", value:"16" },{ name:"Bahrain", value:"17" },{ name:"Bangladesh", value:"18" },{ name:"Barbados", value:"19" },{ name:"Belarus", value:"20" },{ name:"Belgium", value:"21" },{ name:"Belize", value:"22" },{ name:"Benin", value:"23" },{ name:"Bermuda", value:"24" },{ name:"Bhutan", value:"25" },{ name:"Bolivia", value:"26" },{ name:"Bosnia and Herzegowina", value:"27" },{ name:"Botswana", value:"28" },{ name:"Bouvet Island", value:"29" },{ name:"Brazil", value:"30" },{ name:"British Indian Ocean Territory", value:"31" },{ name:"Brunei Darussalam", value:"32" },{ name:"Bulgaria", value:"33" },{ name:"Burkina Faso", value:"34" },{ name:"Burundi", value:"35" },{ name:"Cambodia", value:"36" },{ name:"Cameroon", value:"37" },{ name:"Canada", value:"38" },{ name:"Cape Verde", value:"39" },{ name:"Cayman Islands", value:"40" },{ name:"Central African Republic", value:"41" },{ name:"Chad", value:"42" },{ name:"Chile", value:"43" },{ name:"China", value:"44" },{ name:"Christmas Island", value:"45" },{ name:"Cocos (Keeling) Islands", value:"46" },{ name:"Colombia", value:"47" },{ name:"Comoros", value:"48" },{ name:"Congo", value:"49" },{ name:"Congo, the Democratic Republic of the", value:"50" },{ name:"Cook Islands", value:"51" },{ name:"Costa Rica", value:"52" },{ name:"Cote d\'Ivoire", value:"53" },{ name:"Croatia (Hrvatska)", value:"54" },{ name:"Cuba", value:"55" },{ name:"Cyprus", value:"56" },{ name:"Czech Republic", value:"57" },{ name:"Denmark", value:"58" },{ name:"Djibouti", value:"59" },{ name:"Dominica", value:"60" },{ name:"Dominican Republic", value:"61" },{ name:"East Timor", value:"62" },{ name:"Ecuador", value:"63" },{ name:"Egypt", value:"64" },{ name:"El Salvador", value:"65" },{ name:"Equatorial Guinea", value:"66" },{ name:"Eritrea", value:"67" },{ name:"Estonia", value:"68" },{ name:"Ethiopia", value:"69" },{ name:"Falkland Islands (Malvinas)", value:"70" },{ name:"Faroe Islands", value:"71" },{ name:"Fiji", value:"72" },{ name:"Finland", value:"73" },{ name:"France", value:"74" },{ name:"France Metropolitan", value:"75" },{ name:"French Guiana", value:"76" },{ name:"French Polynesia", value:"77" },{ name:"French Southern Territories", value:"78" },{ name:"Gabon", value:"79" },{ name:"Gambia", value:"80" },{ name:"Georgia", value:"81" },{ name:"Germany", value:"82" },{ name:"Ghana", value:"83" },{ name:"Gibraltar", value:"84" },{ name:"Greece", value:"85" },{ name:"Greenland", value:"86" },{ name:"Grenada", value:"87" },{ name:"Guadeloupe", value:"88" },{ name:"Guam", value:"89" },{ name:"Guatemala", value:"90" },{ name:"Guinea", value:"91" },{ name:"Guinea-Bissau", value:"92" },{ name:"Guyana", value:"93" },{ name:"Haiti", value:"94" },{ name:"Heard and Mc Donald Islands", value:"95" },{ name:"Holy See (Vatican City State)", value:"96" },{ name:"Honduras", value:"97" },{ name:"Hong Kong", value:"98" },{ name:"Hungary", value:"99" },{ name:"Iceland", value:"100" },{ name:"India", value:"101" },{ name:"Indonesia", value:"102" },{ name:"Iran (Islamic Republic of)", value:"103" },{ name:"Iraq", value:"104" },{ name:"Ireland", value:"105" },{ name:"Israel", value:"106" },{ name:"Italy", value:"107" },{ name:"Jamaica", value:"108" },{ name:"Japan", value:"109" },{ name:"Jordan", value:"110" },{ name:"Kazakhstan", value:"111" },{ name:"Kenya", value:"112" },{ name:"Kiribati", value:"113" },{ name:"Korea, Democratic People\'s Republic of", value:"114" },{ name:"Korea, Republic of", value:"115" },{ name:"Kuwait", value:"116" },{ name:"Kyrgyzstan", value:"117" },{ name:"Lao, People\'s Democratic Republic", value:"118" },{ name:"Latvia", value:"119" },{ name:"Lebanon", value:"120" },{ name:"Lesotho", value:"121" },{ name:"Liberia", value:"122" },{ name:"Libyan Arab Jamahiriya", value:"123" },{ name:"Liechtenstein", value:"124" },{ name:"Lithuania", value:"125" },{ name:"Luxembourg", value:"126" },{ name:"Macau", value:"127" },{ name:"Macedonia, The Former Yugoslav Republic of", value:"128" },{ name:"Madagascar", value:"129" },{ name:"Malawi", value:"130" },{ name:"Malaysia", value:"131" },{ name:"Maldives", value:"132" },{ name:"Mali", value:"133" },{ name:"Malta", value:"134" },{ name:"Marshall Islands", value:"135" },{ name:"Martinique", value:"136" },{ name:"Mauritania", value:"137" },{ name:"Mauritius", value:"138" },{ name:"Mayotte", value:"139" },{ name:"Mexico", value:"140" },{ name:"Micronesia, Federated States of", value:"141" },{ name:"Moldova, Republic of", value:"142" },{ name:"Monaco", value:"143" },{ name:"Mongolia", value:"144" },{ name:"Montserrat", value:"145" },{ name:"Morocco", value:"146" },{ name:"Mozambique", value:"147" },{ name:"Myanmar", value:"148" },{ name:"Namibia", value:"149" },{ name:"Nauru", value:"150" },{ name:"Nepal", value:"151" },{ name:"Netherlands", value:"152" },{ name:"Netherlands Antilles", value:"153" },{ name:"New Caledonia", value:"154" },{ name:"New Zealand", value:"155" },{ name:"Nicaragua", value:"156" },{ name:"Niger", value:"157" },{ name:"Nigeria", value:"158" },{ name:"Niue", value:"159" },{ name:"Norfolk Island", value:"160" },{ name:"Northern Mariana Islands", value:"161" },{ name:"Norway", value:"162" },{ name:"Oman", value:"163" },{ name:"Pakistan", value:"164" },{ name:"Palau", value:"165" },{ name:"Panama", value:"166" },{ name:"Papua New Guinea", value:"167" },{ name:"Paraguay", value:"168" },{ name:"Peru", value:"169" },{ name:"Philippines", value:"170" },{ name:"Pitcairn", value:"171" },{ name:"Poland", value:"172" },{ name:"Portugal", value:"173" },{ name:"Puerto Rico", value:"174" },{ name:"Qatar", value:"175" },{ name:"Reunion", value:"176" },{ name:"Romania", value:"177" },{ name:"Russian Federation", value:"178" },{ name:"Rwanda", value:"179" },{ name:"Saint Kitts and Nevis", value:"180" },{ name:"Saint Lucia", value:"181" },{ name:"Saint Vincent and the Grenadines", value:"182" },{ name:"Samoa", value:"183" },{ name:"San Marino", value:"184" },{ name:"Sao Tome and Principe", value:"185" },{ name:"Saudi Arabia", value:"186" },{ name:"Senegal", value:"187" },{ name:"Seychelles", value:"188" },{ name:"Sierra Leone", value:"189" },{ name:"Singapore", value:"190" },{ name:"Slovakia (Slovak Republic)", value:"191" },{ name:"Slovenia", value:"192" },{ name:"Solomon Islands", value:"193" },{ name:"Somalia", value:"194" },{ name:"South Africa", value:"195" },{ name:"South Georgia and the South Sandwich Islands", value:"196" },{ name:"South Sudan", value:"197" },{ name:"Spain", value:"198" },{ name:"Sri Lanka", value:"199" },{ name:"St. Helena", value:"200" },{ name:"St. Pierre and Miquelon", value:"201" },{ name:"Sudan", value:"202" },{ name:"Suriname", value:"203" },{ name:"Svalbard and Jan Mayen Islands", value:"204" },{ name:"Swaziland", value:"205" },{ name:"Sweden", value:"206" },{ name:"Switzerland", value:"207" },{ name:"Syrian Arab Republic", value:"208" },{ name:"Taiwan, Province of China", value:"209" },{ name:"Tajikistan", value:"210" },{ name:"Tanzania, United Republic of", value:"211" },{ name:"Thailand", value:"212" },{ name:"Togo", value:"213" },{ name:"Tokelau", value:"214" },{ name:"Tonga", value:"215" },{ name:"Trinidad and Tobago", value:"216" },{ name:"Tunisia", value:"217" },{ name:"Turkey", value:"218" },{ name:"Turkmenistan", value:"219" },{ name:"Turks and Caicos Islands", value:"220" },{ name:"Tuvalu", value:"221" },{ name:"Uganda", value:"222" },{ name:"Ukraine", value:"223" },{ name:"United Arab Emirates", value:"224" },{ name:"United Kingdom", value:"225" },{ name:"United States", value:"226" },{ name:"United States Minor Outlying Islands", value:"227" },{ name:"Uruguay", value:"228" },{ name:"Uzbekistan", value:"229" },{ name:"Vanuatu", value:"230" },{ name:"Venezuela", value:"231" },{ name:"Vietnam", value:"232" },{ name:"Virgin Islands (British)", value:"233" },{ name:"Virgin Islands (U.S.)", value:"234" },{ name:"Wallis and Futuna Islands", value:"235" },{ name:"Western Sahara", value:"236" },{ name:"Yemen", value:"237" },{ name:"Yugoslavia", value:"238" },{ name:"Zambia", value:"239" },{ name:"Zimbabwe", value:"240" }],
                disabled: false,
                required: true
            }
        }
    });
    
    formlyConfig.setType({
        name: "terms",
        extends: "checkbox",
        defaultOptions: {
            'templateOptions': {
                'label': 'Accept Terms and conditions',
                'description': "I Agree to all the terms of use",
                'disabled': false, // ng-disabled
                'checked': false // ng-checked
              }
        }
    });
    
    formlyConfig.setType({
        name: "space",
        template : "<br><br><br><br><br>",
        defaultOptions: {
            templateOptions:{
                required: false
            }
        }
    })
    

}]);
