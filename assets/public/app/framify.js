angular.module('bixApp', ['framify-paginate','ngStorage','jsonFormatter','ngMessages'])

.service("app",['$http',function($http){

    //!SETUP THE APPLICATION BASICS
    var url = window.location.href.split('/').filter(function(urlPortion){ return ( urlPortion != '' && urlPortion != 'http:' && urlPortion !=  'https:'  )  }) ;
    
    //! APP CONFIGURATIONS
    this.ip = url[0].split(':')[0];
    this.port = url[0].split(':')[1];
    this.hlink = "http://"+this.ip+":"+this.port;
    //this.hlink = "http://localhost:"+this.port;
    
    var hlink = this.hlink;

     //!APPLICATION URL
    //this.url = "http://41.89.162.4:3000";
    this.url = this.hlink;
    
    //@ THE OFFICIAL FILE UPLOAD SERVICE
    this.upload = (data,destination) => {
        
        const fd = new FormData();
        for(var key in data ){
            fd.append(key,data[key]);
        };
        
        return $http.post( `${hlink}/upload/${destination}`, fd, { 
                    transformRequest: angular.identity,
                    headers: { 'Content-Type' : undefined }   
                });
        
    };

    //@ CREATE A COPY OF AN OBJECT
    this.clone = (obj) => {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }
    
       
    //! PARSE AN INTEGER
    this.parseInt = str=>parseInt(str);
    
    //! EMPTY CALLBACK
    this.doNothing = function(){
        
    };    
    
    var uiTimeout; 
    
    //!WRITE TO THE UI
    this.UID = function( objectID, pageContent, c ){
        clearTimeout(uiTimeout);
        objectID = (objectID)?objectID:"response";
        document.getElementById(objectID).innerHTML = `<div class='alert alert-${c}'><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>${pageContent}</div>`;
        uiTimeout = setTimeout(function(){
            document.getElementById(objectID).innerHTML = "";
        },15000)
    //   console.log(`id:\t${objectID}\ncontent:\t${pageContent}\nclass:\t${c}`)
    }; 
    
    
    
    this.countries = [{ name:"Afghanistan", value:"1" },{ name:"Albania", value:"2" },{ name:"Algeria", value:"3" },{ name:"American Samoa", value:"4" },{ name:"Andorra", value:"5" },{ name:"Angola", value:"6" },{ name:"Anguilla", value:"7" },{ name:"Antarctica", value:"8" },{ name:"Antigua and Barbuda", value:"9" },{ name:"Argentina", value:"10" },{ name:"Armenia", value:"11" },{ name:"Aruba", value:"12" },{ name:"Australia", value:"13" },{ name:"Austria", value:"14" },{ name:"Azerbaijan", value:"15" },{ name:"Bahamas", value:"16" },{ name:"Bahrain", value:"17" },{ name:"Bangladesh", value:"18" },{ name:"Barbados", value:"19" },{ name:"Belarus", value:"20" },{ name:"Belgium", value:"21" },{ name:"Belize", value:"22" },{ name:"Benin", value:"23" },{ name:"Bermuda", value:"24" },{ name:"Bhutan", value:"25" },{ name:"Bolivia", value:"26" },{ name:"Bosnia and Herzegowina", value:"27" },{ name:"Botswana", value:"28" },{ name:"Bouvet Island", value:"29" },{ name:"Brazil", value:"30" },{ name:"British Indian Ocean Territory", value:"31" },{ name:"Brunei Darussalam", value:"32" },{ name:"Bulgaria", value:"33" },{ name:"Burkina Faso", value:"34" },{ name:"Burundi", value:"35" },{ name:"Cambodia", value:"36" },{ name:"Cameroon", value:"37" },{ name:"Canada", value:"38" },{ name:"Cape Verde", value:"39" },{ name:"Cayman Islands", value:"40" },{ name:"Central African Republic", value:"41" },{ name:"Chad", value:"42" },{ name:"Chile", value:"43" },{ name:"China", value:"44" },{ name:"Christmas Island", value:"45" },{ name:"Cocos (Keeling) Islands", value:"46" },{ name:"Colombia", value:"47" },{ name:"Comoros", value:"48" },{ name:"Congo", value:"49" },{ name:"Congo, the Democratic Republic of the", value:"50" },{ name:"Cook Islands", value:"51" },{ name:"Costa Rica", value:"52" },{ name:"Cote d\'Ivoire", value:"53" },{ name:"Croatia (Hrvatska)", value:"54" },{ name:"Cuba", value:"55" },{ name:"Cyprus", value:"56" },{ name:"Czech Republic", value:"57" },{ name:"Denmark", value:"58" },{ name:"Djibouti", value:"59" },{ name:"Dominica", value:"60" },{ name:"Dominican Republic", value:"61" },{ name:"East Timor", value:"62" },{ name:"Ecuador", value:"63" },{ name:"Egypt", value:"64" },{ name:"El Salvador", value:"65" },{ name:"Equatorial Guinea", value:"66" },{ name:"Eritrea", value:"67" },{ name:"Estonia", value:"68" },{ name:"Ethiopia", value:"69" },{ name:"Falkland Islands (Malvinas)", value:"70" },{ name:"Faroe Islands", value:"71" },{ name:"Fiji", value:"72" },{ name:"Finland", value:"73" },{ name:"France", value:"74" },{ name:"France Metropolitan", value:"75" },{ name:"French Guiana", value:"76" },{ name:"French Polynesia", value:"77" },{ name:"French Southern Territories", value:"78" },{ name:"Gabon", value:"79" },{ name:"Gambia", value:"80" },{ name:"Georgia", value:"81" },{ name:"Germany", value:"82" },{ name:"Ghana", value:"83" },{ name:"Gibraltar", value:"84" },{ name:"Greece", value:"85" },{ name:"Greenland", value:"86" },{ name:"Grenada", value:"87" },{ name:"Guadeloupe", value:"88" },{ name:"Guam", value:"89" },{ name:"Guatemala", value:"90" },{ name:"Guinea", value:"91" },{ name:"Guinea-Bissau", value:"92" },{ name:"Guyana", value:"93" },{ name:"Haiti", value:"94" },{ name:"Heard and Mc Donald Islands", value:"95" },{ name:"Holy See (Vatican City State)", value:"96" },{ name:"Honduras", value:"97" },{ name:"Hong Kong", value:"98" },{ name:"Hungary", value:"99" },{ name:"Iceland", value:"100" },{ name:"India", value:"101" },{ name:"Indonesia", value:"102" },{ name:"Iran (Islamic Republic of)", value:"103" },{ name:"Iraq", value:"104" },{ name:"Ireland", value:"105" },{ name:"Israel", value:"106" },{ name:"Italy", value:"107" },{ name:"Jamaica", value:"108" },{ name:"Japan", value:"109" },{ name:"Jordan", value:"110" },{ name:"Kazakhstan", value:"111" },{ name:"Kenya", value:"112" },{ name:"Kiribati", value:"113" },{ name:"Korea, Democratic People\'s Republic of", value:"114" },{ name:"Korea, Republic of", value:"115" },{ name:"Kuwait", value:"116" },{ name:"Kyrgyzstan", value:"117" },{ name:"Lao, People\'s Democratic Republic", value:"118" },{ name:"Latvia", value:"119" },{ name:"Lebanon", value:"120" },{ name:"Lesotho", value:"121" },{ name:"Liberia", value:"122" },{ name:"Libyan Arab Jamahiriya", value:"123" },{ name:"Liechtenstein", value:"124" },{ name:"Lithuania", value:"125" },{ name:"Luxembourg", value:"126" },{ name:"Macau", value:"127" },{ name:"Macedonia, The Former Yugoslav Republic of", value:"128" },{ name:"Madagascar", value:"129" },{ name:"Malawi", value:"130" },{ name:"Malaysia", value:"131" },{ name:"Maldives", value:"132" },{ name:"Mali", value:"133" },{ name:"Malta", value:"134" },{ name:"Marshall Islands", value:"135" },{ name:"Martinique", value:"136" },{ name:"Mauritania", value:"137" },{ name:"Mauritius", value:"138" },{ name:"Mayotte", value:"139" },{ name:"Mexico", value:"140" },{ name:"Micronesia, Federated States of", value:"141" },{ name:"Moldova, Republic of", value:"142" },{ name:"Monaco", value:"143" },{ name:"Mongolia", value:"144" },{ name:"Montserrat", value:"145" },{ name:"Morocco", value:"146" },{ name:"Mozambique", value:"147" },{ name:"Myanmar", value:"148" },{ name:"Namibia", value:"149" },{ name:"Nauru", value:"150" },{ name:"Nepal", value:"151" },{ name:"Netherlands", value:"152" },{ name:"Netherlands Antilles", value:"153" },{ name:"New Caledonia", value:"154" },{ name:"New Zealand", value:"155" },{ name:"Nicaragua", value:"156" },{ name:"Niger", value:"157" },{ name:"Nigeria", value:"158" },{ name:"Niue", value:"159" },{ name:"Norfolk Island", value:"160" },{ name:"Northern Mariana Islands", value:"161" },{ name:"Norway", value:"162" },{ name:"Oman", value:"163" },{ name:"Pakistan", value:"164" },{ name:"Palau", value:"165" },{ name:"Panama", value:"166" },{ name:"Papua New Guinea", value:"167" },{ name:"Paraguay", value:"168" },{ name:"Peru", value:"169" },{ name:"Philippines", value:"170" },{ name:"Pitcairn", value:"171" },{ name:"Poland", value:"172" },{ name:"Portugal", value:"173" },{ name:"Puerto Rico", value:"174" },{ name:"Qatar", value:"175" },{ name:"Reunion", value:"176" },{ name:"Romania", value:"177" },{ name:"Russian Federation", value:"178" },{ name:"Rwanda", value:"179" },{ name:"Saint Kitts and Nevis", value:"180" },{ name:"Saint Lucia", value:"181" },{ name:"Saint Vincent and the Grenadines", value:"182" },{ name:"Samoa", value:"183" },{ name:"San Marino", value:"184" },{ name:"Sao Tome and Principe", value:"185" },{ name:"Saudi Arabia", value:"186" },{ name:"Senegal", value:"187" },{ name:"Seychelles", value:"188" },{ name:"Sierra Leone", value:"189" },{ name:"Singapore", value:"190" },{ name:"Slovakia (Slovak Republic)", value:"191" },{ name:"Slovenia", value:"192" },{ name:"Solomon Islands", value:"193" },{ name:"Somalia", value:"194" },{ name:"South Africa", value:"195" },{ name:"South Georgia and the South Sandwich Islands", value:"196" },{ name:"South Sudan", value:"197" },{ name:"Spain", value:"198" },{ name:"Sri Lanka", value:"199" },{ name:"St. Helena", value:"200" },{ name:"St. Pierre and Miquelon", value:"201" },{ name:"Sudan", value:"202" },{ name:"Suriname", value:"203" },{ name:"Svalbard and Jan Mayen Islands", value:"204" },{ name:"Swaziland", value:"205" },{ name:"Sweden", value:"206" },{ name:"Switzerland", value:"207" },{ name:"Syrian Arab Republic", value:"208" },{ name:"Taiwan, Province of China", value:"209" },{ name:"Tajikistan", value:"210" },{ name:"Tanzania, United Republic of", value:"211" },{ name:"Thailand", value:"212" },{ name:"Togo", value:"213" },{ name:"Tokelau", value:"214" },{ name:"Tonga", value:"215" },{ name:"Trinidad and Tobago", value:"216" },{ name:"Tunisia", value:"217" },{ name:"Turkey", value:"218" },{ name:"Turkmenistan", value:"219" },{ name:"Turks and Caicos Islands", value:"220" },{ name:"Tuvalu", value:"221" },{ name:"Uganda", value:"222" },{ name:"Ukraine", value:"223" },{ name:"United Arab Emirates", value:"224" },{ name:"United Kingdom", value:"225" },{ name:"United States", value:"226" },{ name:"United States Minor Outlying Islands", value:"227" },{ name:"Uruguay", value:"228" },{ name:"Uzbekistan", value:"229" },{ name:"Vanuatu", value:"230" },{ name:"Venezuela", value:"231" },{ name:"Vietnam", value:"232" },{ name:"Virgin Islands (British)", value:"233" },{ name:"Virgin Islands (U.S.)", value:"234" },{ name:"Wallis and Futuna Islands", value:"235" },{ name:"Western Sahara", value:"236" },{ name:"Yemen", value:"237" },{ name:"Yugoslavia", value:"238" },{ name:"Zambia", value:"239" },{ name:"Zimbabwe", value:"240" }]
        

    //! BASIC RESPONSE FORMATTER
    this.makeResponse = function( response, message, command ){
        
        return {
            response: response,
            data: {
                message: message,
                command: command
            }
        };
        
    };
    
    //!FORMAT TO ISODATE
    this.newDate    = () => new Date().toDateString();
    this.isoDate    = () => new Date().format('isoDate');
    this.newIsoDate = (d) => new Date(d).format('isoDate')
    this.toIsoDate  = dObj => dObj.format('isoDate');
    
    this.monthNum     = () => new Date().format('monthNum');
    this.newMonthNum  = d  => new Date(d).format('monthNum');
    this.toMonthNum   = dObj => dObj.format('monthNum');
    
        
    //* MONTHS ARRAY
    var $month_array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.month_array = $month_array;
    this.month_o_array = [
                            { id: 0, name: "January" }, 
                            { id: 1, name:"February" }, 
                            { id: 2, name: "March" }, 
                            { id: 3, name: "April" }, 
                            { id: 4, name: "May" }, 
                            { id: 5, name: "June" }, 
                            { id: 6, name: "July" }, 
                            { id: 7, name: "August" }, 
                            { id: 8, name: "September" }, 
                            { id: 9, name: "October" }, 
                            { id: 10, name: "November" }, 
                            { id: 11, name: "December" }
                        ];
    
    // this.printMonths = $month_array
    //                     .reduce((mobj,m)=>{
    //                         mobj[m] = m   
    //                     },{})
    //                     .filter(m=>m)
    
    //! HANDLE APPLICATION NATIVE SERVICE REQUESTS
    this.ajax =function( path , data, success_callback, error_callback , config ){ 
        
        //$http.post( bix_hlink + path, data, config).then( success_callback, error_callback );
        $.ajax({
                method: "POST",
                url: this.hlink + path,
                data: data,
                success: success_callback,
                error: success_callback  
            });
        /*,
                error: error_callback      */
        
    };

    //!HANDLE CROSS ORIGIN APPLICATION SERVICE REQUESTS
    this.cors = function( link , data, success_callback, error_callback , config ){ 
        
        //$http.post( link, data, config).then( success_callback, error_callback );
        $.ajax({
                method: "POST",
                url: link,
                data: data,
                success: success_callback,
                error: success_callback   
            });
        
            /*,
                error: error_callback      */
    };  

    //!HANDLE JSON REQUESTS OF ANY CALIBER
    this.getJSON = function( link, callback_function ){
        
        $.getJSON( link, function( response ){
            callback_function(response);
        });
        
    };
    
    
    //!HANDLE JSON REQUESTS OF ANY CALIBER
    this.JSON = function( link ){
        
        return $.getJSON( link );
        
    };

    //! HANDLE CORS CALLS TO THE PHP FCGI MODULE
    this.cgi = ( url, data ) => {
        
        return $.ajax({
                    method: "GET",
                    url: url,
                    data: data,
                    dataType: 'jsonp',
                });
        
    }

    //!HANDLE THE DISPLAY OF DIALOG BOXES
    
    //* SHOW A "LOADING" ELEMENT
    this.loadify = function( el ){
        
        el.html('<ion-spinner icon="lines" class="spinner-energized"></ion-spinner>');
        
    };


    //!BASIC VALIDATION METHODS
    
    //*VALIDATE EMAIL ADDRESSES
    this.isemail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/;
    this.isEmail = prospective_email=>this.isemail.test( prospective_email );
    
    //*VALIDATE USERNAMES
    this.isusername= /^[a-z0-9_-]{4,16}$/;
    this.isUsername= prospective_username=>this.isusername.test( prospective_username );
    
    //*VALIDATE PASSWORDS
    
    this.ispassword = /^[-@./\!\$\%\^|#&,+\w\s]{6,50}$/;    
    this.isPassword = prospective_password=>this.ispassword.test( prospective_password );

    //* VALIDATE NUMBERS
    this.isnumber = /^-{0,1}\d*\.{0,1}\d+$/;
    this.isNumber = prospective_number=>this.isnumber.test( prospective_number );


    //*VALIDATE TELEPHONE NUMBERS

    this.istelephone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
    this.isTelephone = prospective_telephone=>this.istelephone.test( prospective_telephone );
    
    //*VALIDATE WHETHER TWO GIVEN VALUES MATCH
    this.matches = (val1, val2 )=>( val1 === val2 );

    //*TRANFORM NUMBER TO MONTH
    this.num2month = function( month_number ){
        
        if( !isNaN(month_number) ){
            
            return $month_array[month_number];
            
        }else{
            return "Invalid Month";
        }
        
    }; 
    
    //*REMOVE DUPLICATES FROM ARRAY
    this.unique = function (array_ ){
        
        var ret_array = new Array();
        
        for (var a = array_.length - 1; a >= 0; a--) {
            
            for (var b = array_.length - 1; b >= 0; b--) {
                
                if(array_[a] == array_[b] && a != b){
                    
                    delete array_[b];
                    
                }
                
            };
            
            if(array_[a] != undefined)
                
                ret_array.push(array_[a]);
            
        };
        
        return ret_array.reverse();
        
    };
    
    //* COUNT OCCURANCES IN AN ARRAY
    this.count = function( val, obj ){
    
        var cnt = 0;
    
        for( v in obj ){
            if( val === obj[v] ){
                cnt +=1;
            }
        }
        return cnt;
        
    };
    
    
    //* CONDITIONALLY TRANSFORM TO STRING
    this.str = function( obj ){
        return  ( typeof(obj) === "object" ) ? JSON.stringify(obj) : obj ;
    };
    
    //* CONDITIONALLY TRANSFORM TO JSON
    this.json = function( obj ){
        return ( typeof(obj) === 'object' ) ? obj : JSON.parse( obj );
    };
    
    
    this.md5 = function(str) {
        if(/^[a-f0-9]{32}$/gm.test(str)){
            return str;
        }else{
            return CryptoJS.MD5(str).toString();
        }        
    };

        
}])
//The BASIC sms sending application service
.service("sms",['app',function(app){
    
    /**
     * This angular service allows for you to easily send SMS messages conveniently using bixbyte's default SMS server
     * 
     * It allows the use of your *Framify SMS* android phone application to send simple SMS messages. 
     * 
     * You can easily extend it as you will since the socket connection to the server can be hooked to as "sms.socket"
     */

    //@ BASIC APPLICATION INITIALIZATION
    this.server       = {};
    this.server.host  = '41.89.162.252';
    //this.server.host  = '127.0.0.1';
    this.server.port  = '3000';
    this.socket       = io.connect(`http://${this.server.host}:${this.server.port}`);
    const socket      = this.socket;


    //@ SEND EXPRESS SMS'
    this.SMS = (smsData) => {
        socket.emit("sendSMS",smsData);
    };

    //@ SEND A SINGLE SMS
    this.oneSMS = (tel,mess,apiKey) => {
    
        var obj;
        if(Array.isArray(tel)){
            obj = tel;
        }else{
            obj = { 
                        telephone : tel,
                        message: mess,
                        password: apiKey
                    };
        }

        socket.emit("sendSMS", obj );

    };

    //@ SEND BULK SMS MESSAGES
    this.bulkSMS = (contacts,data,apiKey) => {
        const obj = [];
        if(!apiKey){
            alert('<center>Failed to instantiate the SMS sending service before api Key definition.</center>');
        }else if(Array.isArray(contacts)){
            
            contacts.forEach(function(element) {
                if(app.isTelephone(element) ){
                    obj.push({
                        telephone: element,
                        message: data,
                        apiKey: apiKey
                    });
                }else{
                    alert('<center>Could not send an SMS message to the invalid number '+ element +'.</center>');
                }
                
            }, this);

            socket.emit("sendSMS",obj);

        }else{
            alert('<center>You can only use the bulk SMS service with an array of telephone contacts</center>');
        }        
    };

    // @ SAMPLE APPLICATION SOCKET CONNECTION HANDLER
    // this.socket.on("connect",()=>{
    //     app.alert("<center>SUCCESSFULLY ESTABLISHED A CONNECTION TO THE BIXBYTE SMS SERVER</center>");
    // });

    
    //@ SAMPLE SUCCESSFUL SMS SENDING INFORMATION HANDLER
    this.socket.on("trueSMS",(data)=>{
        alert("The message has been conveyed.");
    });

}])

.service("cgi",[function(){

    //Handle background calls to the web server for database integration
    this.ajax = function(data){
        return $.ajax({
                    method: "GET",
                    url: "/php/index.php",
                    data: data       
                });
    };
                
}])
.run(["app","cgi","$rootScope","$location", "$localStorage","sms",function( app,cgi, $rootScope, $location, $localStorage,sms ){

    //! INJECT THE LOCATION SOURCE TO THE ROOT SCOPE
    $rootScope.location = $location;

    //! INJECT THE $localStorage instance into the root scope
    $rootScope.storage  = $localStorage;
    
    //! INJECT THE APPLICATION'S MAIN SERVICE TO THE ROOT SCOPE SUCH THAT ALL SCOPES MAY INHERIT IT
    $rootScope.app      = app;
    
    //! INJECT THE APP BASICS SERVICE
    $rootScope.cgi      = cgi;
    
    //! SIMPLE APPLICATION BEHAVIOR SETUP
    $rootScope.frame    = {};

    //#! INJECT THE SMS INSTANCE INTO THE MAIN SCOPE
    $rootScope.sms		= sms;
    
    //! IDENTIFY THE CURRENT PATH
    $rootScope.frame.path = ()=>$location.absUrl().split("/#/")[0]+"/#/"+$location.absUrl().split("/#/")[1].split("#")[0];
    //p.split("/#/")[0]+"/#/"+p.split("/#/")[1].split("#")[0]

    //! RELOCATION HANDLING
    $rootScope.frame.relocate = (loc)=>{
        console.log(`Relocating to: #${loc}`)
        $rootScope.location = `#${loc}`;
    };
    
    //! ADMIN HANDLING  
    $rootScope.frame.is_admin   = false;
    
    //! ADMIN STATUS CHECKER 
    $rootScope.frame.isAdmin = ()=>($rootScope.frame.is_admin)?true:false;
    
    //! ROOT USER STATUS CHECKER
    $rootScope.frame.isRoot = ()=>($rootScope.storage.admin.access==0)?true:false;
    
    //! ADMIN STATUS SWITCH
    $rootScope.frame.changeAdmin = (bool)=>{
        $rootScope.frame.is_admin = bool;
        //  $rootScope.$apply();
    }; 
    
    //! RESET THE ADMIN STATUS
    $rootScope.frame.reset = ()=>{
        delete $rootScope.storage.admin;
        delete $rootScope.storage.user;
        $rootScope.frame.changeAdmin(false);
        window.location = "/#/";
    };   


}])
.controller("appController", ['app','$scope','$location','$rootScope',function( app, $scope, $location, $rootScope ){

    //!APPLICATION GLOBAL SCOPE COMPONENTS
    $scope.current  = {};
    $scope.ui       = {};
    
    // $scope.urlParams = $stateParams;

    $rootScope.nav = [];
    //$rootScope.nav.search; 
    $rootScope.links = [];
    
    $scope.nav.hasFilters = false;

    
    //** MANAGE THE NAVIGATION SEARCH STATUS
    $scope.openFilters = function(hasFilters){
        if(hasFilters === true) { $scope.nav.hasFilters = false; }else{ $scope.nav.hasFilters = true; }
    };
    
    

    
    //!RE-INITIALIZE APPLICATION DATA
    $rootScope.app.reinit = function(){
    $scope.location.path("/framify");  
    };
    
            
    //@ FUNCTION EXECUTOR
    $rootScope.exec = f=>f();    
    
    /**
     * SECURE THE PARENTAL CONTROLLED URLS
     */
    $rootScope.secure = ( securityFunc )=>{
        
        var parts = window.location.href.split('/');
        var part = parts[(parts.length-1)];
        if( $scope.links.indexOf(part) >= 0  ){
            
        $rootScope.exec( securityFunc ); 
            
        }
        
        
    }

    /**
     * DATABASE CENTRIC ADDITION AND DELETION
     */
    
    
    //Define the main application objects
    $scope.add      = {};
    $scope.fetch    = {};
    $scope.fetched  = {};
    $scope.counted  = {};
    $scope.data     = {};
    
    $scope.data.login   = {};
    $scope.data.admin   = {};
    
    $rootScope.frame.changeAdmin(false);
    $scope.logedin  = false;    
    
    //! BASIC ADDITION
    $scope.add = (table,data,UID,cryptFields,cb)=>{
                    data = (data)?$scope.app.json(data):{};                    
                    data.command   = "add";
                    data.table     = (table != undefined)?table.toString().replace(/vw_/ig,''):"";
                    data.token     =  data.token || $scope.storage.admin._;
                    data.extras    =  (data)? ( (data.extras)?data.extras.replace(/LIMIT 1/ig,''): undefined ):undefined;
                    if(cryptFields){ 
                    cryptFields.split(",").forEach((cryptField)=>{
                        data[cryptField] = $scope.app.md5(data[cryptField]) 
                    });                        
                    }
                    $scope.cgi.ajax( data )
                    .then( (r) => {           
                    r = $scope.app.json(r);
                    if(r.response == 200){
                        $scope.app.UID(UID,`<center> ${r.data.message}</center>`, "success");                          
                        $scope.fetch(table,{specifics: data.specifics}); 
                        $scope.data[table.toString().replace(/vw_/ig,'')] = {};
                        if(typeof(cb)==="function"){
                            cb(data,r);
                        }else{
                            console.log('\n\n An invalid callback function was passed.')
                            console.dir( typeof(cb) );
                            console.log('\n\n')
                        }
                    }else{
                            //POSTGRESQL MATCHING
                            if(Array.isArray(r.data.message)){
                                var v =  r.data.message[2].match(/DETAIL:(.*)/)
                                if( v != undefined || v!=null ){
                                    r.data.message = v[1];
                                }else{
                                    r.data.message = r.data.message[2];
                                }
                            }else{
                                r.data.message;
                            }
                        
                            alert(`<center>${ r.data.message }</center>`);
                    }           
                        $scope.$apply();
                    })        
                };
    
    //! BASIC UPDATING
    $scope.update = (table,data,UID,cryptFields,cb,cbData)=>{
                    data = (data)?$scope.app.json(data):{};                    
                    data.command   = "update";
                    data.table     = (table != undefined)?table.toString().replace(/vw_/ig,''):"";
                    data.token     =  data.token || $scope.storage.admin._;
                    data.extras    =  (data)? ( (data.extras)?data.extras.replace(/LIMIT 1/ig,''): undefined ):undefined;
                    if(cryptFields){ 
                    cryptFields.split(",").forEach((cryptField)=>{
                        data[cryptField] = $scope.app.md5(data[cryptField]) 
                    });                        
                    }
                    $scope.cgi.ajax( data )
                    .then( (r) => {           
                    r = $scope.app.json(r);
                    if(r.response == 200){
                        $scope.app.UID(UID,`<center> ${r.data.message}</center>`, "success");                          
                        $scope.fetch(table,{specifics: data.specifics}); 
                        $scope.data[table.toString().replace(/vw_/ig,'')] = {};
                        if( typeof(cb) == 'function' ){
                            cb( (cbData || data.data.message) );                               
                        }

                    }else{
                        //POSTGRESQL MATCHING
                            if(Array.isArray(r.data.message)){
                                var v =  r.data.message[2].match(/DETAIL:(.*)/)
                                if( v != undefined || v!=null ){
                                    r.data.message = v[1];
                                }else{
                                    r.data.message = r.data.message[2];
                                }
                            }else{
                                r.data.message;
                            }
                        
                            alert(`<center>${ r.data.message }</center>`);
                    }           
                        $scope.$apply();
                    })        
                };
    
    
    //! BASIC DATA FETCHING
    var do_fetch = ( table,data,UID )=>{
            
            data = (data)?$scope.app.json(data):{};
            data.command    = "get";
            data.table      = table;        
            $scope.cgi.ajax(data)
            .then(function(r){
                    r = $scope.app.json(r);
                    if(r.response == 200){
                            $scope.fetched[table] = r.data.message;
                    }else{
                        //POSTGRESQL MATCHING
                            if(Array.isArray(r.data.message)){
                                    var v =  r.data.message[2].match(/DETAIL:(.*)/)
                                    if( v != undefined || v!=null ){
                                            r.data.message = v[1];
                                    }else{
                                            r.data.message = r.data.message[2];
                                    }
                            }else{
                                    r.data.message;
                            }
                        
                            alert(`<center>${ r.data.message }</center>`);
                    }
                    $scope.$apply();
            }) 
        
    };
    
    $scope.fetch = (table,data,UID)=>{
        
        if( Array.isArray(table) ){			
            table.forEach( (tData,tkey)=>do_fetch(tData[0],tData[1],tData[2]) );
        }else{
            do_fetch(table,data,UID);
        }
        
    };
    
    
    //! BASIC DELETION  
    $scope.del = (table,data,UID,delID)=>{
        data = (data)?$scope.app.json(data):{};
        data.command    = "del";
        data.table      = (table != undefined)?table.toString().replace(/vw_/ig,''):"";
        data.token      = data.token || $scope.storage.admin._;
        $scope.cgi.ajax(data)
        .then(function(r){
            r = $scope.app.json(r);
            if(r.response == 200){                           
                $scope.fetched[table].splice(delID,1);  
                $scope.app.UID('response',`<center>${r.data.message}</center>`,"info");                           
            }else{
            
                //POSTGRESQL MATCHING
                if(Array.isArray(r.data.message)){
                    var v =  r.data.message[2].match(/DETAIL:(.*)/)
                    if( v != undefined || v!=null ){
                        r.data.message = v[1];
                    }else{
                        r.data.message = r.data.message[2];
                    }
                }else{
                    r.data.message;
                }
            
                alert(`<center>${ r.data.message }</center>`);
            }
            $scope.$apply();
                
        })
    };

    //Basic User Login
    $scope.login = (cryptField) => {
        if(cryptField){ 
            $scope.data.login[cryptField] = $scope.app.md5($scope.data.login[cryptField])  
        }
        $scope.data.login.command   = "get";
        $scope.data.login.table     = "users";
        $scope.data.login.extras    = " AND active is true LIMIT 1";
        $scope.cgi.ajax( $scope.data.login )
        .then((r)=>{
                $scope.data.admin.extras = "";
                r = $scope.app.json(r);
                if(r.response == 200){
                                        
                    if(r.data.message.length > 0 && typeof(r.data.message[0]) == "object" ){
                        if(  r.data.message[0]['username'] == $scope.data.login.username  ){
                            $scope.storage.user = r.data.message[0];
                            $scope.logedin      = true;
                        }else{
                        delete $scope.storage.user;
                        window.location = "/#/";
                        }
                        
                    }else{
                        delete $scope.storage.user;
                        $scope.app.UID('response',`<center>You have entered the wrong login credentials.</center>`,"danger");
                    }
                    
                }else{
                    //POSTGRESQL MATCHING
                    if(Array.isArray(r.data.message)){
                        var v =  r.data.message[2].match(/DETAIL:(.*)/)
                        if( v != undefined || v!=null ){
                            r.data.message = v[1];
                        }else{
                            r.data.message = r.data.message[2];
                        }
                    }else{
                        r.data.message;
                    }
                
                    alert(`<center>${ r.data.message }</center>`);
                    delete $scope.storage.user;
                }
                $scope.$apply();
                
            })
    };

    //Basic admin login
    $scope.adminLogin = (cryptField) => {
        if(cryptField){ 
            $scope.data.admin[cryptField] = $scope.app.md5($scope.data.admin[cryptField])  
        }
        $scope.data.admin.command   = "get"
        $scope.data.admin.table     = "admins"
        $scope.data.admin.extras    = " AND active is true LIMIT 1"
        $scope.cgi.ajax($scope.data.admin)
        .then((r)=>{
            $scope.data.admin.extras = "";
            r = $scope.app.json(r);
            if(r.response == 200){
                
                // console.log(`Data length: ${r.data.message.length} \n Message Type: ${typeof(r.data.message[0])} \n Message: `)
                // console.dir(  r.data.message[0] )
                
                if(r.data.message.length > 0 && typeof(r.data.message[0]) != undefined ){
                    
                    if(  r.data.message[0]['password'] === $scope.data.admin.password  ){
                        $scope.storage.admin        = r.data.message[0];
                        $scope.storage.admin._      = {};
                        $scope.storage.admin._.user = r.data.message[0].admin_name;
                        $scope.storage.admin._.key  = r.data.message[0].password;
                        $rootScope.frame.changeAdmin(true);                        
                    }else{
                        delete $scope.data.admin;
                        delete $scope.storage.admin;
                        window.location = "/#/admin"; 
                    }
                    
                }else{
                    delete $scope.data.admin;
                    delete $scope.storage.admin;
                    $scope.app.UID('response',`<center>You have entered the wrong login credentials.</center>`,"danger");
                    window.location = "/#/admin";                       
                    
                }
                
            }else{
            //POSTGRESQL MATCHING
                if(Array.isArray(r.data.message)){
                    var v =  r.data.message[2].match(/DETAIL:(.*)/)
                    if( v != undefined || v!=null ){
                        r.data.message = v[1];
                    }else{
                        r.data.message = r.data.message[2];
                    }
                }else{
                    r.data.message;
                }
            
                alert(`<center>${ r.data.message }</center>`);
                delete $scope.storage.admin;
            }
            $scope.$apply();
        })
    };

    //@ Handle basic user re-authentication
    $scope.islogedin = () => {
        if($scope.storage.user){
            $scope.data.login.username = $scope.storage.user.username;
            $scope.data.login.password = $scope.storage.user.password;
            $scope.login();
        }
    };
    
    //@ Handle basic app-user logout
    $scope.logout = () => {
        $scope.islogedin = false;
        delete $scope.storage.user;
        window.location = '/#/';
    };

    //@ Handle basic application redirection
    $scope.redirect = (loc) => {
        if(loc){
            window.location = loc
        }else{
            window.location = "/#/framify";
        }ect       
    };

    // Basic Admin Auth
    $scope.authorize = () => {
        if($scope.storage.admin){
        $scope.data.admin        = {}; 
        $scope.data.admin.admin_name    = $scope.storage.admin.admin_name;
        $scope.data.admin.password      = $scope.storage.admin.password;
        $scope.adminLogin();
        }else{
            $scope.location = "/#/admin";
        }
    };
    
    $scope.deauthorize = () => {
        delete $scope.storage.admin; 
        $rootScope.frame.changeAdmin(false);               
        window.location = '/#/';
    };
    
    
    // BASIC Custom Queries
    $scope.custom = (table,data,UID,mess)=>{
        data = (data)?$scope.app.json(data):{};                    
        data.command   = "custom";
        data.token     =  data.token || $scope.storage.admin._;
        // console.dir( data );
        $scope.cgi.ajax( data )
        .then( (r) => {           
            r = $scope.app.json(r);
            if(r.response == 200){
                $scope.app.UID(UID,(mess||`<center>${r.data.message}</center>`), "success"); 
                $scope.cFetched[table] = r.data.message;
                $scope.data[table.toString().replace(/vw_/ig,'')] = {};
            }else{
                //POSTGRESQL MATCHING
                if(Array.isArray(r.data.message)){
                    var v =  r.data.message[2].match(/DETAIL:(.*)/)
                    if( v != undefined || v!=null ){
                        r.data.message = v[1];
                    }else{
                        r.data.message = r.data.message[2];
                    }
                }else{
                    r.data.message;
                }
            
                alert(`<center>${ r.data.message }</center>`);
            }           
            $scope.$apply();
        })        
    };

    //BASIC Instance Counter
    $scope.count = (table,data,UID,mess) => {
        
        data            = (data)?$scope.app.json(data):{};
        data.table      = table;
        data.command    = "count";
        data.token      = data.token || {};

        $scope.cgi.ajax( data )
        .then( (r) => {   

            r = $scope.app.json(r);

            if(r.response == 200){

                if( mess ) {
                    $scope.app.UID(UID,(mess), "success");
                }
                
                $scope.counted[table.toString().replace(/vw_/ig,'')] = r.data.message;
                $scope.data[table.toString().replace(/vw_/ig,'')] = {};
                
            }else{

                //POSTGRESQL MATCHING
                if(Array.isArray(r.data.message)){
                    var v =  r.data.message[2].match(/DETAIL:(.*)/)
                    if( v != undefined || v!=null ){
                        r.data.message = v[1];
                    }else{
                        r.data.message = r.data.message[2];
                    }
                }else{
                    r.data.message;
                }
            
                alert(`<center>${ r.data.message }</center>`);
            }           
            $scope.$apply();
        })    

    };

/**
    * TABLE SORTER
    */
    $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }


    /**
     *  DELETE UNWANTED FIELDS
     */
    $scope.sanitize = (data,keys) => {
        if(keys){
            keys.split(",").forEach((key)=>{
                delete data[key];
            }); 
        }
    };

/**
    * PUSH DATA TO OBJECT
*/
    $scope.dPush = (obj,key,val) =>{
    obj[key] = val;
    };

/**
 * @ MONTH REGULATION
 */
$scope.currmoin =  $scope.app.monthNum();
$scope.setMoin  = (moin)=>{$scope.currmoin=moin;} 

//@ INJECT A STANDARD WHERE "Extras" OBJECT
$scope.addExtras = ( targetObj, extrasObj, subStrings, removeKeys) => {

        targetObj  = targetObj || {};
        extrasObj  = extrasObj || {};
            subStrings = subStrings || '';
        removeKeys = removeKeys || '';

        var extras = '';

        var k = [],v = [];

        //@ CAPTURE THE REMOVE KEYS
        removeKeys = removeKeys.split(',').filter(e=>e);


        removeKeys.forEach( e => {
            extrasObj[e] = null;
            delete extrasObj[e];
        });

        //@ CAPTURE REPLACE STRINGS
        subStrings
            .split(',')
        .forEach( (e,i) => {
            let x = e.split(':');
            k[i] = (x[0]);
            v[i] = (x[1]);				
        })

        //@ GET THE DEFINED KEYS
        var keys = Object.keys(extrasObj);

        //@ REPLACE THE DEFINED WITH THE DESIRED REPLACE KEYS
        k.forEach( (e,i) => {

            if( keys.indexOf(e) != -1 ){
                
                extrasObj[ v[i] ]  = extrasObj[e];
                extrasObj[e] = null;
                delete extrasObj[e];

            }
            
        });

        
        k = Object.keys(extrasObj);
        v = null;

        k.forEach( (e,i) => {
            
            extras += ' ' + e + "='"+extrasObj[e]+"' AND";

        });

        k = null;

        
        targetObj.extras =  extras.replace(/AND+$/,'');

        return targetObj;

};

///////////////////////////////////////////////////////////////////////////////////////////////////
// APPLICATION SPECIFIC ADDITIONS

//@ LOAD A SERVICE ONTO THE STAGE
$scope.service = {};
$scope.entity  = {};

$scope.showService = (serviceData) => {
    $scope.service.available = true;
    $scope.service.current   = serviceData;
    $scope.$apply();
};

$scope.showEntity = (serviceData) => {
    $scope.entity.available = true;
    $scope.entity.current   = serviceData;
    $scope.$apply();
};

//@ Count my entities
    $scope.howMany = () => {

        var data        = {owner: storage.user.username};
        data            = (data)?$scope.app.json(data):{};
        data.table      = 'entities';
        data.command    = "count";
        data.token      =  {};

        $scope.cgi.ajax( data )
        .then( (r) => {   
            
            r = $scope.app.json(r);

            if(r.response == 200){

                if( mess ) {
                    $scope.app.UID(UID,(mess), "success");
                }
                
                $scope.counted[data.table.toString().replace(/vw_/ig,'')] = r.data.message;
                
            }else{

                //POSTGRESQL MATCHING
                if(Array.isArray(r.data.message)){
                    var v =  r.data.message[2].match(/DETAIL:(.*)/)
                    if( v != undefined || v!=null ){
                        r.data.message = v[1];
                    }else{
                        r.data.message = r.data.message[2];
                    }
                }else{
                    r.data.message;
                }
            
                alert(`<center>${ r.data.message }</center>`);
            }           
            $scope.$apply();
        })    


    };


}])
.controller('hospitalCtrl',['$scope',function($scope){

//@ REDIRECT USER TO LOGIN PAGE
$scope.loginRedirect = () => {
    window.location = "/#/login";
};

//@ SETUP USER CREDENTIALS FOR USER SIGNUP
$scope.setCreds = (obj) => {
    obj         = obj || {};
    obj.token   = {
                        user: "userAdmin",
                        key:  "153797e5fc6433812172aa8d47ec69e1",
                        specifics: 'Direct user request (signup,appointments)'
                    };
    return obj;
};

$scope.newAppontment = (data) => {
    
}



//@ LIST A REPORT FOR THE NEXT APPOINTMENT
$scope.nextAppointment = (entity) => {
    const sms = [
                    //! THE PRACTITIONER's MESSAGE
                    { 
                        telephone:  $scope.appointmentTelephone,
                        message:    `Hello ${$scope.appointmentTitle}, you have a new appointment request to review on the matibabu portal.`,
                        password:   "355912060268866" 
                    },
                    //! THE CLIENT'S MESSAGE
                    { 
                        telephone:  entity.telephone,
                        message:    `Thank you ${entity.name}, your request for an appointment has been received. ${$scope.appointmentTitle} will get back to you as soon as possible.`,
                        password:   "355912060268866" 
                    }
                ];


    sms.forEach(mess=>{
        $scope.sms.oneSMS(mess.telephone,mess.message,mess.password); 
    });
    
    $scope.bookAppointment     =false;
};

//@ ALLOW FOR APPOINTMENT SETTING
$scope.setAppointment = (entity) => {
    $scope.bookAppointment     =true;
    $scope.appointmentId       =entity.entity_id;
    $scope.appointmentTitle    =entity.title;
    $scope.appointmentTelephone=entity.telephone;
    //$scope.$apply();
};

//@ ALLOW FOR APPOINTMENT UNSETTING
$scope.clearAppointment = () => {
    $scope.bookAppointment     =false;
    //$scope.$apply();
}



//@ SET DEFAULT APPLICATION ACCESS CREDENTIALS 
$scope.sudo = (obj,usercreds) => {

    if(usercreds&&obj){
        obj.token = {};
        obj.token = {
            user: "userAdmin",
            key:  "153797e5fc6433812172aa8d47ec69e1",
            specifics: usercreds
        };
        return obj;
        
    }else{
        alert("<center>User credentials are required in order to invoke the sudo function</center>");
        return {};
    }

};


// //@ SIMPLE FILTER BY OWNER
// $scope.isMine = (genInfo) =>{
//     console.log(genInfo.owner==$scope.storage.user.username)
//     return (genInfo.owner==$scope.storage.user.username);
//  } 

}])
.directive("contenteditable", function() {
  return {
    restrict: "A",
    require: "ngModel",
    link: function(scope, element, attrs, ngModel) {

      function read() {
        ngModel.$setViewValue(element.html());
      }

      ngModel.$render = function() {
        element.html(ngModel.$viewValue || "");
      };

      element.bind("blur keyup change", function() {
        scope.$apply(read);
      });
    }
  };
})