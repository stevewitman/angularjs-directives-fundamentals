var app = angular.module('app', []);

app.controller('mainCtrl', function($scope) {
  $scope.user1 = {
    name: 'Sheldon Cooper',
    address: { 
      street: 'PO Box 4453',
      city: 'Lakewood',
      state: 'CO'
    },
    friends: ['Leonard', 'Raj', 'Howard']
  }
  $scope.user2 = {
    name: 'Leonard Hofstadter',
    address: { 
      street: 'PO Box 15322',
      city: 'Littleton',
      state: 'CO'
    },
    friends: ['Penny', 'Sheldon', 'Raj', 'Howard']
  }
})

app.directive('userInfoCard', function() {
  return {
    templateUrl: "userInfoCard.html",
    restrict: "E",
    scope: {
      user: '=person',
      collapsed: '@collapsed'
    },
    controller: function($scope) {
      // $scope.collapsed = false;
      $scope.collapsed = $scope.initialCollapsed === true;
      $scope.won = function(user) {
        user.status = "waiting";
      }
      $scope.collapse = function() {
        $scope.collapsed = !$scope.collapsed;
      }
    }
  }
});

app.directive('address',function() {
  return {
    restrict: 'E',
    scope: true,
    templateUrl: 'address.html',
    controller: function($scope) {
      $scope.collapsed = false;
      $scope.collapseAddress = function() {
        $scope.collapsed = true;
      }
      $scope.expandAddress = function() {
        $scope.collapsed = false;
      }
    }
  }
})