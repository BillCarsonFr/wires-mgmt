angular.module('sowt.services',[])
	.factory('wireframeService', ['$q','$http', function($q,$http){

		var restURL = "/rest/";
		var wireframeService = {};

		var cachedInfos = {};

		wireframeService.getAllScreens = function(){
			var deferred = $q.defer();

			$http.get(restURL + 'wires').then(function(res){
				deferred.resolve(res.data.screens);
			}).catch(function(res){
				deferred.reject();
			});

			return deferred.promise;
		};

		wireframeService.getScreenInfo = function(name){
			var deferred = $q.defer();
			if(cachedInfos.name) {
				q.resolve(cachedInfos.name);
				return deferred.promise;
			}

			$http.get(restURL + 'wire/' + name).then(function(res){
				cachedInfos[name] = res.data;
				deferred.resolve(res.data);
			}).catch(function(res){
				deferred.reject();
			});
			return deferred.promise;

		}
		return wireframeService;
	}])