'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

angular.module('framify.js', ['ui.router', 'framify-paginate', 'ngStorage', 'jsonFormatter', 'chart.js', 'ngAria', 'ngMaterial', 'ngMessages'])

//@ Application running essentials
.service("app", ['$http', 'remoteAuth', '$q', function ($http, remoteAuth, $q) {

    var app = this;

    //!SETUP THE APPLICATION BASICS
    var url = window.location.href.split('/').filter(function (urlPortion) {
        return urlPortion != '' && urlPortion != 'http:' && urlPortion != 'https:';
    });
    var pathPos = window.location.href.split('/').filter(function (urlPortion) {
        return urlPortion != '';
    });

    //! APP CONFIGURATIONS
    this.scheme = pathPos[0];
    this.ip = url[0].split(':')[0];
    this.port = url[0].split(':')[1];
    this.hlink = this.scheme + '//' + this.ip + (this.port != undefined ? ":" + this.port : "");

    //!APPLICATION URL
    //this.url = "http://41.89.162.4:3000";
    this.url = this.hlink;

    var hlink = this.hlink;

    this.nav = [];

    //@Perform simple redirects
    this.redirect = function (loc) {
        if (loc) {
            window.location = loc;
        } else {
            window.location = "/";
        }
        return $q.resolve(true).catch(function (e) {
            // console.log("Encountered an error when processing the redirect function.")
            // console.dir(e)
        });
    };

    this.setVar = function (obj, key, val) {

        obj = obj ? obj : {};
        obj[key] = !isNaN(val) ? parseInt(val) : val;
        return obj;
    };

    this.set_var = function (obj, key, val) {

        obj = obj ? obj : {};
        obj[key] = val;

        return $q.resolve(obj);
    };

    this.set = function (obj, key, value) {
        obj[key] = value;
    };

    this.getval = function (obj, key) {
        return obj[key];
    };

    //* CONDITIONALLY TRANSFORM TO STRING
    this.str = function (obj) {
        return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === "object" ? JSON.stringify(obj) : obj;
    };
    this.stringify = function (obj) {
        return $q.resolve(app.str(obj));
    };

    //* CONDITIONALLY TRANSFORM TO JSON
    this.json = function (obj) {
        return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === "object" ? obj : JSON.parse(obj);
    };
    this.jsonify = function (obj) {
        return $q.resolve(app.json(obj));
    };

    //* CONDITIONALLY RETURN AN MD5 HASH
    this.md5 = function (str) {
        return (/^[a-f0-9]{32}$/gm.test(str) ? str : CryptoJS.MD5(str).toString()
        );
    };
    this.md5ify = function (str) {
        return $q.resolve(app.md5(str));
    };

    //BASE64 ENCODE A STRING
    this.base64_encode = function (string) {
        return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(string));
    };
    this.base64_encodify = function (string) {
        return $q.resolve(app.base64_encode(string));
    };

    //BASE64 DECODE A STRING
    this.base64_decode = function (encoded) {
        return CryptoJS.enc.Base64.parse(encoded).toString(CryptoJS.enc.Utf8);
    };
    this.base64_decodify = function (encoded) {
        return $q.resolve(app.base64_decode(encoded));
    };

    //@ THE OFFICIAL FILE UPLOAD SERVICE
    this.upload = function (data, destination) {

        return $q(function (resolve, reject) {
            //* create a formdata object
            var fd = new FormData();
            // fd.files = {}
            // fd.files.upload = {}
            //* add the defined keys to the formdata object
            for (var key in data) {
                // // console.dir(data[key])
                fd.append(key, data[key]);
                // fd.files.upload[key] = data[key];
                // fd[key] = data[key]
            };

            // // console.dir(fd)

            //* post the data to the /upload route of the running server
            $http.post(hlink + '/upload/' + destination, fd, {

                transformRequest: angular.identity,

                //* ensure automatic content-type settng
                headers: { 'Content-Type': undefined }

            }).then(function (d) {
                return resolve(d);
            });
        });
    };

    //@ GET THE KEYS FROM AN OBJECT
    this.keys = function (obj) {
        return Object.keys(obj);
    };

    this.vals = function (obj) {
        var vals = [];
        Object.keys(obj).forEach(function (v) {
            vals.push(obj[v]);
        });
        return vals;
    };

    //@ CREATE A COPY OF AN OBJECT
    this.clone = function (obj) {

        //* ensure that the object is defined
        if (null == obj || "object" != (typeof obj === 'undefined' ? 'undefined' : _typeof(obj))) return obj;

        //* call the object constructor prototype
        var copy = obj.constructor();

        //* clone all attributes of the parent object into a new object
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = /^[0-9]+$/.test(obj[attr]) ? parseInt(obj[attr]) : obj[attr];
        }

        //* return the newly created object
        return copy;
    };

    //! PARSE AN INTEGER
    this.parseInt = function (str) {
        return parseInt(str);
    };

    //! EMPTY CALLBACK
    this.doNothing = function () {
        return $q.resolve().catch(function (e) {
            // console.log("Encountered an error when processing the donothing function.")
            // console.dir(e)
        });
    };

    //@ FIND NUMBERS IN A STRING
    this.getNumbers = function (str) {
        var firstOnly = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var numMatch = /\d+/g;
        return firstOnly ? str.toString().match(numMatch)[0] : str.toString().match(numMatch);
    };

    //! SET A NOTIFICATION 
    this.notify = function (notificationContent, notificationClass, notificationTimeout, position) {

        UIkit.notify({
            message: '<center>' + (notificationContent || 'A blank notification was triggered.') + '</center>',
            status: notificationClass || 'info',
            timeout: notificationTimeout || 6000,
            pos: 'top-center' || position
        });

        return $q.resolve(true).catch(function (e) {
            // console.dir(e)
        });
    };

    var notify = this.notify;

    this.countries = [{ name: "Afghanistan", value: "1" }, { name: "Albania", value: "2" }, { name: "Algeria", value: "3" }, { name: "American Samoa", value: "4" }, { name: "Andorra", value: "5" }, { name: "Angola", value: "6" }, { name: "Anguilla", value: "7" }, { name: "Antarctica", value: "8" }, { name: "Antigua and Barbuda", value: "9" }, { name: "Argentina", value: "10" }, { name: "Armenia", value: "11" }, { name: "Aruba", value: "12" }, { name: "Australia", value: "13" }, { name: "Austria", value: "14" }, { name: "Azerbaijan", value: "15" }, { name: "Bahamas", value: "16" }, { name: "Bahrain", value: "17" }, { name: "Bangladesh", value: "18" }, { name: "Barbados", value: "19" }, { name: "Belarus", value: "20" }, { name: "Belgium", value: "21" }, { name: "Belize", value: "22" }, { name: "Benin", value: "23" }, { name: "Bermuda", value: "24" }, { name: "Bhutan", value: "25" }, { name: "Bolivia", value: "26" }, { name: "Bosnia and Herzegowina", value: "27" }, { name: "Botswana", value: "28" }, { name: "Bouvet Island", value: "29" }, { name: "Brazil", value: "30" }, { name: "British Indian Ocean Territory", value: "31" }, { name: "Brunei Darussalam", value: "32" }, { name: "Bulgaria", value: "33" }, { name: "Burkina Faso", value: "34" }, { name: "Burundi", value: "35" }, { name: "Cambodia", value: "36" }, { name: "Cameroon", value: "37" }, { name: "Canada", value: "38" }, { name: "Cape Verde", value: "39" }, { name: "Cayman Islands", value: "40" }, { name: "Central African Republic", value: "41" }, { name: "Chad", value: "42" }, { name: "Chile", value: "43" }, { name: "China", value: "44" }, { name: "Christmas Island", value: "45" }, { name: "Cocos (Keeling) Islands", value: "46" }, { name: "Colombia", value: "47" }, { name: "Comoros", value: "48" }, { name: "Congo", value: "49" }, { name: "Congo, the Democratic Republic of the", value: "50" }, { name: "Cook Islands", value: "51" }, { name: "Costa Rica", value: "52" }, { name: "Cote d\'Ivoire", value: "53" }, { name: "Croatia (Hrvatska)", value: "54" }, { name: "Cuba", value: "55" }, { name: "Cyprus", value: "56" }, { name: "Czech Republic", value: "57" }, { name: "Denmark", value: "58" }, { name: "Djibouti", value: "59" }, { name: "Dominica", value: "60" }, { name: "Dominican Republic", value: "61" }, { name: "East Timor", value: "62" }, { name: "Ecuador", value: "63" }, { name: "Egypt", value: "64" }, { name: "El Salvador", value: "65" }, { name: "Equatorial Guinea", value: "66" }, { name: "Eritrea", value: "67" }, { name: "Estonia", value: "68" }, { name: "Ethiopia", value: "69" }, { name: "Falkland Islands (Malvinas)", value: "70" }, { name: "Faroe Islands", value: "71" }, { name: "Fiji", value: "72" }, { name: "Finland", value: "73" }, { name: "France", value: "74" }, { name: "France Metropolitan", value: "75" }, { name: "French Guiana", value: "76" }, { name: "French Polynesia", value: "77" }, { name: "French Southern Territories", value: "78" }, { name: "Gabon", value: "79" }, { name: "Gambia", value: "80" }, { name: "Georgia", value: "81" }, { name: "Germany", value: "82" }, { name: "Ghana", value: "83" }, { name: "Gibraltar", value: "84" }, { name: "Greece", value: "85" }, { name: "Greenland", value: "86" }, { name: "Grenada", value: "87" }, { name: "Guadeloupe", value: "88" }, { name: "Guam", value: "89" }, { name: "Guatemala", value: "90" }, { name: "Guinea", value: "91" }, { name: "Guinea-Bissau", value: "92" }, { name: "Guyana", value: "93" }, { name: "Haiti", value: "94" }, { name: "Heard and Mc Donald Islands", value: "95" }, { name: "Holy See (Vatican City State)", value: "96" }, { name: "Honduras", value: "97" }, { name: "Hong Kong", value: "98" }, { name: "Hungary", value: "99" }, { name: "Iceland", value: "100" }, { name: "India", value: "101" }, { name: "Indonesia", value: "102" }, { name: "Iran (Islamic Republic of)", value: "103" }, { name: "Iraq", value: "104" }, { name: "Ireland", value: "105" }, { name: "Israel", value: "106" }, { name: "Italy", value: "107" }, { name: "Jamaica", value: "108" }, { name: "Japan", value: "109" }, { name: "Jordan", value: "110" }, { name: "Kazakhstan", value: "111" }, { name: "Kenya", value: "112" }, { name: "Kiribati", value: "113" }, { name: "Korea, Democratic People\'s Republic of", value: "114" }, { name: "Korea, Republic of", value: "115" }, { name: "Kuwait", value: "116" }, { name: "Kyrgyzstan", value: "117" }, { name: "Lao, People\'s Democratic Republic", value: "118" }, { name: "Latvia", value: "119" }, { name: "Lebanon", value: "120" }, { name: "Lesotho", value: "121" }, { name: "Liberia", value: "122" }, { name: "Libyan Arab Jamahiriya", value: "123" }, { name: "Liechtenstein", value: "124" }, { name: "Lithuania", value: "125" }, { name: "Luxembourg", value: "126" }, { name: "Macau", value: "127" }, { name: "Macedonia, The Former Yugoslav Republic of", value: "128" }, { name: "Madagascar", value: "129" }, { name: "Malawi", value: "130" }, { name: "Malaysia", value: "131" }, { name: "Maldives", value: "132" }, { name: "Mali", value: "133" }, { name: "Malta", value: "134" }, { name: "Marshall Islands", value: "135" }, { name: "Martinique", value: "136" }, { name: "Mauritania", value: "137" }, { name: "Mauritius", value: "138" }, { name: "Mayotte", value: "139" }, { name: "Mexico", value: "140" }, { name: "Micronesia, Federated States of", value: "141" }, { name: "Moldova, Republic of", value: "142" }, { name: "Monaco", value: "143" }, { name: "Mongolia", value: "144" }, { name: "Montserrat", value: "145" }, { name: "Morocco", value: "146" }, { name: "Mozambique", value: "147" }, { name: "Myanmar", value: "148" }, { name: "Namibia", value: "149" }, { name: "Nauru", value: "150" }, { name: "Nepal", value: "151" }, { name: "Netherlands", value: "152" }, { name: "Netherlands Antilles", value: "153" }, { name: "New Caledonia", value: "154" }, { name: "New Zealand", value: "155" }, { name: "Nicaragua", value: "156" }, { name: "Niger", value: "157" }, { name: "Nigeria", value: "158" }, { name: "Niue", value: "159" }, { name: "Norfolk Island", value: "160" }, { name: "Northern Mariana Islands", value: "161" }, { name: "Norway", value: "162" }, { name: "Oman", value: "163" }, { name: "Pakistan", value: "164" }, { name: "Palau", value: "165" }, { name: "Panama", value: "166" }, { name: "Papua New Guinea", value: "167" }, { name: "Paraguay", value: "168" }, { name: "Peru", value: "169" }, { name: "Philippines", value: "170" }, { name: "Pitcairn", value: "171" }, { name: "Poland", value: "172" }, { name: "Portugal", value: "173" }, { name: "Puerto Rico", value: "174" }, { name: "Qatar", value: "175" }, { name: "Reunion", value: "176" }, { name: "Romania", value: "177" }, { name: "Russian Federation", value: "178" }, { name: "Rwanda", value: "179" }, { name: "Saint Kitts and Nevis", value: "180" }, { name: "Saint Lucia", value: "181" }, { name: "Saint Vincent and the Grenadines", value: "182" }, { name: "Samoa", value: "183" }, { name: "San Marino", value: "184" }, { name: "Sao Tome and Principe", value: "185" }, { name: "Saudi Arabia", value: "186" }, { name: "Senegal", value: "187" }, { name: "Seychelles", value: "188" }, { name: "Sierra Leone", value: "189" }, { name: "Singapore", value: "190" }, { name: "Slovakia (Slovak Republic)", value: "191" }, { name: "Slovenia", value: "192" }, { name: "Solomon Islands", value: "193" }, { name: "Somalia", value: "194" }, { name: "South Africa", value: "195" }, { name: "South Georgia and the South Sandwich Islands", value: "196" }, { name: "South Sudan", value: "197" }, { name: "Spain", value: "198" }, { name: "Sri Lanka", value: "199" }, { name: "St. Helena", value: "200" }, { name: "St. Pierre and Miquelon", value: "201" }, { name: "Sudan", value: "202" }, { name: "Suriname", value: "203" }, { name: "Svalbard and Jan Mayen Islands", value: "204" }, { name: "Swaziland", value: "205" }, { name: "Sweden", value: "206" }, { name: "Switzerland", value: "207" }, { name: "Syrian Arab Republic", value: "208" }, { name: "Taiwan, Province of China", value: "209" }, { name: "Tajikistan", value: "210" }, { name: "Tanzania, United Republic of", value: "211" }, { name: "Thailand", value: "212" }, { name: "Togo", value: "213" }, { name: "Tokelau", value: "214" }, { name: "Tonga", value: "215" }, { name: "Trinidad and Tobago", value: "216" }, { name: "Tunisia", value: "217" }, { name: "Turkey", value: "218" }, { name: "Turkmenistan", value: "219" }, { name: "Turks and Caicos Islands", value: "220" }, { name: "Tuvalu", value: "221" }, { name: "Uganda", value: "222" }, { name: "Ukraine", value: "223" }, { name: "United Arab Emirates", value: "224" }, { name: "United Kingdom", value: "225" }, { name: "United States", value: "226" }, { name: "United States Minor Outlying Islands", value: "227" }, { name: "Uruguay", value: "228" }, { name: "Uzbekistan", value: "229" }, { name: "Vanuatu", value: "230" }, { name: "Venezuela", value: "231" }, { name: "Vietnam", value: "232" }, { name: "Virgin Islands (British)", value: "233" }, { name: "Virgin Islands (U.S.)", value: "234" }, { name: "Wallis and Futuna Islands", value: "235" }, { name: "Western Sahara", value: "236" }, { name: "Yemen", value: "237" }, { name: "Yugoslavia", value: "238" }, { name: "Zambia", value: "239" }, { name: "Zimbabwe", value: "240" }];

    //! BASIC FRAMIFY FORMAT RESPONSE FORMATTER
    this.makeResponse = function (response, message, command) {

        return {
            response: response,
            data: {
                message: message,
                command: command
            }
        };
    };
    this.make_response = this.makeResponse;

    //!DATE FORMATERS
    //* date object     
    this.date = function () {
        return new Date();
    };

    //* simple date
    this.newDate = function () {
        return new Date().toDateString();
    };
    this.new_date = this.newDate;

    //* isodate
    this.isoDate = function () {
        return new Date().format('isoDate');
    };
    this.iso_date = this.isoDate;

    //* get the isoDate of the specified date
    this.getIsoDate = function (d) {
        return new Date(d).format('isoDate');
    };
    this.get_iso_date = this.getIsoDate;

    //* get the isoDate of a date object
    this.toIsoDate = function (dObj) {
        return dObj.format('isoDate');
    };
    this.to_iso_date = this.toIsoDate;

    //* custom datetime
    this.dateTime = function () {
        return new Date().format('dateTime');
    };
    this.date_time = this.dateTime;

    //* set the date in the custom datetime format
    this.getDateTime = function (d) {
        return new Date(d).format('dateTime');
    };
    this.get_date_time = this.getDateTime;

    //* Convert a date to the dd-mm-yyyy hh:mm format
    this.toDateTime = function (dObj) {
        return dObj.format('dateTime');
    };
    this.to_date_time = this.toDateTime;

    //* month number
    this.monthNum = function () {
        return new Date().format('monthNum');
    };
    this.month_num = this.monthNum;

    //* get month number of the specified date
    this.getMonthNum = function (d) {
        return new Date(d).format('monthNum');
    };
    this.get_month_num = this.getMonthNum;

    //* get date objects' month number
    this.toMonthNum = function (dObj) {
        return dObj.format('monthNum');
    };
    this.to_month_num = this.toMonthNum;

    //* MONTHS ARRAY
    var $month_array = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    this.month_array = $month_array;
    this.month_o_array = [{ id: 0, name: "January" }, { id: 1, name: "February" }, { id: 2, name: "March" }, { id: 3, name: "April" }, { id: 4, name: "May" }, { id: 5, name: "June" }, { id: 6, name: "July" }, { id: 7, name: "August" }, { id: 8, name: "September" }, { id: 9, name: "October" }, { id: 10, name: "November" }, { id: 11, name: "December" }];

    // this.printMonths = () =>  $month_o_array
    //                     .reduce((mobj,m)=>{
    //                         mobj[m] = m   
    //                     },{})
    //                     .filter(m=>m)

    //! HANDLE APPLICATION SERVICE REQUESTS
    this.ajax = function (method, target, data) {

        return $.ajax({
            method: method || "POST",
            url: target,
            data: data,
            dataType: 'jsonp',
            headers: { 'Access-Control-Allow-Origin': "*" }
        });
    };

    //!HANDLE JSON REQUESTS 
    this.getJSON = function (target) {

        return $.getJSON(target.replace(/callback=?/ig, "") + '?callback=?');
    };
    this.get_json = this.getJSON;

    //! HANDLE CORS CALLS WITH jsonp ENABLED
    this.cgi = function (method, url, data) {

        return $.ajax({
            method: method || "GET",
            url: url,
            data: data,
            dataType: 'jsonp',
            headers: { 'Access-Control-Allow-Origin': "*" }
        });
    };

    //!HANDLE THE DISPLAY OF DIALOG BOXES

    //* SHOW A "LOADING" ELEMENT
    this.loadify = function (duration, message) {

        return $q(function (resolve, reject) {
            var modal = UIkit.modal.blockUI('<center><i style="color:blue;" class="fa fa fa-spinner fa-pulse fa-5x fa-fw"></i></center>' + (message ? '<center><br>' + message + '</center>' : ""));
            if (duration && !isNaN(duration)) {
                setTimeout(function () {
                    modal.hide();
                    resolve(true);
                }, duration);
            } else {
                resolve(modal);
            }
        });
    };

    //*GENERATE A CUSTOM ALERT DIALOG
    this.alert = function (title, message, cb) {

        UIkit.modal.alert('<font color="#1976D2" style="font-weight:bold;text-transform:uppercase;">' + (title || 'Notice') + '</font>\n            <hr>\n            <center>' + (message || '</center><font color=red font-weight=bold; font-size=2em>Oops!</font><br>Something nasty happened!<center>') + '</center>');

        if (cb && typeof cb == "function") {
            return $q.resolve(cb(message)).catch(function (e) {
                // console.log("Encountered an error when processing the alert function.")
                // console.dir(e)
            });
        } else {
            return $q.resolve(true).catch(function (e) {
                // console.log("Encountered an error when processing the alert2 function.")
                // console.dir(e)
            });
        }
    };

    //*GENERATE A CUSTOM CONFIRM DIALOG
    this.confirm = function (title, message, cb) {

        return $q(function (resolve) {

            UIkit.modal.confirm('<font color="#1976D2" style="font-weight:bold;text-transform:uppercase;">' + (title || 'Confirmation required.') + '</font>\n                <hr>\n                <center>' + message + '</center>', function () {
                if (cb && typeof cb == "function") {
                    resolve(cb(message));
                } else {
                    resolve(true);
                }
            });
        });
    };

    //*GENERATE A CUSTOM PROMPT DIALOG
    this.prompt = function (title, label, placeholder, cb) {

        return $q(function (resolve) {

            UIkit.modal.prompt('<font color="#1976D2" style="font-weight:bold;text-transform:uppercase;">' + (title || 'Info required') + '</font>\n            <hr>\n            ' + (label || 'email') + ' :', placeholder || '', function (userValue) {
                if (cb && typeof cb == "function") {
                    resolve(cb(userValue));
                } else {
                    resolve(userValue);
                }
            });
        });
    };

    //!BASIC VALIDATION METHODS

    //*VALIDATE EMAIL ADDRESSES
    this.isemail = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/;
    this.isEmail = function (prospective_email) {
        return app.isemail.test(prospective_email);
    };
    this.is_email = this.isEmail;

    //*VALIDATE USERNAMES
    this.isusername = /^[a-z0-9_-]{4,16}$/;
    this.isUsername = function (prospective_username) {
        return app.isusername.test(prospective_username);
    };
    this.is_username = this.isUsername;

    //*VALIDATE PASSWORDS
    this.ispassword = /^[-@./\!\$\%\^|#&,+\w\s]{6,50}$/;
    this.isPassword = function (prospective_password) {
        return app.ispassword.test(prospective_password);
    };
    this.is_password = this.isPassword;

    //* VALIDATE NUMBERS
    this.isnumber = /^-{0,1}\d*\.{0,1}\d+$/;
    this.isNumber = function (prospective_number) {
        return app.isnumber.test(prospective_number);
    };
    this.is_number = this.isNumber;

    //*VALIDATE TELEPHONE NUMBERS
    this.istelephone = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    this.ismultitelephone = /^([\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}(?:,|$))+$/im;
    this.isTelephone = function (prospective_telephone) {
        return app.istelephone.test(prospective_telephone);
    };
    this.is_telephone = this.isTelephone;

    //@ VALIDATE IMEI NUMBERS 
    this.isimei = /^[0-9]{15}$/;
    this.isImei = function (prospective_imei) {
        return app.isimei.test(prospective_imei);
    };
    this.is_imei = this.isImei;

    //*VALIDATE DATETIME VALUES IN THE FORMAT  DD-MM-YYYY HH:MM e.g 29-02-2013 22:16
    this.isdateTime = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[012])-(19|20)[0-9]{2} (2[0-3]|[0-1][0-9]):[0-5][0-9]$/;
    this.isDateTime = function (prospective_date) {
        return app.isdateTime.test(prospective_date);
    };
    this.is_date_time = this.isDateTime;

    //*VALIDATE WHETHER TWO GIVEN VALUES MATCH
    this.matches = function (val1, val2) {
        return val1 === val2;
    };

    //*TRANFORM NUMBER TO MONTH
    this.num2month = function (month_number) {
        return !isNaN(month_number) && month_number <= 11 ? $month_array[month_number] : "Invalid Month";
    };

    //*REMOVE DUPLICATES FROM ARRAY
    this.unique = function (array_) {

        if (!Array.isArray(array_)) {
            app.notify('Could not remove duplicates from a non array object', 'danger');
            return array_;
        } else {

            //* create a new array
            var ret_array = new Array();

            //* loop through the entire length of the provided array
            for (var a = array_.length - 1; a >= 0; a--) {

                //* loop through the array once more (for re-verification)
                for (var b = array_.length - 1; b >= 0; b--) {
                    //* de-populate duplicates in the array
                    if (array_[a] == array_[b] && a != b) {
                        delete array_[b];
                    }
                };

                //* store the relevant values
                if (array_[a] != undefined) {
                    ret_array.push(array_[a]);
                }
            };
            //* return the reversed array (to avoid distortion from the initial)
            return ret_array.reverse();
        }
    };

    this.removeDuplicates = this.unique;
    this.remove_duplicates = this.removeDuplicates;

    //* COUNT OCCURANCES IN AN ARRAY
    this.count = function (searchParam, arrayObject) {

        //@ Ensure that the Object to be searched is an array
        if (Array.isArray(arrayObject)) {

            //@ Handle Multiple Item Searches
            if (Array.isArray(searchParam)) {

                //@ The Required placeholder objects
                var i = 0;
                var cnt = [];

                //@ Loop through each item in the search array
                for (var searchVal in searchParam) {

                    //@ Instantiate the counter object for this particular Item
                    cnt[i] = 0;

                    //@ Loop through the array searching for the item
                    for (var v in arrayObject) {

                        //@ If the item is found, 
                        if (searchParam[searchVal] === arrayObject[v]) {

                            //@ Increment the number of instances in the 'found' Array
                            cnt[i] = isNaN(cnt[i]) ? 1 : cnt[i] += 1;
                        }
                    }

                    //@ Move to the next Item 
                    i++;
                }

                //@ Return the result to the client
                return cnt;

                //@ Handle Single Item searches
            } else {

                //@ Instantiate the neede placeholders
                var cnt = 0;

                //@ Loop through the Array searching for the value
                for (var v in arrayObject) {

                    //@ When a match is found
                    if (searchParam === arrayObject[v]) {

                        //@ Increment the number of occurences
                        cnt += 1;
                    }
                }

                //@ Return the 'number of occurences'
                return cnt;
            }

            //@ Object is not an array
        } else {

            app.notify("The object to perform an array count on is not an Array.", "danger");
        }
    };

    //@ POST HTTP DATA HANDLER  
    this.post = function (destination, data) {

        return $q(function (resolve, reject) {

            $http.post(destination, data).success(resolve).error(reject);
        });
    };

    //@ GET HTTP DATA HANDLER  
    this.get = function (destination, data) {

        return $q(function (resolve, reject) {

            $http.get(destination, {
                params: data
            }).success(resolve).error(reject);
        });
    };

    //@ PUT HTTP DATA HANDLER 
    this.put = function (destination, data) {

        return $q(function (resolve, reject) {

            $http.put(destination, data).success(resolve).error(reject);
        });
    };

    //@ DELETE HTTP DATA HANDLER 
    this.delete = function (destination, data) {

        return $q(function (resolve, reject) {

            $http.delete(destination, {
                params: data
            }).success(resolve).error(reject);
        });
    };

    //@ Handle background calls to the web server for database integration
    this.db = function (data, destination) {

        return $q(function (resolve, reject) {

            destination = destination ? destination : remoteAuth.url + '/db';
            $http.get(destination, {
                params: data
            }).success(resolve).error(reject);
        });
    };

    //@ Handle email sending requests
    this.mail = function (data, destination) {

        return $q(function (resolve, reject) {

            destination = destination ? destination : remoteAuth.url + '/mail';
            $http.post(destination, data).success(resolve).error(reject);
        });
    };

    //@ Handle The sending of welcome messages
    this.welcomeMail = function (data, destination) {
        return $q(function (resolve, reject) {
            destination = destination ? destination : '/welcome';
            $http.post(destination, data).success(resolve).error(reject);
        });
    };

    //@ Generic Process Event Handler
    this.handler = function (response) {

        response = response.response ? response : response.data;

        if (response.response == 200) {
            app.alert("<font color=green>Done</font>", app.str(response.data.message));
        } else {
            app.alert('<font color=red>Uh Oh!</font> ( ' + response.response + ' Error )', app.str(response.data.message));
        }
    };

    //@ Generic Error Handler
    this.errorHandler = function (response) {

        response = response.response ? response : response.data;

        app.alert('<font color=red>Uh Oh!</font>', app.str(response.data.message));
    };
    this.error_handler = this.errorHandler;
    this.e_handler = this.errorHandler;

    //@ Generic Process Remote Event Handler
    this.remote_handler = function (response) {

        app.alert("<font color=blue>Data Response</font>", app.str(app.str(response)));
    };
    this.remoteHandler = this.remote_handler;

    //@ SMS FIGURE COUNTER
    this.countSMS = function (data) {
        return Math.ceil(data.length / 160) == 0 ? 1 : Math.ceil(data.length / 160);
    };
}])

