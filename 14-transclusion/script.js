angular.module('app', []);

angular.module('app').controller('mainCtrl', function($scope) {
  $scope.message = "This is the message"
});

angular.module('app').directive('displayBox', function() {
  return {
    restrict: 'E',
    templateUrl: 'displayBox.html',
    controller: function($scope) {
      $scope.hidden = false;
      $scope.close = function() {
        $scope.hidden = true;
      }
    },
    transclude: true,
  }
})