(function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var a = typeof require == 'function' && require;
        if (!u && a)
          return a(o, !0);
        if (i)
          return i(o, !0);
        throw new Error('Cannot find module \'' + o + '\'');
      }
      var f = n[o] = { exports: {} };
      t[o][0].call(f.exports, function (e) {
        var n = t[o][1][e];
        return s(n ? n : e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = typeof require == 'function' && require;
  for (var o = 0; o < r.length; o++)
    s(r[o]);
  return s;
}({
  1: [
    function (require, module, exports) {
      //!CONFIGURE THE BNASIC PRE-RUNTIME STATES OF THE APPLICATION
      app.config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider.state('framify', {
          url: '/framify',
          templateUrl: 'views/1app.html'
        });
        //!THE DYNAMIC ROUTE SETTER
        var setRoutes = function (routeArray) {
          routeArray = routeArray || [];
          for (r in routeArray) {
            var rData = routeArray[r];
            $stateProvider.state(rData.path, {
              url: rData.url,
              templateUrl: rData.view
            });
          }
        };
        //!CAPTURE THE DEFINED JSON ROUTES
        $.getJSON('config/app-routes.json', function (response) {
          setRoutes(response);
        });
        //!REDIRECT APP TO THE ROOT ROUTE
        $urlRouterProvider.otherwise('/framify');
      });
      //!DEFINE THE APPLICATION RUNTIME DEFAULTS
      app.run(function (app, $rootScope, $location) {
        //!INJECT THE LOCATION SOURCE TO THE ROOT SCOPE
        $rootScope.location = $location;
        //!INJECT THE APPLICATION'S MAIN SERVICE TO THE ROOT SCOPE SUCH THAT ALL SCOPES MAY INHERIT IT
        $rootScope.app = app;
      });
    },
    {}
  ],
  2: [
    function (require, module, exports) {
      module.exports = angular.module('bixFrame', [
        'ionic',
        'ngMaterial'
      ]);
    },
    {}
  ],
  3: [
    function (require, module, exports) {
      app.controller('framifySampleController', [
        '$scope',
        '$http',
        function ($scope, $http) {
          $scope.voters = [];
          var voteSet = function (data) {
            $scope.voters = data;
          };
          var voteFail = function (err) {
            alert('Failed to fetch JSON data.');
          };
          $scope.customify = function (data) {
            $scope.app.alert($scope.nav.title, '<center>DONE!</center>', $scope.app.doNothing);
          };
          $scope.sav = function () {
            $scope.app.confirm($scope.nav.title, 'Do you really want to save this widget', $scope.customify, $scope.customify);
          };
          $scope.del = function () {
            $scope.app.confirm($scope.nav.title, 'Are you sure you want to DELETE this widget', $scope.customify, $scope.customify);
          };
          $scope.app.getJSON('./sample/sample.json', voteSet);
          $scope.testify = function () {
            return 'Correct!!';
          };
        }
      ]);
    },
    {}
  ],
  4: [
    function (require, module, exports) {
      app.controller('appController', [
        'app',
        '$scope',
        '$location',
        '$ionicModal',
        '$rootScope',
        function (app, $scope, $location, $ionicModal, $rootScope) {
          //!APPLICATION GLOBAL SCOPE COMPONENTS
          $scope.current = {};
          $scope.ui = {};
          $rootScope.nav = [];
          $rootScope.links = [];
          var setRoutes = function (data) {
            $scope.links = data;  //console.dir( $scope.nav )
          };
          var setData = function (data) {
            $scope.nav = data;  //console.dir( $scope.links )
          };
          //!FETCH THE NECESSARY APPLICATION DATA
          $scope.app.getData(setData);
          $scope.app.getRoutes(setRoutes);
          //!RE-INITIALIZE APPLICATION DATA
          $scope.location.path('/framify');
          //!ESTABLISH APPLICATION UI COMPONENTS AND THEIR HANDLERS
          //*CALL A CUSTOM MODAL
          $scope.ui.modal = function (modal_template, modal_animation, modal_onHide, modal_onRemove) {
            modal_template = modal_template || 'views/app.html';
            //~ Setup the custom modal
            $ionicModal.fromTemplateUrl(modal_template, {
              scope: $scope,
              animation: modal_animation || 'slide-in-up'
            }).then(function (modal) {
              $scope.current.modal = modal;
            });
            //~ Handle display of the modal
            $scope.current.openModal = function () {
              $scope.current.modal.show();
            };
            //~ Handle closure of the modal
            $scope.current.closeModal = function () {
              $scope.current.modal.hide();
            };
            //~ Destroy the modal after use
            $scope.$on('$destroy', function () {
              $scope.current.modal.remove();
            });
            //~ Perform an action on modal hide
            $scope.$on('current.modal.hidden', modal_onHide);
            //~ Perform an action on modal removal
            $scope.$on('current.modal.removed', modal_onRemove);
          };  //*EO - CALL CUSTOM MODAL 
        }
      ]);
    },
    {}
  ],
  5: [
    function (require, module, exports) {
      (function e(t, n, r) {
        function s(o, u) {
          if (!n[o]) {
            if (!t[o]) {
              var a = typeof require == 'function' && require;
              if (!u && a)
                return a(o, !0);
              if (i)
                return i(o, !0);
              throw new Error('Cannot find module \'' + o + '\'');
            }
            var f = n[o] = { exports: {} };
            t[o][0].call(f.exports, function (e) {
              var n = t[o][1][e];
              return s(n ? n : e);
            }, f, f.exports, e, t, n, r);
          }
          return n[o].exports;
        }
        var i = typeof require == 'function' && require;
        for (var o = 0; o < r.length; o++)
          s(r[o]);
        return s;
      }({
        1: [
          function (require, module, exports) {
            app.controller('framifySampleController', [
              '$scope',
              '$http',
              function ($scope, $http) {
                $scope.voters = [];
                var voteSet = function (data) {
                  $scope.voters = data;
                };
                var voteFail = function (err) {
                  alert('Failed to fetch JSON data.');
                };
                $scope.customify = function (data) {
                  $scope.app.alert($scope.nav.title, '<center>DONE!</center>', $scope.app.doNothing);
                };
                $scope.sav = function () {
                  $scope.app.confirm($scope.nav.title, 'Do you really want to save this widget', $scope.customify, $scope.customify);
                };
                $scope.del = function () {
                  $scope.app.confirm($scope.nav.title, 'Are you sure you want to DELETE this widget', $scope.customify, $scope.customify);
                };
                $scope.app.getJSON('./sample/sample.json', voteSet);
                $scope.testify = function () {
                  return 'Correct!!';
                };
              }
            ]);
          },
          {}
        ],
        2: [
          function (require, module, exports) {
            app.controller('appController', [
              'app',
              '$scope',
              '$location',
              '$ionicModal',
              '$rootScope',
              function (app, $scope, $location, $ionicModal, $rootScope) {
                //!APPLICATION GLOBAL SCOPE COMPONENTS
                $scope.current = {};
                $scope.ui = {};
                $rootScope.nav = [];
                $rootScope.links = [];
                var setRoutes = function (data) {
                  $scope.links = data;  //console.dir( $scope.nav )
                };
                var setData = function (data) {
                  $scope.nav = data;  //console.dir( $scope.links )
                };
                //!FETCH THE NECESSARY APPLICATION DATA
                $scope.app.getData(setData);
                $scope.app.getRoutes(setRoutes);
                //!RE-INITIALIZE APPLICATION DATA
                $scope.location.path('/framify');
                //!ESTABLISH APPLICATION UI COMPONENTS AND THEIR HANDLERS
                //*CALL A CUSTOM MODAL
                $scope.ui.modal = function (modal_template, modal_animation, modal_onHide, modal_onRemove) {
                  modal_template = modal_template || 'views/app.html';
                  //~ Setup the custom modal
                  $ionicModal.fromTemplateUrl(modal_template, {
                    scope: $scope,
                    animation: modal_animation || 'slide-in-up'
                  }).then(function (modal) {
                    $scope.current.modal = modal;
                  });
                  //~ Handle display of the modal
                  $scope.current.openModal = function () {
                    $scope.current.modal.show();
                  };
                  //~ Handle closure of the modal
                  $scope.current.closeModal = function () {
                    $scope.current.modal.hide();
                  };
                  //~ Destroy the modal after use
                  $scope.$on('$destroy', function () {
                    $scope.current.modal.remove();
                  });
                  //~ Perform an action on modal hide
                  $scope.$on('current.modal.hidden', modal_onHide);
                  //~ Perform an action on modal removal
                  $scope.$on('current.modal.removed', modal_onRemove);
                };  //*EO - CALL CUSTOM MODAL 
              }
            ]);
          },
          {}
        ],
        3: [
          function (require, module, exports) {
            require('./app.ctrl.js');
            require('./app-sample.ctrl.js');
          },
          {
            './app-sample.ctrl.js': 1,
            './app.ctrl.js': 2
          }
        ]
      }, {}, [3]));
    },
    {
      './app-sample.ctrl.js': 3,
      './app.ctrl.js': 4
    }
  ],
  6: [
    function (require, module, exports) {
      app.directive('appSample', function () {
        return {
          restrict: 'E',
          controller: 'framifySampleController',
          templateUrl: 'views/2app-sample.html'
        };
      });
    },
    {}
  ],
  7: [
    function (require, module, exports) {
      app.directive('appDirective', function () {
        return {
          restrict: 'E',
          controller: 'appController'
        };
      });
    },
    {}
  ],
  8: [
    function (require, module, exports) {
      (function e(t, n, r) {
        function s(o, u) {
          if (!n[o]) {
            if (!t[o]) {
              var a = typeof require == 'function' && require;
              if (!u && a)
                return a(o, !0);
              if (i)
                return i(o, !0);
              throw new Error('Cannot find module \'' + o + '\'');
            }
            var f = n[o] = { exports: {} };
            t[o][0].call(f.exports, function (e) {
              var n = t[o][1][e];
              return s(n ? n : e);
            }, f, f.exports, e, t, n, r);
          }
          return n[o].exports;
        }
        var i = typeof require == 'function' && require;
        for (var o = 0; o < r.length; o++)
          s(r[o]);
        return s;
      }({
        1: [
          function (require, module, exports) {
            app.directive('appSample', function () {
              return {
                restrict: 'E',
                controller: 'framifySampleController',
                templateUrl: 'views/2app-sample.html'
              };
            });
          },
          {}
        ],
        2: [
          function (require, module, exports) {
            app.directive('appDirective', function () {
              return {
                restrict: 'E',
                controller: 'appController'
              };
            });
          },
          {}
        ],
        3: [
          function (require, module, exports) {
            require('./app.dir.js');
            require('./app-sample.dir.js');
          },
          {
            './app-sample.dir.js': 1,
            './app.dir.js': 2
          }
        ]
      }, {}, [3]));
    },
    {
      './app-sample.dir.js': 6,
      './app.dir.js': 7
    }
  ],
  9: [
    function (require, module, exports) {
      app.service('app', [
        '$http',
        '$ionicPopup',
        function ($http, $ionicPopup) {
          //!SETUP THE APPLICATION BASICS
          //!AVAIL THE APPLICATION LINKS    
          this.getData = function (success_callback, error_callback) {
            $.getJSON('config/app.json', function (data) {
              success_callback(data);
            });
          };
          //!AVAIL THE APPLICATION ROUTES
          this.getRoutes = function (success_callback, error_callback) {
            // $http.get("config/app-routes.json")
            //     .success(function(data){
            //         success_callback(data);
            //     })
            //     .error(function(data){
            //         alert("Failed to load route data.")
            //         console.dir(data)
            //     })
            $.getJSON('config/app-routes.json', function (data) {
              success_callback(data);
            });
          };
          //! BASIC RESPONSE FORMATTER
          this.makeResponse = function (response, message, command) {
            return {
              response: response,
              data: {
                message: message,
                command: command
              }
            };
          };
          //* MONTHS ARRAY
          var $month_array = [
              '',
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ];
          //! HANDLE APPLICATION NATIVE SERVICE REQUESTS
          this.ajax = function (path, data, success_callback, error_callback, config) {
            //$http.post( bix_hlink + path, data, config).then( success_callback, error_callback );
            $.ajax({
              method: 'POST',
              url: app_hlink + path,
              data: data,
              success: success_callback
            });  /*,
            error: error_callback      */
          };
          //!HANDLE CROSS ORIGIN APPLICATION SERVICE REQUESTS
          this.cors = function (link, data, success_callback, error_callback, config) {
            //$http.post( link, data, config).then( success_callback, error_callback );
            $.ajax({
              method: 'POST',
              url: link,
              data: data,
              success: success_callback
            });  /*,
            error: error_callback      */
          };
          //!HANDLE JSON REQUESTS OF ANY CALIBER
          this.getJSON = function (link, callback_function) {
            $.getJSON(link, function (response) {
              callback_function(response);
            });
          };
          //! EMPTY CALLBACK
          this.doNothing = function () {
          };
          //!HANDLE THE DISPLAY OF DIALOG BOXES
          //* SHOW A "LOADING" ELEMENT
          this.loadify = function (el) {
            el.html('<ion-spinner icon="lines" class="spinner-energized"></ion-spinner>');
          };
          //*GENERATE A CUSTOM ALERT DIALOG
          this.alert = function (title, message, cb, ok) {
            var alertPopup = $ionicPopup.alert({
                title: title || $scope.nav.title,
                template: message,
                okText: ok || 'OK'
              });
            alertPopup.then(function (res) {
              if (typeof cb == 'function') {
                cb(res);
              }
            });
          };
          //*GENERATE A CUSTOM CONFIRM DIALOG
          this.confirm = function (title, message, success_cb, error_cb) {
            var confirmPopup = $ionicPopup.confirm({
                title: title || $scope.nav.title,
                template: message
              });
            confirmPopup.then(function (res) {
              if (res) {
                success_cb(res);
              } else {
                error_cb(res);
              }
            });
          };
          //*GENERATE A CUSTOM PROMPT DIALOG
          this.prompt = function (title, message, i_type, i_pholder, cb) {
            $ionicPopup.prompt({
              title: title || $scope.nav.title,
              template: message,
              inputType: i_type,
              inputPlaceholder: i_pholder
            }).then(cb);
          };
          //!BASIC VALIDATION METHODS
          //*VALIDATE EMAIL ADDRESSES
          this.isEmail = function (prospective_email) {
            return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/.test(prospective_email);
          };
          //*VALIDATE USERNAMES
          this.isUsername = function (prospective_username) {
            return /^[a-z0-9_-]{4,16}$/.test(prospective_username);
          };
          //*VALIDATE PASSWORDS
          this.isPassword = function (prospective_password) {
            return /^[-@.\/\!\$\%\^|#&,+\w\s]{6,50}$/.test(prospective_password);
          };
          //*VALIDATE WHETHER VALUES MATCH
          this.matches = function (val1, val2) {
            return val1 === val2;
          };
          //*TRANFORM NUMBER TO MONTH
          this.num2month = function (month_number) {
            if (!isNaN(month_number)) {
              return $month_array[month_number];
            } else {
              return 'Invalid Month';
            }
          };
          //*REMOVE DUPLICATES FROM ARRAY
          this.unique = function (array_) {
            var ret_array = new Array();
            for (var a = array_.length - 1; a >= 0; a--) {
              for (var b = array_.length - 1; b >= 0; b--) {
                if (array_[a] == array_[b] && a != b) {
                  delete array_[b];
                }
              }
              ;
              if (array_[a] != undefined)
                ret_array.push(array_[a]);
            }
            ;
            return ret_array.reverse();
          };
          //* COUNT OCCURANCES IN AN ARRAY
          this.count = function (val, obj) {
            var cnt = 0;
            for (v in obj) {
              if (val === obj[v]) {
                cnt += 1;
              }
            }
            return cnt;
          };
        }
      ]);
    },
    {}
  ],
  10: [
    function (require, module, exports) {
      (function e(t, n, r) {
        function s(o, u) {
          if (!n[o]) {
            if (!t[o]) {
              var a = typeof require == 'function' && require;
              if (!u && a)
                return a(o, !0);
              if (i)
                return i(o, !0);
              throw new Error('Cannot find module \'' + o + '\'');
            }
            var f = n[o] = { exports: {} };
            t[o][0].call(f.exports, function (e) {
              var n = t[o][1][e];
              return s(n ? n : e);
            }, f, f.exports, e, t, n, r);
          }
          return n[o].exports;
        }
        var i = typeof require == 'function' && require;
        for (var o = 0; o < r.length; o++)
          s(r[o]);
        return s;
      }({
        1: [
          function (require, module, exports) {
            app.service('app', [
              '$http',
              '$ionicPopup',
              function ($http, $ionicPopup) {
                //!SETUP THE APPLICATION BASICS
                //!AVAIL THE APPLICATION LINKS    
                this.getData = function (success_callback, error_callback) {
                  $.getJSON('config/app.json', function (data) {
                    success_callback(data);
                  });
                };
                //!AVAIL THE APPLICATION ROUTES
                this.getRoutes = function (success_callback, error_callback) {
                  // $http.get("config/app-routes.json")
                  //     .success(function(data){
                  //         success_callback(data);
                  //     })
                  //     .error(function(data){
                  //         alert("Failed to load route data.")
                  //         console.dir(data)
                  //     })
                  $.getJSON('config/app-routes.json', function (data) {
                    success_callback(data);
                  });
                };
                //! BASIC RESPONSE FORMATTER
                this.makeResponse = function (response, message, command) {
                  return {
                    response: response,
                    data: {
                      message: message,
                      command: command
                    }
                  };
                };
                //* MONTHS ARRAY
                var $month_array = [
                    '',
                    'January',
                    'February',
                    'March',
                    'April',
                    'May',
                    'June',
                    'July',
                    'August',
                    'September',
                    'October',
                    'November',
                    'December'
                  ];
                //! HANDLE APPLICATION NATIVE SERVICE REQUESTS
                this.ajax = function (path, data, success_callback, error_callback, config) {
                  //$http.post( bix_hlink + path, data, config).then( success_callback, error_callback );
                  $.ajax({
                    method: 'POST',
                    url: app_hlink + path,
                    data: data,
                    success: success_callback
                  });  /*,
            error: error_callback      */
                };
                //!HANDLE CROSS ORIGIN APPLICATION SERVICE REQUESTS
                this.cors = function (link, data, success_callback, error_callback, config) {
                  //$http.post( link, data, config).then( success_callback, error_callback );
                  $.ajax({
                    method: 'POST',
                    url: link,
                    data: data,
                    success: success_callback
                  });  /*,
            error: error_callback      */
                };
                //!HANDLE JSON REQUESTS OF ANY CALIBER
                this.getJSON = function (link, callback_function) {
                  $.getJSON(link, function (response) {
                    callback_function(response);
                  });
                };
                //! EMPTY CALLBACK
                this.doNothing = function () {
                };
                //!HANDLE THE DISPLAY OF DIALOG BOXES
                //* SHOW A "LOADING" ELEMENT
                this.loadify = function (el) {
                  el.html('<ion-spinner icon="lines" class="spinner-energized"></ion-spinner>');
                };
                //*GENERATE A CUSTOM ALERT DIALOG
                this.alert = function (title, message, cb, ok) {
                  var alertPopup = $ionicPopup.alert({
                      title: title || $scope.nav.title,
                      template: message,
                      okText: ok || 'OK'
                    });
                  alertPopup.then(function (res) {
                    if (typeof cb == 'function') {
                      cb(res);
                    }
                  });
                };
                //*GENERATE A CUSTOM CONFIRM DIALOG
                this.confirm = function (title, message, success_cb, error_cb) {
                  var confirmPopup = $ionicPopup.confirm({
                      title: title || $scope.nav.title,
                      template: message
                    });
                  confirmPopup.then(function (res) {
                    if (res) {
                      success_cb(res);
                    } else {
                      error_cb(res);
                    }
                  });
                };
                //*GENERATE A CUSTOM PROMPT DIALOG
                this.prompt = function (title, message, i_type, i_pholder, cb) {
                  $ionicPopup.prompt({
                    title: title || $scope.nav.title,
                    template: message,
                    inputType: i_type,
                    inputPlaceholder: i_pholder
                  }).then(cb);
                };
                //!BASIC VALIDATION METHODS
                //*VALIDATE EMAIL ADDRESSES
                this.isEmail = function (prospective_email) {
                  return /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/.test(prospective_email);
                };
                //*VALIDATE USERNAMES
                this.isUsername = function (prospective_username) {
                  return /^[a-z0-9_-]{4,16}$/.test(prospective_username);
                };
                //*VALIDATE PASSWORDS
                this.isPassword = function (prospective_password) {
                  return /^[-@.\/\!\$\%\^|#&,+\w\s]{6,50}$/.test(prospective_password);
                };
                //*VALIDATE WHETHER VALUES MATCH
                this.matches = function (val1, val2) {
                  return val1 === val2;
                };
                //*TRANFORM NUMBER TO MONTH
                this.num2month = function (month_number) {
                  if (!isNaN(month_number)) {
                    return $month_array[month_number];
                  } else {
                    return 'Invalid Month';
                  }
                };
                //*REMOVE DUPLICATES FROM ARRAY
                this.unique = function (array_) {
                  var ret_array = new Array();
                  for (var a = array_.length - 1; a >= 0; a--) {
                    for (var b = array_.length - 1; b >= 0; b--) {
                      if (array_[a] == array_[b] && a != b) {
                        delete array_[b];
                      }
                    }
                    ;
                    if (array_[a] != undefined)
                      ret_array.push(array_[a]);
                  }
                  ;
                  return ret_array.reverse();
                };
                //* COUNT OCCURANCES IN AN ARRAY
                this.count = function (val, obj) {
                  var cnt = 0;
                  for (v in obj) {
                    if (val === obj[v]) {
                      cnt += 1;
                    }
                  }
                  return cnt;
                };
              }
            ]);
          },
          {}
        ],
        2: [
          function (require, module, exports) {
            require('./app.serv.js');
          },
          { './app.serv.js': 1 }
        ]
      }, {}, [2]));
    },
    { './app.serv.js': 9 }
  ],
  11: [
    function (require, module, exports) {
      /* global app */
      /* global app_hlink */
      /* global app_ip */
      /* global app_port */
      //! APP CONFIGURATIONS
      app_ip = '127.0.0.1';
      app_port = 5000;
      app_hlink = 'http://' + app_ip + ':' + app_port;
      app = require('./assets/js/app.js');
      //! CUSTOM EXTENTIONS HERE
      //* EXTEND Object to cater for {{Object}}.keys
      function keys() {
        var k = [];
        for (var p in this) {
          if (this.hasOwnProperty(p))
            k.push(p);
        }
        return k;
      }
      Object.defineProperty(Object.prototype, 'keys', {
        value: keys,
        enumerable: false
      });
      //* EXTEND THE Array TO CATER FOR {{Array}}.inArray
      Array.prototype.has = function (needle) {
        return Array(this).join(',').indexOf(needle) > -1;
      };
      //! EO - CUSTOM EXTENSIONS
      //! APP IMPORTS
      require('./assets/js/app-router.js');
      require('./assets/js/services/services.js');
      require('./assets/js/directives/directives.js');
      require('./assets/js/controllers/controllers.js');
    },
    {
      './assets/js/app-router.js': 1,
      './assets/js/app.js': 2,
      './assets/js/controllers/controllers.js': 5,
      './assets/js/directives/directives.js': 8,
      './assets/js/services/services.js': 10
    }
  ]
}, {}, [11]));