//@ The BASIC sms sending application service
.service("sms", ['app', 'remoteAuth', '$q', function (app, remoteAuth, $q) {
    var _this = this;

    /**
     * This angular service allows for you to easily send SMS messages conveniently using bixbyte's default SMS gateway platform
     * 
     * It allows the use of your *Framify SMS* android phone application to send simple SMS messages. 
     * 
     * You can easily extend it as you will since the socket connection to the server can be hooked to as "sms.socket"
     */

    //@ SMS BASIC APPLICATION INITIALIZATION

    //@ Create a locally accessible copy of the 'sms' service
    var sms = this;

    //@ Definition of the socket object
    this.socket;
    var socket = this.socket;

    //@ The socket connection initiator object
    this.start = function (framify_sms_server_url) {

        socket = io.connect(framify_sms_server_url || remoteAuth.url);

        socket.on("connect", function () {
            // console.log("Successfully established a connection to the framify SMS gateway");
        });

        socket.on("disconnect", function () {
            // console.log("Dropped the framify SMS gateway connection.")
        });

        socket.on("reconnect", function () {
            // console.log("Re-established a connection to the SMS gateway.")
        });

        return $q.resolve(app.make_response(200, "Starting the SMS gateway")).catch(function (e) {
            // console.log("There was a problem when starting the SMS relay service.")
            // console.dir(e)
        });
    };

    this.stop = function () {

        //@ Disconnect any existing conections
        if (socket) {

            socket.disconnect();
            // console.log("Terminated all existing SMS gateway connections.");
        }

        //@ Nullify the existing object
        socket = undefined;

        return $q.resolve(app.make_response(200, "Stoping the SMS gateway")).catch(function (e) {
            // console.log("There was a problem when starting the SMS relay service")
            // console.dir(e)
        });
    };

    //@ SEND EXPRESS SMS'
    this.SMS = function (smsData) {

        //@ Ensure that the SMS service provision gateway is set
        if (socket) {

            socket.emit("sendSMS", smsData);
            return $q.resolve(true).catch(function (e) {
                // console.log("Encountered an error when processing the sms function.")
                // console.dir(e)
            });

            //@ Ask the user to initialize the sms service
        } else {

            app.alert("<font  color=red>SMS SERVICE NOT STARTED</font>", "Framify failed to execute an SMS related command.<br>Reason: <code>The SMS service provider has not been defined.</code>");
            return $q.reject(false).catch(function (e) {
                // console.log("Encountered an error when processing the sms function.")
                // console.dir(e)
            });
        }
    };

    //@ SEND A SINGLE SMS
    this.oneSMS = function (tel, mess, apiKey) {

        //@ Ensure that the SMS service provision gateway is set
        if (socket) {

            var obj;
            if (Array.isArray(tel)) {
                obj = tel;
            } else {
                obj = {
                    telephone: tel,
                    message: mess,
                    password: apiKey
                };
            }

            socket.emit("sendSMS", obj);
            return $q.resolve(app.make_response(200, "Queued the SMS for sending")).catch(function (e) {
                // console.log("Encountered an error when processing the sendsms function.")
                // console.dir(e)
            });

            //@ Ask the user to initialize the sms service
        } else {

            app.alert("<font  color=red>SMS SERVICE NOT STARTED</font>", "Framify failed to execute an SMS related command.<br>Reason: <code>The SMS service provider has not been defined.</code>");
            return $q.reject(false).catch(function (e) {
                // console.log("Encountered an error when processing the sms function.")
                // console.dir(e)
            });
        }
    };

    //@ SEND BULK SMS MESSAGES
    this.bulkSMS = function (contacts, data, apiKey) {

        return $q(function (resolve, reject) {

            //@ Ensure that the SMS service provision gateway is set
            if (socket) {
                (function () {

                    var obj = [];

                    //* Ensure that the API key has been set
                    if (!apiKey) {
                        app.alert("<font style='weight:bold;color:red;'>ERROR</font>", '<center>Failed to instantiate the SMS sending service before api Key definition.</center>');
                    } else if (Array.isArray(contacts)) {

                        //* handle an array of contacts
                        contacts.forEach(function (element) {

                            if (app.isTelephone(element)) {

                                obj.push({
                                    telephone: element,
                                    message: data,
                                    apiKey: apiKey
                                });
                            } else {

                                app.notify('<center>Could not send an SMS message to the invalid number ' + element + '.</center>', 'danger');
                            }
                        }, _this);

                        socket.emit("sendSMS", obj);
                        resolve(app.make_response(200, "Queued the messages for sending."));
                    } else {
                        app.notify('<font style="weight:bold;color:white;">Bulk SMS error.</font><br><center>You can only use the bulk SMS service with an array of telephone contacts</center>', 'danger');
                    }

                    //@ Ask the user to initialize the sms service
                })();
            } else {

                app.alert("<font  color=red>SMS SERVICE NOT STARTED</font>", "Framify failed to execute an SMS related command.<br>Reason: <code>The SMS service provider has not been defined.</code>");
                reject(app.make_response(500, "The SMS service is not started."));
            }
        });
    };

    // //@ SAMPLE SUCCESSFUL SMS SENDING INFORMATION HANDLER
    // this.socket.on("trueSMS", (data) => {
    //     $scope.app.notify("The message has been conveyed.");
    // });
}])

