var app = angular.module('app', []);

app.controller('mainCtrl', function($scope) {
  $scope.user1 = {
    name: 'Sheldon Cooper',
    address: { 
      street: 'PO Box 4453',
      city: 'Lakewood',
      state: 'CO'
    },
    friends: ['Leonard', 'Raj', 'Howard'],
    level: 0
  }
  $scope.user2 = {
    name: 'Leonard Hofstadter',
    address: { 
      street: 'PO Box 15322',
      city: 'Littleton',
      state: 'CO'
    },
    friends: ['Penny', 'Sheldon', 'Raj', 'Howard'],
    level: 1
  }
})

app.directive('stateDisplay', function() {
  return {
    link: function(scope, el, attrs) {
      scope.$watch(attrs['stateDisplay'], function(newVal) {
        switch(newVal) {
          case 0:
            el.css('background-color', 'white');
            break;
          case 1:
            el.css('background-color', 'yellow');
            break;
          case 2:
            el.css('background-color', 'red');
            break;
        }
      });
    }
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
      $scope.nextState = function() {
        $scope.user.level++;
        $scope.user.level = $scope.user.level % 3;
      }
      $scope.won = function(user) {
        user.status = "waiting";
      }
      $scope.collapse = function() {
        $scope.collapsed = !$scope.collapsed;
      }
      $scope.removeFriend = function(friend) {
        var idx = $scope.user.friends.indexOf(friend);
        if(idx > -1) {
          $scope.user.friends.splice(idx, 1);
        }
      }
    }
  }
});

app.directive('removeFriend', function() {
  return {
    restrict: 'E',
    templateUrl: 'removeFriend.html',
    scope: {
      notifyParent: '&method'
    },
    controller: function($scope) {
      $scope.removing = false;
      $scope.startRemove = function() {
        $scope.removing = true;
      }
      $scope.cancelRemove = function() {
        $scope.removing = false;
      }
      $scope.confirmRemove = function() {
console.log('here');
        $scope.notifyParent();
      }
    }
  }
})

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