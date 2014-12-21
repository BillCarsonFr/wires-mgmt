'use strict';


// Declare app level module which depends on views, and components
angular.module('sowt', [
  'ui.bootstrap',
  'ngRoute',
  'sowt.services',
  'sowt.directives'
  // 'sowt.view1'
])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/wire/:name', {
      templateUrl : 'views/bodyContent.html',
      controller : 'ContentViewController'
    })
    .otherwise({redirectTo: '/'})
}])
.controller('ContentViewController', ['$scope','$routeParams','wireframeService', function($scope,$routeParams,wireframeService){
  $scope.screen = $routeParams.name;
  $scope.loading = true;
  wireframeService.getScreenInfo($routeParams.name).then(function(infos) {
    $scope.loading = false;
    $scope.infos = infos;
  });

}])
;