//@ The basic incomplete networking service
.service("cgi", [function () {

    //Handle background calls to the web server for database integration
    this.ajax = function (data) {
        return $.ajax({
            method: "GET",
            url: "/db",
            data: data
        });
    };

    //Handle the posting of emails via the mailgun api
    this.mail = function (data) {
        return $.ajax({
            method: "POST",
            url: "/mail",
            data: data
        });
    };

    //@ Handle The sending of welcome messages
    this.welcomeMail = function (data, destination) {
        return $q(function (resolve, reject) {
            destination = destination ? destination : '/welcome';
            $http.post(destination, data).success(resolve).error(reject);
        });
    };
}])

//@@ The Authentication service
.service('auth', ['$http', '$localStorage', '$q', function ($http, $localStorage, $q) {

    var auth = this;

    auth.SetAuth = function (AuthToken) {

        return $q(function (resolve, reject) {

            resolve($http.defaults.headers.common.Authorization = AuthToken || $localStorage.framify_user ? $localStorage.framify_user.token : undefined);
        });
    };
    auth.set_auth = auth.SetAuth;

    //@ Perform User Registration
    auth.Register = function (credentials) {

        return $q(function (resolve, reject) {

            $http.post('/auth/register', credentials).success(function (response) {

                if (response.response == 200) {

                    resolve(response.data.message);
                } else {

                    reject(response.data.message);
                }
            }).error(function (response) {
                reject(JSON.stringify((response ? response.data ? response.data.message : response : response) || "Could not obtain a response from the server."));
            });
        });
    };
    auth.register = auth.Register;

    //@ Perform a User Login
    auth.Login = function (credentials) {

        return $q(function (resolve, reject) {

            $http.post('/auth/verify', credentials).success(function (response) {

                if (response.response == 200) {

                    $localStorage.framify_user = response.data.message;

                    auth.SetAuth(response.data.message.token);

                    resolve(response.data.message);
                } else {

                    reject(response.data.message);
                }
            }).error(function (response) {
                reject(JSON.stringify((response ? response.data ? response.data.message : response : response) || "Could not obtain a response from the server."));
            });
        });
    };
    auth.login = auth.Login;

    //@ Perform A User Logout
    auth.Logout = function () {

        return $q(function (resolve, reject) {

            delete $localStorage.framify_user;
            auth.SetAuth(undefined).then(resolve);
        });
    };
    auth.logout = auth.Logout;
}])

