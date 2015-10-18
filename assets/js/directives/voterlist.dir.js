app.directive('voterList', function(){
   return{
       restrict: 'E',
       controller: 'VoterListController',
       templateUrl: 'views/voters.html' 
   } 
});