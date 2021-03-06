var app = angular.module('app', []);

app.controller('mainCtrl', function($scope) {
  $scope.person1 = {
    name: 'Sheldon Cooper',
    address: { 
      street: 'PO Box 4453',
      city: 'Lakewood',
      state: 'CO'
    },
    friends: ['Leonard', 'Raj', 'Howard'],
    level: 0
  }
  $scope.person2 = {
    name: 'Leonard Hofstadter',
    address: { 
      street: 'PO Box 15322',
      city: 'Littleton',
      state: 'CO'
    },
    friends: ['Penny', 'Sheldon', 'Raj', 'Howard'],
    level: 1
  }
  $scope.droid1 = {
    name: 'G4',
    specifications: {
      manufacturer: 'Droids USA',
      type: 'Shredder',
      production: 'G series',
    },
    level: 1
  }
})

app.directive('stateDisplay', function() {
  return {
    link: function(scope, el, attrs) {
      var parms = attrs['stateDisplay'].split(' ');
      var linkVar = parms[0];
      var classes = parms.slice(1);
      scope.$watch(linkVar, function(newVal) {
        el.removeClass(classes.join(' '));
        el.addClass(classes[newVal]);
      });
    }
  }
})

app.directive('userPanel', function() {
  return {
    restrict: 'E',
    transclude: true,
    templateUrl: 'userPanel.html',
    scope: {
      name: '@',
      level: '=',
      initialCollapsed: '@collapsed'
    },
    controller: function($scope) {
      $scope.collapsed = $scope.initialCollapsed === true;
      $scope.nextState = function(evt) {
        evt.stopPropagation();
        evt.preventDefault();
        $scope.level++;
        $scope.level = $scope.level % 4;
      }
      $scope.collapse = function() {
        $scope.collapsed = !$scope.collapsed;
      }
    }
  }
})

app.directive('droidInfoCard', function() {
  return {
    templateUrl: "droidInfoCard.html",
    restrict: "E",
    scope: {
      droid: '=droid',
      collapsed: '@collapsed'
    },
    controller: function($scope) {
    }
  }
});

app.directive('personInfoCard', function() {
  return {
    templateUrl: "personInfoCard.html",
    restrict: "E",
    scope: {
      person: '=person',
      collapsed: '@collapsed'
    },
    controller: function($scope) {
      $scope.won = function(person) {
        person.status = "waiting";
      }
      $scope.removeFriend = function(friend) {
        var idx = $scope.person.friends.indexOf(friend);
        if(idx > -1) {
          $scope.person.friends.splice(idx, 1);
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