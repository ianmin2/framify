(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
require('./voterlist.ctrl.js');
require('./sidenavleft.ctrl.js');
require('./navbartop.ctrl.js');
},{"./navbartop.ctrl.js":2,"./sidenavleft.ctrl.js":3,"./voterlist.ctrl.js":4}],2:[function(require,module,exports){
app.controller("NavbarTopController", ['$scope', '$http', function($scope, $http){
		$scope.nav = [];
		$http.get("config/navbar.json")
			.success(function(data){
				$scope.nav = data; 
				console.log("Successfully captured navbar data.");
			})
			.success(function(){
				console.log("Failed to capture navbar data.");
			})
}]);
},{}],3:[function(require,module,exports){
app.controller("SidenavLeftController", ['$scope', '$http', '$mdSidenav', function($scope, $http, $mdSidenav){
	$scope.toggleSidenav = function(menuId){
        $mdSidenav(menuId).toggle();
    }
}]);
},{}],4:[function(require,module,exports){
app.controller('VoterListController', ['$scope', '$http', function($scope, $http){
    $scope.voters = [];
    $http.get('voters.json')
    .success(function(data){
        $scope.voters = data;
    })
    .error(function(err){
        console.log("Failed to fetch JSON data.");
    });
}]); 
},{}]},{},[1])