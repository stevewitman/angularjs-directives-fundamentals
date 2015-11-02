var app = angular.module('app', []);

app.controller('mainCtrl', function($scope) {
  $scope.user = {
    name: 'Sheldon Cooper',
    address: { 
      street: 'PO Box 4453',
      city: 'Lakewood',
      state: 'CO'
    },
    friends: ['Leonard', 'Raj', 'Howard']
  }
})

app.directive('userInfoCard', function() {
  return {
    templateUrl: "userInfoCard.html",
    restrict: "E",
    controller: function($scope) {
      $scope.won = function(user) {
        user.status = "waiting"
      }
    }
  }
})