//@@ The Remote authentication service
//@@ The Authentication service ChartJsProvider.service('auth'
.service('remoteAuth', ['$http', '$localStorage', '$q', function ($http, $localStorage, $q) {

    var r_auth = this;

    r_auth.url = 'http://bixbyte.io';

    r_auth.setUrl = function (accessUrl) {

        return $q(function (resolve, reject) {

            r_auth.url = accessUrl;
            // console.log(`The remote access url has been set to ${accessUrl}` );
            resolve(accessUrl);
        });
    };
    r_auth.set_url = r_auth.setUrl;

    r_auth.SetAuth = function (AuthToken) {

        return $q(function (resolve, reject) {

            resolve($http.defaults.headers.common.Authorization = AuthToken || $localStorage.framify_user ? $localStorage.framify_user.token : undefined);
        });
    };
    r_auth.set_auth = r_auth.SetAuth;

    //@ Perform User Registration
    r_auth.Register = function (credentials) {

        return $q(function (resolve, reject) {

            $http.post(r_auth.url + '/auth/register', credentials).success(function (response) {

                if (response.response == 200) {

                    resolve(response.data.message);
                } else {

                    reject(response.data.message);
                }
            }).error(function (response) {
                reject(JSON.stringify((response ? response.data ? response.data.message : response : response) || "Could not obtain a response from the server."));
            });
        });
    };
    r_auth.register = r_auth.Register;

    //@ Perform a User Login
    r_auth.Login = function (credentials) {

        return $q(function (resolve, reject) {

            $http.post(r_auth.url + '/auth/verify', credentials).success(function (response) {

                if (response.response == 200) {

                    $localStorage.framify_user = response.data.message;

                    r_auth.SetAuth(response.data.message.token);

                    resolve(response.data.message);
                } else {

                    reject(response.data.message);
                }
            }).error(function (response) {
                reject(JSON.stringify((response ? response.data ? response.data.message : response : response) || "Could not obtain a response from the server."));
            });
        });
    };
    r_auth.login = r_auth.Login;

    //@ Perform A User Logout
    r_auth.Logout = function () {

        return $q(function (resolve, reject) {

            delete $localStorage.framify_user;
            r_auth.SetAuth(undefined).then(resolve);
        });
    };
    r_auth.logout = r_auth.Logout;
}])

