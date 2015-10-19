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
      app = require('./js/app.js');
      require('./js/controllers/controllers.js');
      require('./js/directives/directives.js');
      require('./js/services/services.js');
    },
    {
      './js/app.js': 2,
      './js/controllers/controllers.js': 4,
      './js/directives/directives.js': 9,
      './js/services/services.js': 14
    }
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
      app.controller('appController', [
        'app',
        '$scope',
        '$location',
        '$ionicModal',
        function (app, $scope, $location, $ionicModal) {
          //!APPLICATION GLOBAL SCOPE COMPONENTS
          $scope.current = {};
          $scope.ui = {};
          //!ESTABLISH APPLICATION UI COMPONENTS AND THEIR HANDLERS
          //*CALL A CUSTOM MODAL
          $scope.ui.modal = function (modal_template, modal_animation, modal_onHide, modal_onRemove) {
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
  4: [
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
            app.controller('appController', [
              'app',
              '$scope',
              '$location',
              '$ionicModal',
              function (app, $scope, $location, $ionicModal) {
                //!APPLICATION GLOBAL SCOPE COMPONENTS
                $scope.current = {};
                $scope.ui = {};
                //!ESTABLISH APPLICATION UI COMPONENTS AND THEIR HANDLERS
                //*CALL A CUSTOM MODAL
                $scope.ui.modal = function (modal_template, modal_animation, modal_onHide, modal_onRemove) {
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
        2: [
          function (require, module, exports) {
            require('./app.ctrl.js');
            require('./voterlist.ctrl.js');
            require('./sidenavleft.ctrl.js');
            require('./navbartop.ctrl.js');
          },
          {
            './app.ctrl.js': 1,
            './navbartop.ctrl.js': 3,
            './sidenavleft.ctrl.js': 4,
            './voterlist.ctrl.js': 5
          }
        ],
        3: [
          function (require, module, exports) {
            app.controller('NavbarTopController', [
              '$scope',
              '$http',
              function ($scope, $http) {
                $scope.nav = [];
                $http.get('config/navbar.json').success(function (data) {
                  $scope.nav = data;
                  console.log('Successfully captured navbar data.');
                }).success(function () {
                  console.log('Failed to capture navbar data.');
                });
              }
            ]);
          },
          {}
        ],
        4: [
          function (require, module, exports) {
            app.controller('SidenavLeftController', [
              '$scope',
              '$http',
              '$mdSidenav',
              function ($scope, $http, $mdSidenav) {
                $scope.toggleSidenav = function (menuId) {
                  $mdSidenav(menuId).toggle();
                };
              }
            ]);
          },
          {}
        ],
        5: [
          function (require, module, exports) {
            app.controller('VoterListController', [
              '$scope',
              '$http',
              function ($scope, $http) {
                $scope.voters = [];
                $http.get('voters.json').success(function (data) {
                  $scope.voters = data;
                }).error(function (err) {
                  console.log('Failed to fetch JSON data.');
                });
              }
            ]);
          },
          {}
        ]
      }, {}, [2]));
    },
    {
      './app.ctrl.js': 3,
      './navbartop.ctrl.js': 5,
      './sidenavleft.ctrl.js': 6,
      './voterlist.ctrl.js': 7
    }
  ],
  5: [
    function (require, module, exports) {
      app.controller('NavbarTopController', [
        '$scope',
        '$http',
        function ($scope, $http) {
          $scope.nav = [];
          $http.get('config/navbar.json').success(function (data) {
            $scope.nav = data;
            console.log('Successfully captured navbar data.');
          }).success(function () {
            console.log('Failed to capture navbar data.');
          });
        }
      ]);
    },
    {}
  ],
  6: [
    function (require, module, exports) {
      app.controller('SidenavLeftController', [
        '$scope',
        '$http',
        '$mdSidenav',
        function ($scope, $http, $mdSidenav) {
          $scope.toggleSidenav = function (menuId) {
            $mdSidenav(menuId).toggle();
          };
        }
      ]);
    },
    {}
  ],
  7: [
    function (require, module, exports) {
      app.controller('VoterListController', [
        '$scope',
        '$http',
        function ($scope, $http) {
          $scope.voters = [];
          $http.get('voters.json').success(function (data) {
            $scope.voters = data;
          }).error(function (err) {
            console.log('Failed to fetch JSON data.');
          });
        }
      ]);
    },
    {}
  ],
  8: [
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
  9: [
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
            app.directive('appDirective', function () {
              return {
                restrict: 'E',
                controller: 'appController'
              };
            });
          },
          {}
        ],
        2: [
          function (require, module, exports) {
            require('./app.dir.js');
            require('./voterlist.dir.js');
            require('./sidenavleft.dir.js');
            require('./navbartop.dir.js');
          },
          {
            './app.dir.js': 1,
            './navbartop.dir.js': 3,
            './sidenavleft.dir.js': 4,
            './voterlist.dir.js': 5
          }
        ],
        3: [
          function (require, module, exports) {
            app.directive('navbarTop', function () {
              return {
                restrict: 'E',
                controller: 'NavbarTopController',
                templateUrl: 'views/navbar-top.html'
              };
            });
          },
          {}
        ],
        4: [
          function (require, module, exports) {
            app.directive('sidebarLeft', function () {
              return {
                restrict: 'E',
                controller: 'SidenavLeftController',
                templateUrl: 'views/sidenav-left.html'
              };
            });
          },
          {}
        ],
        5: [
          function (require, module, exports) {
            app.directive('voterList', function () {
              return {
                restrict: 'E',
                controller: 'VoterListController',
                templateUrl: 'views/voters.html'
              };
            });
          },
          {}
        ]
      }, {}, [2]));
    },
    {
      './app.dir.js': 8,
      './navbartop.dir.js': 10,
      './sidenavleft.dir.js': 11,
      './voterlist.dir.js': 12
    }
  ],
  10: [
    function (require, module, exports) {
      app.directive('navbarTop', function () {
        return {
          restrict: 'E',
          controller: 'NavbarTopController',
          templateUrl: 'views/navbar-top.html'
        };
      });
    },
    {}
  ],
  11: [
    function (require, module, exports) {
      app.directive('sidebarLeft', function () {
        return {
          restrict: 'E',
          controller: 'SidenavLeftController',
          templateUrl: 'views/sidenav-left.html'
        };
      });
    },
    {}
  ],
  12: [
    function (require, module, exports) {
      app.directive('voterList', function () {
        return {
          restrict: 'E',
          controller: 'VoterListController',
          templateUrl: 'views/voters.html'
        };
      });
    },
    {}
  ],
  13: [
    function (require, module, exports) {
      app.service('app', [
        '$http',
        '$ionicPopup',
        function ($http, $ionicPopup) {
          //!HANDLE APPLICATION NATIVE SERVICE REQUESTS
          this.ajax = function (path, data, success_callback, error_callback, config) {
            //$http.post( bix_hlink + path, data, config).then( success_callback, error_callback );
            $.ajax({
              method: 'POST',
              url: app_hlink + path,
              data: data,
              success: success_callback,
              error: error_callback
            });
          };
          //!HANDLE CROSS ORIGIN APPLICATION SERVICE REQUESTS
          this.cors = function (link, data, success_callback, error_callback, config) {
            //$http.post( link, data, config).then( success_callback, error_callback );
            $.ajax({
              method: 'POST',
              url: link,
              data: data,
              success: success_callback,
              error: error_callback
            });
          };
          //!HANDLE THE DISPLAY OF DIALOG BOXES
          //*GENERATE A CUSTOM ALERT DIALOG
          this.alert = function (title, message, cb, ok) {
            var alertPopup = $ionicPopup.alert({
                title: title,
                template: message,
                okText: ok || 'OK'
              });
            alertPopup.then(function (res) {
              cb(res);
            });
          };
          //*GENERATE A CUSTOM CONFIRM DIALOG
          this.confirm = function (title, message, success_cb, error_cb) {
            var confirmPopup = $ionicPopup.confirm({
                title: 'Consume Ice Cream',
                template: 'Are you sure you want to eat this ice cream?'
              });
            confirmPopup.then(function (res) {
              if (res) {
                success_cb();
              } else {
                error_cb();
              }
            });
          };
          //*GENERATE A CUSTOM PROMPT DIALOG
          this.prompt = function (title, message, i_type, i_pholder, cb) {
            $ionicPopup.prompt({
              title: title,
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
          //*VALIDATE VALUES FOR MATCHING
          this.matches = function (val1, val2) {
            return val1 === val2;
          };
        }
      ]);
    },
    {}
  ],
  14: [
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
                //!HANDLE APPLICATION NATIVE SERVICE REQUESTS
                this.ajax = function (path, data, success_callback, error_callback, config) {
                  //$http.post( bix_hlink + path, data, config).then( success_callback, error_callback );
                  $.ajax({
                    method: 'POST',
                    url: app_hlink + path,
                    data: data,
                    success: success_callback,
                    error: error_callback
                  });
                };
                //!HANDLE CROSS ORIGIN APPLICATION SERVICE REQUESTS
                this.cors = function (link, data, success_callback, error_callback, config) {
                  //$http.post( link, data, config).then( success_callback, error_callback );
                  $.ajax({
                    method: 'POST',
                    url: link,
                    data: data,
                    success: success_callback,
                    error: error_callback
                  });
                };
                //!HANDLE THE DISPLAY OF DIALOG BOXES
                //*GENERATE A CUSTOM ALERT DIALOG
                this.alert = function (title, message, cb, ok) {
                  var alertPopup = $ionicPopup.alert({
                      title: title,
                      template: message,
                      okText: ok || 'OK'
                    });
                  alertPopup.then(function (res) {
                    cb(res);
                  });
                };
                //*GENERATE A CUSTOM CONFIRM DIALOG
                this.confirm = function (title, message, success_cb, error_cb) {
                  var confirmPopup = $ionicPopup.confirm({
                      title: 'Consume Ice Cream',
                      template: 'Are you sure you want to eat this ice cream?'
                    });
                  confirmPopup.then(function (res) {
                    if (res) {
                      success_cb();
                    } else {
                      error_cb();
                    }
                  });
                };
                //*GENERATE A CUSTOM PROMPT DIALOG
                this.prompt = function (title, message, i_type, i_pholder, cb) {
                  $ionicPopup.prompt({
                    title: title,
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
                //*VALIDATE VALUES FOR MATCHING
                this.matches = function (val1, val2) {
                  return val1 === val2;
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
    { './app.serv.js': 13 }
  ]
}, {}, [1]));