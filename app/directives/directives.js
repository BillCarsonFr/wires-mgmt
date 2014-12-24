angular.module('sowt.directives',['sowt.services'])
	.directive('toc', function(){
		return {
			restrict : 'E',
			templateUrl: 'directives/toc.html',
			controller : ['$scope','wireframeService','$location','$rootScope',function($scope,wfs,$location,$rootScope){
				$scope.title = 'Screens';

				$rootScope.totalScreens = 1;
				$rootScope.completedScreen = 0;
				$rootScope.readyScreen = 0;
				$rootScope.completionRatio = function() {
					var decimals = 2;
					var input = ($rootScope.completedScreen/$rootScope.totalScreens);
					return Math.round(input * Math.pow(10, decimals + 2))/Math.pow(10, decimals);
				}
				$rootScope.readyRatio = function() {
					var decimals = 2;
					var input = ($rootScope.readyScreen/$rootScope.totalScreens);
					return Math.round(input * Math.pow(10, decimals + 2))/Math.pow(10, decimals);
				}

				wfs.getAllScreens().then(function(res) {
					var screens = [];
					$rootScope.totalScreens = res.length;
					$location.path('wire/' + res[0]);
					res.forEach(function (name, i) {
						var screen = {name : name};
						wfs.getScreenInfo(name).then(function(infos){
							if (infos.status == 'Complete') {
								$rootScope.completedScreen++;
								screen.done = true;
							} else if (infos.status == 'In Review') {
								screen.inreview = true;
								$rootScope.readyScreen++;
							} else {
								screen.work = true;
							}
						});
						screens.push(screen);
					});
					$scope.screens = screens;
				});
			}]
		}
	})