//@ The infobip SMS integration module
.service("iSMS", ['$http', '$q', 'app', function ($http, $q, app) {

    var me = this;

    me.provider = '/sms';

    me.setProvider = function (providerURL) {

        me.provider = providerURL.toString().includes('/sms') ? providerURL : providerURL + '/sms';
        // console.log(`All SMS requests via the i service will now be routed to ${me.provider}`);
    };

    me.one = function (data) {

        return $q(function (resolve, reject) {

            $http.post(me.provider + '/one', data).success(function (response) {

                if (response.response == 200) {

                    resolve(response);
                } else {

                    reject(response);
                }
            }).error(function (response) {
                reject(app.make_response(500, JSON.stringify((response ? response.data ? response.data.message : response : response) || "Could not obtain a response from the server.")));
            });
        });
    };

    me.many = function (data) {

        return $q(function (resolve, reject) {

            $http.post(me.provider + '/many', data).success(function (response) {

                if (response.response == 200) {

                    resolve(response);
                } else {

                    reject(response);
                }
            }).error(function (response) {
                reject(app.make_response(500, JSON.stringify((response ? response.data ? response.data.message : response : response) || "Could not obtain a response from the server.")));
            });
        });
    };

    me.template = function (data) {

        return $q(function (resolve, reject) {

            $http.post(me.provider + '/template', data).success(function (response) {

                if (response.response == 200) {

                    resolve(response);
                } else {

                    reject(response);
                }
            }).error(function (response) {
                reject(app.make_response(500, JSON.stringify((response ? response.data ? response.data.message : response : response) || "Could not obtain a response from the server.")));
            });
        });
    };

    me.test = function (data) {

        return $q(function (resolve, reject) {

            $http.post('' + me.provider, data).success(function (response) {

                if (response.response == 200) {

                    resolve(response);
                } else {

                    reject(response);
                }
            }).error(function (response) {
                reject(app.make_response(500, JSON.stringify((response ? response.data ? response.data.message : response : response) || "Could not obtain a response from the server.")));
            });
        });
    };

    me.echo = function (data) {

        return $q(function (resolve, reject) {

            $http.post(me.provider + '/echo', data).success(function (response) {

                if (response.response == 200) {

                    app.alert("<font color=green>SMS ECHO</font>", app.str(response.data.message));
                    resolve(response);
                } else {

                    reject(response);
                }
            }).error(function (response) {
                reject(app.make_response(500, JSON.stringify((response ? response.data ? response.data.message : response : response) || "Could not obtain a response from the server.")));
            });
        });
    };

    me.handler = function (responseData) {

        return $q(function (resolve, reject) {

            var resp = responseData.response ? app.clone(responseData) : app.clone(responseData.data);

            if (responseData.response == 200) {
                app.alert("<font color=green>SMS RESPONSE</font>", "The SMS messages have been queued for sending ");
                resolve(resp);
            } else {
                app.alert('<font color=red>Uh Oh!</font> ( ' + responseData.response + ' Error )', app.str(responseData.data.message));
                reject(resp);
            }
        });
    };

    return me;
}]).run(["app", "cgi", "$rootScope", "$state", "$localStorage", "sms", "auth", "remoteAuth", "$http", "iSMS", function (app, cgi, $rootScope, $state, $localStorage, sms, auth, remoteAuth, $http, iSMS) {

    // $rootScope.$on('$viewContentLoaded', function() {
    //     $templateCache.removeAll();
    // });


    //! INJECT THE LOCATION SOURCE TO THE ROOT SCOPE
    $rootScope.location = $state;

    //! INJECT THE $localStorage instance into the root scope
    $rootScope.storage = $localStorage;

    //! INJECT THE APPLICATION'S MAIN SERVICE TO THE ROOT SCOPE SUCH THAT ALL SCOPES MAY INHERIT IT
    $rootScope.app = app;

    //! INJECT THE APP BASICS SERVICE
    $rootScope.cgi = cgi;

    //! SIMPLE APPLICATION BEHAVIOR SETUP
    $rootScope.frame = {};

    //#! INJECT THE SMS INSTANCE INTO THE MAIN SCOPE
    $rootScope.sms = sms;

    //@ INJECT THE infobip SMS sender into the root scope
    $rootScope.iSMS = iSMS;

    //@ INJECT THE AUTHENTICATION SERVICE
    $rootScope.auth = auth;
    $rootScope.remoteAuth = remoteAuth;

    //! IDENTIFY THE CURRENT PATH
    $rootScope.frame.path = function () {
        return $state.absUrl().split("/#/")[0] + "/#/" + $state.absUrl().split("/#/")[1].split("#")[0];
    };
    //p.split("/#/")[0]+"/#/"+p.split("/#/")[1].split("#")[0]


    //! RELOCATION HANDLING
    $rootScope.frame.relocate = function (loc) {
        // console.log(`Relocating to: #${loc}`)
        $rootScope.location.go(loc);
    };

    //! RESET THE ADMIN STATUS
    $rootScope.frame.reset = function () {
        delete $rootScope.storage.admin;
        delete $rootScope.storage.user;
        $rootScope.storage.admin = {};
        $rootScope.storage.user = {};
        $rootScope.frame.changeAdmin(false);
        window.location = "/#/";
    };

    $rootScope.permissions = {

        //@ ALLOW ONLY ADMIN USERS
        admin_only: function admin_only(user) {
            return user.role ? user.role == 'admin' ? true : false : false;
        },

        //@! FROM MATCHING ORGANIZATIONS
        admin_only_org: function admin_only_org(user, item_org) {
            return user.role ? user.role == 'admin' && user.organization == item_org ? true : false : false;
        },

        //@ ALLOW ONLY CLIENT USERS
        client_only: function client_only(user) {
            return user.role ? user.role == 'client' ? true : false : false;
        },

        //@! FROM MATCHING ORGANIZATIONS
        client_only_org: function client_only_org(user, item_org) {
            return user.role ? user.role == 'client' && user.organization == item_org ? true : false : false;
        },

        //@ ALLOW ONLY AUDIT USERS
        audit_only: function audit_only(user) {
            return user.role ? user.role == 'audit' ? true : false : false;
        },

        //@! FROM MATCHING ORGANIZATIONS        
        audit_only_org: function audit_only_org(user, item_org) {
            return user.role ? user.role == 'audit' && user.organization == item_org ? true : false : false;
        },

        //@ ALLOW BOTH ADMIN AND CLIENT USERS
        admin_client: function admin_client(user) {
            return user.role ? user.role == 'admin' || user.role == 'client' ? true : false : false;
        },

        //@! FROM MATCHING ORGANIZATIONS
        admin_client_org: function admin_client_org(user, item_org) {
            return user.role ? (user.role == 'admin' || user.role == 'client') && user.organization == item_org ? true : false : false;
        },

        //@! FROM MATCHING ORGANIZATIONS WITH ADMIN EXEMPT
        any_admin_client_org: function any_admin_client_org(user, item_org) {

            return user.role ? user.role == 'audit' ? false : user.role == 'admin' ? true : user.organization == item_org ? true : false : false;
        },

        //@ ALLOW ALL USERS 
        any: function any(user) {
            return true;
        },

        //@! FROM MATCHING ORGANIZATIONS
        any_org: function any_org(user, item_org) {
            return user.organization == item_org ? true : false;
        },

        //@! EXCLUDE ADMINS FROM SCRUTINY
        any_admin_other_org: function any_admin_other_org(user, item_org) {
            return user.role == 'admin' ? true : user.organization == item_org ? true : false;
        }

    };

    //@ SET THE DEFAULT HTTP AUTHORIZATION HEADERS WHERE NEED BE
    if ($localStorage.framify_user) {
        $http.defaults.headers.common.Authorization = $localStorage.framify_user.token;
    }
}])

