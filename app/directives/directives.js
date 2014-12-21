angular.module('sowt.directives',['sowt.services'])
	.directive('toc', function(){
		return {
			restrict : 'E',
			templateUrl: 'directives/toc.html',
			controller : ['$scope','wireframeService','$location',function($scope,wfs,$location){
				$scope.title = 'Screens';

				

				wfs.getAllScreens().then(function(res) {
					var screens = [];
					$location.path('wire/' + res[0]);
					res.forEach(function (name, i) {
						var screen = {name : name};
						wfs.getScreenInfo(name).then(function(infos){
							if (infos.status == 'In Progress') {
								screen.work = true;
							} else if (infos.status == 'In Review') {
								screen.inreview = true;
							} else {
								screen.done = true;
							}
						});
						screens.push(screen);
					});
					$scope.screens = screens;
				});
			}]
		}
	})