//@ The main controller
.controller("framifyController", ['$scope', '$state', '$rootScope', '$http', '$q', function ($scope, $state, $rootScope, $http, $q) {

    //!APPLICATION GLOBAL SCOPE COMPONENTS
    $scope.current = {};
    $scope.ui = {};

    // $scope.urlParams = $stateParams;

    $rootScope.nav = [];
    $rootScope.nav.search;
    $rootScope.links = [];

    $scope.nav.hasFilters = false;

    //** MANAGE THE NAVIGATION SEARCH STATUS
    $scope.openFilters = function (hasFilters) {
        if (hasFilters === true) {
            $scope.nav.hasFilters = false;
        } else {
            $scope.nav.hasFilters = true;
        }
    };

    //!RE-INITIALIZE APPLICATION DATA
    $rootScope.app.reinit = function () {
        $scope.location.path("/");
    };

    //@ FUNCTION EXECUTOR
    $rootScope.exec = function (f) {
        return f();
    };

    //@ VARIABLE SETTER
    $rootScope.setVar = function (obj, keys, v) {

        if (keys.length === 1) {
            obj[keys[0]] = v;
        } else {
            var key = keys.shift();
            obj[key] = $rootScope.setVar(typeof obj[key] === 'undefined' ? {} : obj[key], keys, v);
        }

        return obj;
    };
    $rootScope.set_var = $rootScope.setVar;

    /**
     * SECURE THE PARENTAL CONTROLLED URLS
     */
    $rootScope.secure = function (securityFunc) {

        var parts = window.location.href.split('/');

        var part = parts[parts.length - 1];

        if ($scope.links.indexOf(part) >= 0) {

            $rootScope.exec(securityFunc);
        }
    };

    /**
     * DATABASE CENTRIC ADDITION AND DELETION
     */

    //Define the main application objects
    $scope.add = {};
    $scope.fetch = {};
    $scope.fetched = {};
    $scope.counted = {};
    $scope.data = {};

    $scope.data.login = {};
    $scope.data.admin = {};

    $rootScope.frame.changeAdmin(false);
    $scope.logedin = false;

    //@ Redirect to a given sub-state in the pre-defined 'app' main state
    $scope.appRedirect = function (partialState) {
        $state.go("app." + partialState);
    };
    $scope.app_redirect = $scope.appRedirect;

    //@ Redirect to the specified state
    $scope.goTo = function (completeState) {
        $state.go(completeState);
    };
    $scope.go_to = $scope.goTo;

    //@ UNWANTED ANGULAR JS OBJECTS
    $scope.unwanted = ["$$hashKey", "$index"];

    $scope.removeUnwanted = function (insertObj) {
        Object.keys(insertObj).forEach(function (insertKey) {
            if ($scope.unwanted.indexOf(insertKey) != -1) {
                insertObj[insertKey] = undefined;
                delete insertObj[insertKey];
            }
        });
        return insertObj;
    };
    $scope.remove_unwanted = $scope.removeUnwanted;

    //! BASIC ADDITION
    $scope.add = function (table, data, cryptFields, cb) {

        return $q(function (resolve, reject) {

            //* populate the data object 
            data = data ? $scope.app.json(data) : {};
            data.command = "add";
            data.table = table != undefined ? table.toString().replace(/vw_/ig, '') : "";
            data.token = data.token || $scope.storage.admin._;
            data.extras = data ? data.extras ? data.extras.replace(/LIMIT 1/ig, '') : undefined : undefined;

            //* Encrypt the specified cryptFields
            if (cryptFields) {
                cryptFields.split(",").forEach(function (cryptField) {
                    if (data[cryptField]) {
                        data[cryptField] = $scope.app.md5(data[cryptField]);
                    }
                });
            }

            //* Perform the actual addition
            $scope.app.db($scope.removeUnwanted(data)).then(function (r) {

                r = $scope.app.json(r);

                if (r.response == 200) {

                    $scope.app.notify('<center> ' + r.data.message + '</center>', "success");

                    $scope.fetch(table, { specifics: data.specifics });

                    $scope.data[table.toString().replace(/vw_/ig, '')] = {};

                    if (cb && typeof cb == "function") {
                        resolve(cb(r, data));
                    } else {
                        resolve(true);
                    }
                } else {

                    // POSTGRESQL ERROR FORMAT MATCHING
                    if (Array.isArray(r.data.message)) {

                        var v = r.data.message[2].match(/DETAIL:(.*)/);

                        if (v != undefined || v != null) {
                            r.data.message = v[1];
                        } else {
                            r.data.message = r.data.message[2];
                        }
                    }

                    $scope.app.notify('<center>' + r.data.message + '</center>', 'danger');
                    reject($scope.app.makeResponse(500, v[1]));
                }

                //$scope.$apply();
            });
        });
    };

    //! BASIC UPDATING
    $scope.update = function (table, data, cryptFields, cb) {

        return $q(function (resolve, reject) {

            //* pack the relevant info into the data object
            data = data ? $scope.app.json(data) : {};
            data.command = "update";
            data.table = table != undefined ? table.toString().replace(/vw_/ig, '') : "";
            data.token = data.token || $scope.storage.admin._;
            data.extras = data ? data.extras ? data.extras.replace(/LIMIT 1/ig, '') : undefined : undefined;

            //* Encrypt the specified cryptFields
            if (cryptFields) {
                cryptFields.split(",").forEach(function (cryptField) {
                    if (data[cryptField]) {
                        data[cryptField] = $scope.app.md5(data[cryptField]);
                    }
                });
            }

            //* perform the actual update
            $scope.app.db($scope.removeUnwanted(data)).then(function (r) {

                r = $scope.app.json(r);

                if (r.response == 200) {

                    $scope.app.notify('<center> ' + r.data.message + '</center>', "success");

                    $scope.fetch(table, { specifics: data.specifics });

                    $scope.data[table.toString().replace(/vw_/ig, '')] = {};

                    //$scope.$apply();

                    if (typeof cb == 'function') {
                        resolve(cb(r));
                    } else {
                        resolve(true);
                    }
                } else {

                    // POSTGRESQL ERROR FORMAT MATCHING
                    if (Array.isArray(r.data.message)) {

                        var v = r.data.message[2].match(/DETAIL:(.*)/);

                        if (v != undefined || v != null) {
                            r.data.message = v[1];
                        } else {
                            r.data.message = r.data.message[2];
                        }
                    }

                    $scope.app.notify('<center>' + r.data.message + '</center>', "danger");
                    reject($scope.app.makeResponse(500, r.data.message));
                }
            });
        });
    };

    //! BASIC DATA FETCHING
    var do_fetch = function do_fetch(table, data, cryptFields) {

        return $q(function (resolve, reject) {

            //* populate the "data" object
            data = data ? $scope.app.json(data) : {};
            data.command = "get";
            data.table = table;

            // console.log("\nprocessing the fetching of table " + table + "\n")

            //* Encrypt the specified cryptFields
            if (cryptFields) {
                cryptFields.split(",").forEach(function (cryptField) {
                    if (data[cryptField]) {
                        data[cryptField] = $scope.app.md5(data[cryptField]);
                    }
                });
            }

            //* perform the actual data fetching
            $scope.app.db($scope.removeUnwanted(data)).then(function (r) {

                r = $scope.app.json(r);

                if (r.response == 200) {
                    //.replace(/vw_/ig, '')
                    $scope.fetched[table.toString()] = r.data.message;
                    $scope.$apply();
                    // $scope.app.doNothing()
                    // .then(e=>{
                    resolve(r);
                    // })

                } else {

                    // POSTGRESQL ERROR FORMAT MATCHING
                    if (Array.isArray(r.data.message)) {

                        var v = r.data.message[2].match(/DETAIL:(.*)/);

                        if (v != undefined || v != null) {
                            r.data.message = v[1];
                        } else {
                            r.data.message = r.data.message[2];
                        }
                    }
                    $scope.app.notify('<center>' + r.data.message + '</center>', "danger");
                    reject($scope.app.makeResponse(500, r.data.message));
                }
            });
        });
    };

    $scope.fetch = function (table, data, cryptFields, cb) {

        if (Array.isArray(table)) {
            var _ret2 = function () {

                var promiseArr = new Array();

                table.filter(function (e) {
                    return typeof e[0] != 'undefined';
                }).forEach(function (tData, tkey) {
                    promiseArr.push(do_fetch(tData[0], tData[1] || {}), cryptFields);
                });

                promiseArr = promiseArr.filter(function (e) {
                    return typeof e != 'undefined';
                });

                return {
                    v: $q.all(promiseArr)
                };
            }();

            if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
        } else {
            return $q.resolve(do_fetch(table, data, cryptFields)).catch(function (e) {
                // console.log("Encountered an error when processing the fetch function.")
                // console.dir(e)
            });
        }
    };

    //! BASIC DELETION  
    $scope.del = function (table, data, cryptFields, cb) {

        return $q(function (reject, resolve) {

            //* populate the data object
            data = data ? $scope.app.json(data) : {};
            data.command = "del";
            data.table = table != undefined ? table.toString().replace(/vw_/ig, '') : "";
            data.token = data.token || $scope.storage.admin._;

            //* Encrypt the specified cryptFields
            if (cryptFields) {
                cryptFields.split(",").forEach(function (cryptField) {
                    if (data[cryptField]) {
                        data[cryptField] = $scope.app.md5(data[cryptField]);
                    }
                });
            }

            $scope.app.db($scope.removeUnwanted(data)).then(function (r) {

                r = $scope.app.json(r);

                if (r.response == 200) {
                    // // $scope.fetched[table.toString().replace(/vw_/ig, '')].splice(delID, 1);
                    $scope.app.notify('<center>' + r.data.message + '</center>', "success");
                    $scope.fetch(table);
                    resolve(r);
                } else {

                    // POSTGRESQL ERROR FORMAT MATCHING
                    if (Array.isArray(r.data.message)) {

                        var v = r.data.message[2].match(/DETAIL:(.*)/);

                        if (v != undefined || v != null) {
                            r.data.message = v[1];
                        } else {
                            r.data.message = r.data.message[2];
                        }
                    }
                    $scope.app.notify('<center>' + r.data.message + '</center>', "danger");
                    reject($scope.app.makeResponse(500, r.data.message));
                }
                //$scope.$apply();
            });
        });
    };

    //@ Handle basic application redirection
    $scope.redirect = function (loc) {
        if (loc) {
            window.location = loc;
        } else {
            window.location = "/#/framify";
        }
        return $q.resolve(true).catch(function (e) {
            // console.log("Encountered an error when processing the redirect function.")
            // console.dir(e)
        });
    };

    // BASIC Custom Queries
    $scope.custom = function (table, data, cryptFields, cb) {

        return $q(function (resolve, reject) {

            //* initialize the data object
            data = data ? $scope.app.json(data) : {};
            data.command = "custom";
            data.token = data.token || $scope.storage.admin._;

            //* Encrypt the specified cryptFields
            if (cryptFields) {
                cryptFields.split(",").forEach(function (cryptField) {
                    if (data[cryptField]) {
                        data[cryptField] = $scope.app.md5(data[cryptField]);
                    }
                });
            }

            //* Perform the actual custom query
            $scope.app.db($scope.removeUnwanted(data)).then(function (r) {

                r = $scope.app.json(r);

                if (r.response == 200) {

                    $scope.app.notify('<center>' + (r.data.message || 'Successful') + '</center>', "success");

                    //.replace(/vw_/ig, '')
                    $scope.cFetched[table.toString()] = r.data.message;
                    $scope.data[table.toString().replace(/vw_/ig, '')] = {};
                    $scope.$apply();

                    resolve(r);
                } else {

                    // POSTGRESQL ERROR FORMAT MATCHING
                    if (Array.isArray(r.data.message)) {

                        var v = r.data.message[2].match(/DETAIL:(.*)/);
                        if (v != undefined || v != null) {
                            r.data.message = v[1];
                        } else {
                            r.data.message = r.data.message[2];
                        }
                    }
                    $scope.app.notify('<center>' + r.data.message + '</center>');
                    reject($scope.app.makeResponse(500, r.data.message));
                }
                //$scope.$apply();
            });
        });
    };

    //BASIC DATABASE INSTANCEOF COUNTER
    $scope.count = function (table, data, cryptFields, cb) {

        return $q(function (resolve, reject) {

            // if (Array.isArray(table)) {

            //     let promiseArr = new Array();

            //     table
            //     .filter(e=>typeof(e[0])!='undefined' )
            //     .forEach( (tData ,tkey) => {
            //         promiseArr.push( do_fetch(tData[0] ,(tData[1] || {}) ) ,cryptFields)
            //     });

            //     promiseArr = promiseArr.filter(e=>typeof(e)!='undefined');

            //     return $q.all( promiseArr );

            // }

            data = data ? $scope.app.json(data) : {};
            data.table = table;
            data.command = "count";
            data.token = data.token || {};

            //* Encrypt the specified cryptFields
            if (cryptFields) {
                cryptFields.split(",").forEach(function (cryptField) {
                    if (data[cryptField]) {
                        data[cryptField] = $scope.app.md5(data[cryptField]);
                    }
                });
            }

            //* perform the actual count
            $scope.app.db($scope.removeUnwanted(data)).then(function (r) {

                r = $scope.app.json(r);

                if (r.response == 200) {

                    $scope.counted[table.toString().replace(/vw_/ig, '')] = r.data.message;
                    $scope.data[table.toString().replace(/vw_/ig, '')] = {};

                    //$scope.$apply();

                    resolve(r);
                } else {

                    // POSTGRESQL ERROR FORMAT MATCHING
                    if (Array.isArray(r.data.message)) {
                        var v = r.data.message[2].match(/DETAIL:(.*)/);
                        if (v != undefined || v != null) {
                            r.data.message = v[1];
                        } else {
                            r.data.message = r.data.message[2];
                        }
                    }
                    $scope.app.notify('<center>' + r.data.message + '</center>', 'danger');
                    reject($scope.app.makeResponse(500, r.data.message));
                }
                //$scope.$apply();
            });
        });
    };

    /**
     * TABLE SORTER
     */
    $scope.sort = function (keyname) {
        $scope.sortKey = keyname; //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    };

    /**
     *  DELETE UNWANTED FIELDS
     */
    $scope.sanitize = function (data, keys) {
        if (keys) {
            keys.split(",").forEach(function (key) {
                delete data[key];
            });
            return $q.resolve(data).catch(function (e) {
                // console.log("Encountered an error when processing the sanitize function.")
                // console.dir(e)
            });
        }
    };

    /**
     * PUSH DATA TO OBJECT
     */
    $scope.dPush = function (obj, key, val) {
        obj[key] = val;
        return obj;
    };
    $scope.d_push = $scope.dPush;

    $scope.dPushify = function (obj, key, val) {
        return $q.resolve($scope.dPush(obj, key, val));
    };
    $scope.d_pushify = $scope.dPushify;

    /**
     * @ MONTH REGULATION
     */
    $scope.currmoin = $scope.app.monthNum();
    $scope.setMoin = function (moin) {
        $scope.currmoin = moin;
    };
    $scope.set_moin = $scope.setMoin;

    //@ DELETE UNWANTED PARAMETERS
    $scope.delParams = function (mainObj, removeKeys) {
        // $scope.app.clone
        mainObj = mainObj || {};
        removeKeys = removeKeys ? removeKeys.split(',') : [];

        removeKeys.forEach(function (e) {
            mainObj[e] = null;
            delete mainObj[e];
        });

        return mainObj;
    };
    $scope.del_params = $scope.delParams;

    //@ INJECT A STANDARD WHERE "Extras" OBJECT
    // addExtras(data.my_services,{username: storage.user.username},'username:WHERE owner','password,name,email,telephone,account_number,entity,active'),' ' )
    $scope.addExtras = function (targetObj, extrasObj, subStrings, removeKeys) {

        return $q(function (resolve, reject) {

            targetObj = targetObj || {};
            extrasObj = extrasObj || {};
            subStrings = subStrings || '';
            removeKeys = removeKeys || '';

            var extras = '';

            var k = [],
                v = [];

            //@ CAPTURE THE REMOVE KEYS
            removeKeys = removeKeys.split(',').filter(function (e) {
                return e;
            });

            removeKeys.forEach(function (e) {
                extrasObj[e] = null;
                delete extrasObj[e];
            });

            //@ CAPTURE REPLACE STRINGS
            subStrings.split(',').forEach(function (e, i) {
                var x = e.split(':');
                k[i] = x[0];
                v[i] = x[1];
            });

            //@ GET THE DEFINED KEYS
            var keys = Object.keys(extrasObj);

            //@ REPLACE THE DEFINED WITH THE DESIRED REPLACE KEYS
            k.forEach(function (e, i) {

                if (keys.indexOf(e) != -1) {

                    extrasObj[v[i]] = extrasObj[e];
                    extrasObj[e] = null;
                    delete extrasObj[e];
                }
            });

            k = Object.keys(extrasObj);
            v = null;

            k.forEach(function (e, i) {

                var fg = !isNaN(extrasObj[e]) ? parseInt(extrasObj[e]) : "'" + extrasObj[e] + "'";
                extras += ' ' + e + "=" + fg + " AND";
            });

            k = null;

            targetObj.extras = extras.replace(/AND+$/, '');

            resolve(targetObj);
        });
    };

    $scope.add_extras = function (targetObj, extrasObj, subStrings, removeKeys) {

        return $q(function (resolve, reject) {

            targetObj = targetObj || {};
            extrasObj = extrasObj || {};
            subStrings = subStrings || ['', ''];
            removeKeys = removeKeys || ['', ''];

            var target = '';
            var extras = '';

            var target_k = [],
                extras_k = [],
                target_v = [],
                extras_v = [];

            //@ Ensure that the substitution and removal parameters are arrays 
            if (!Array.isArray(subStrings) || !Array.isArray(removeKeys)) {
                reject('This Method only allows substitution and removal Arrays, <br> please consider using the <b><i>addExtras</i></b> object instead.');
            } else {

                //@ CAPTURE THE REMOVE KEYS
                var target_removeKeys = removeKeys[0].split(',').filter(function (e) {
                    return e;
                });
                var extras_removeKeys = removeKeys[1].split(',').filter(function (e) {
                    return e;
                });

                //@ Remove specified keys from the target object
                target_removeKeys.forEach(function (e) {
                    targetObj[e] = null;
                    delete targetObj[e];
                });

                //@ Remove specified keys from the extras object
                extras_removeKeys.forEach(function (e) {
                    extrasObj[e] = null;
                    delete extrasObj[e];
                });

                //@ CAPTURE REPLACE STRINGS
                var target_subStrings = subStrings[0].split(',');
                var extras_subStrings = subStrings[1].split(',');

                //@ Specify target key-value pairs
                target_subStrings.forEach(function (e, i) {
                    var x = e.split(':');
                    target_k[i] = x[0];
                    target_v[i] = x[1];
                });

                //@ Specify extras key-value pairs
                extras_subStrings.forEach(function (e, i) {
                    var x = e.split(':');
                    extras_k[i] = x[0];
                    extras_v[i] = x[1];
                });

                //@ GET THE DEFINED KEYS
                var extras_keys = Object.keys(extrasObj);
                var target_keys = Object.keys(targetObj);

                //@ TARGET - REPLACE THE DEFINED WITH THE DESIRED REPLACE KEYS
                target_k.forEach(function (e, i) {

                    if (target_keys.indexOf(e) != -1) {

                        // // console.log( `Renaming the target ${e} to ${target_v[i]}` )

                        targetObj[target_v[i]] = targetObj[e];
                        targetObj[e] = null;
                        delete targetObj[e];
                    }
                });

                //@ EXTRAS - REPLACE THE DEFINED WITH THE DESIRED REPLACE KEYS
                extras_k.forEach(function (e, i) {

                    if (extras_keys.indexOf(e) != -1) {

                        // // console.log( `Renaming the extras ${e} to ${extras_v[i]}` )

                        extrasObj[extras_v[i]] = extrasObj[e];
                        extrasObj[e] = null;
                        delete extrasObj[e];
                    }
                });

                //@ SQLify the extras object
                extras_k = null;

                extras_k = Object.keys(extrasObj);
                extras_v = null;

                extras_k.forEach(function (e, i) {

                    var fg = !isNaN(extrasObj[e]) ? parseInt(extrasObj[e]) : "'" + extrasObj[e] + "'";
                    extras += ' ' + e + "=" + fg + " AND";
                });

                extras_k = null;

                targetObj.extras = extras.replace(/AND+$/, '');

                resolve(targetObj);
            }
        });
    };

    ///////////////////////////////////////////////////////////////////////////////////////////////////
    // ADDITIONS ON PROBATION
    // ----

    //@ LOAD A SERVICE ONTO THE STAGE
    $scope.service = {};
    $scope.entity = {};

    $scope.showService = function (serviceData) {
        $scope.service.available = true;
        $scope.service.current = serviceData;
        //$scope.$apply();
    };

    $scope.showEntity = function (serviceData) {
        $scope.entity.available = true;
        $scope.entity.current = serviceData;
        //$scope.$apply();
    };

    //@ Count my entities
    $scope.howMany = function (table, data) {

        var data = data || { owner: $scope.storage.user.username };
        data = data ? $scope.app.json(data) : {};
        data.table = table || 'entities';
        data.command = "count";
        data.token = {};

        $scope.app.db($scope.removeUnwanted(data)).then(function (r) {

            r = $scope.app.json(r);

            if (r.response == 200) {

                if (r.data.message) {
                    $scope.app.notify(r.data.message, "success");
                }

                $scope.counted[data.table.toString().replace(/vw_/ig, '')] = r.data.message;
            } else {

                //POSTGRESQL MATCHING
                if (Array.isArray(r.data.message)) {
                    var v = r.data.message[2].match(/DETAIL:(.*)/);
                    if (v != undefined || v != null) {
                        r.data.message = v[1];
                    } else {
                        r.data.message = r.data.message[2];
                    }
                } else {
                    r.data.message;
                }

                alert('<center>' + r.data.message + '</center>');
            }
            //$scope.$apply();
        });
    };

    // ----

    //@ FRAMIFY HANDLERS

    $scope.data.login = $scope.data.login || {};

    $scope.data.me = $scope.data.me || {};

    $scope.setData;

    //@ Initialize the handlers object
    $scope.handlers = {};
    $scope.r_handlers = $scope.handlers;

    //@ The registration success handler
    $scope.handlers.regSuccess = function (message) {
        $scope.app.notify("You have been successfully registered");
        $state.go("app.login");
    };
    $scope.r_handlers.regSuccess = $scope.handlers.regSuccess;
    $scope.handlers.reg_success = $scope.handlers.regSuccess;
    $scope.r_handlers.reg_success = $scope.handlers.regSuccess;

    //@ The successful login handler
    $scope.handlers.loginSuccess = function (message) {
        $scope.app.notify("<i class='fa fa-2x fa-spin fa-circle-o-notch'></i> Processing your login data", 'success', 4000);
        $state.go("app.panel");
    };
    $scope.r_handlers.loginSuccess = $scope.handlers.loginSuccess;
    $scope.handlers.login_success = $scope.handlers.loginSuccess;
    $scope.r_handlers.login_success = $scope.handlers.loginSuccess;

    //@ The registration error handler
    $scope.handlers.regError = function (message) {
        $scope.app.alert("<font color='red'>Signup Error</font>", message);
    };
    $scope.r_handlers.regError = $scope.handlers.regError;
    $scope.handlers.reg_error = $scope.handlers.regError;
    $scope.r_handlers.reg_rror = $scope.handlers.regError;

    //@ The login error handler
    $scope.handlers.loginError = function (message) {
        $scope.app.alert("<font color='red'>Login Error</font>", message);
    };
    $scope.r_handlers.loginError = $scope.handlers.loginError;
    $scope.handlers.login_error = $scope.handlers.loginError;
    $scope.r_handlers.login_error = $scope.handlers.loginError;

    //@ The identity check verification handler
    $scope.handlers.identity = function () {

        return $q(function (reject, resolve) {

            $http.get("/auth/me").success(function (response) {

                resolve($scope.data.me = response.data.message);
            }).error(function (error) {

                $scope.auth.Logout().then(function () {
                    $scope.data.me = undefined;
                    $scope.app.notify("<i class='fa  fa-exclamation-triangle'></i>&nbsp;&nbsp;Your lease has expired <br>Please Login to continue.", 'danger');
                    reject($state.go("app.login"));
                });
            });
        });
    };

    $scope.r_handlers.identity = function () {

        return $q(function (reject, resolve) {

            // console.log("Querying the remote server for identity")

            $http.get($scope.remoteAuth.url + '/auth/me').success(function (response) {

                // console.log("Remote Knows who you are.")
                resolve($scope.data.me = response.data.message);
            }).error(function (error) {

                // console.log("Something just didn't go well.")
                $scope.auth.Logout().then(function () {
                    $scope.data.me = undefined;
                    $scope.app.notify("<i class='fa  fa-exclamation-triangle'></i>&nbsp;&nbsp;Your lease has expired <br>Please Login to continue.", 'danger');
                    reject($state.go("app.login"));
                });
            });
        });
    };

    //@ The login status check handler
    $scope.handlers.isLogedIn = function () {

        return $q(function (resolve, reject) {

            if (!$scope.storage.framify_user) {

                $scope.data.me = undefined;
                // console.log("\nNo localstorage value is defined\n")

                if ($state.current.name != "app.login") {

                    // console.log("\nRedirecting to the authentication page.\n")

                    $scope.app.notify("<i class='fa  fa-exclamation-triangle'></i>&nbsp;&nbsp;Please Login to continue.", 'danger');
                    reject($state.go("app.login"));
                }
            } else if (!$http.defaults.headers.common.Authorization || $http.defaults.headers.common.Authorization == undefined || $http.defaults.headers.common.Authorization == '') {

                // console.log("\nThe authentication header is not yet defined\n")

                $scope.auth.SetAuth(undefined).then(function () {

                    // console.log(`\nThe authentication header has been set to ${$http.defaults.headers.common.Authorization}\n`)

                    if ($state.current.name == "app.login") {
                        resolve($state.go("app.panel"));
                    } else {
                        resolve();
                    }
                });
            } else {

                // console.log("\nAll Looks good! Let me see if I can get you into the party\n")

                if ($state.current.name == "app.login") {
                    resolve($state.go("app.panel"));
                } else {
                    resolve();
                }
            }
        });
    };
    $scope.handlers.is_loged_in = $scope.handlers.isLogedIn;

    $scope.r_handlers.isLogedIn = function () {

        return $q(function (resolve, reject) {

            // console.log("Handing you over to the remote authentication server.")
            $scope.data.me = undefined;

            if (!$scope.storage.framify_user) {

                if ($state.current.name != "app.login") {

                    $scope.app.notify("<i class='fa  fa-exclamation-triangle'></i>&nbsp;&nbsp;Please Login to continue.", 'danger');
                    reject($state.go("app.login"));
                }
            } else if (!$http.defaults.headers.common.Authorization || $http.defaults.headers.common.Authorization == undefined || $http.defaults.headers.common.Authorization == '') {

                $scope.remoteAuth.SetAuth(undefined).then(function () {

                    if ($state.current.name == "app.login") {
                        resolve($state.go("app.panel"));
                    } else {
                        resolve();
                    }
                });
            } else {

                if ($state.current.name == "app.login") {
                    resolve($state.go("app.panel"));
                } else {
                    resolve();
                }
            }
        });
    };
    $scope.r_handlers.is_loged_in = $scope.r_handlers.isLogedIn;

    $scope.data.recovery = {};

    //@ The recovery attempt function
    $scope.recover_password = function (email) {

        $scope.data.recovery.response = "Loading ...";

        $http({
            method: "POST",
            url: "/passwords/forgot",
            data: {
                email: email
            }
        }).then(function (response) {
            $scope.data.recovery.response = response.data.data.message;
            $scope.app.alert('Password Recovery', response.data.data.message);
            $scope.data.recovery.email = "";
        });
    };

    $scope.isSignedUp = function (obj) {
        return $q(function (resolve, reject) {
            // if(obj.response == 200){

            // alert( $scope.data )

            $scope.cgi.welcomeMail({
                from: "Framify User Accounts <accounts@bixbyte.io>",
                to: $scope.signup.email,
                subject: "Welcome to our platform",
                data: { name: $scope.signup["name.first"], telephone: $scope.signup.telephone, username: $scope.signup["account.name"] }
            }).then(function (r) {

                $scope.app.alert("Welcome on board!", "<center style='font-size:1.4em;'>Thank you <font color='green'>" + $scope.signup['name.first'] + "</font>.<br><br> You are now successfully registered. </center>"); // window.location = "http://admin.infomed.co.ke";
                resolve(true);
            }).catch(function (e) {

                $scope.app.alert("Welcome on board!", "<center style='font-size:1.4em;'>Thank you <font color='green'>" + $scope.signup['name.first'] + "</font>.<br><br> You are now successfully registered. </center>");
                resolve(true);
            });

            // }else{   
            //     reject(obj)
            // }           
        });
    };
}]).directive("contenteditable", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function link(scope, element, attrs, ngModel) {

            function read() {
                ngModel.$setViewValue(element.html());
            }

            ngModel.$render = function () {
                element.html(ngModel.$viewValue || "");
            };

            element.bind("blur keyup change", function () {
                scope.$apply(read);
            });
        }
    };
}).directive('fileModel', ['$parse', function ($parse) {

    return {
        restrict: 'A',
        link: function link(scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;

            element.bind('change', function () {
                scope.$apply(function () {
                    if (attrs.multiple) {
                        modelSetter(scope, element[0].files);
                    } else {
                        modelSetter(scope, element[0].files[0]);
                    }
                });
            });
        }
    };
}])

// .directive('showTab',[ function () {
//     return {
//         link: function (scope, element, attrs) {
//             // console.dir(element);
//             element.on('click',function (e) {
//                 e.preventDefault();
//                 jQuery(element).tab('show');
//             });
//         }
//     };
// }])

//!CONFIGURE THE BNASIC PRE-RUNTIME STATES OF THE APPLICATION
.config(["ChartJsProvider", function (ChartJsProvider) {

    //@SET THE DEFAULT CHART COLORS

    ChartJsProvider.setOptions({ colors: ['#1976D2', '#000000', '#ff00ff', '#ffff00', '#00ff00', '#00ffff', '#4D5360'] });

    // ChartJsProvider.setOptions({ colors : [ "#4AB151",'#387EF5', '#FF0000', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
    // ChartJsProvider.setOptions({ colors : [ '#803690', '#00ADF9', '#DCDCDC', '#46BFBD', '#FDB45C', '#949FB1', '#4D5360'] });
}]);