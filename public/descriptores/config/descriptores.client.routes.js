'use strict'
//Configuración de rutas para 'descriptores'
angular.module('descriptores').config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
		when('/descriptores',{
			templateUrl:'descriptores/views/list-descriptor.client.view.html'
		}).
		when('/descriptores/create',{
			templateUrl: 'descriptores/views/create-descriptor.client.view.html'
		}).
		when('/descriptores/:ejemplarId',{
			templateUrl:'descriptores/views/view-descriptor.client.view.html'
		}).
		when('/descriptores/:ejemplarId/edit',{
			templateUrl:'descriptores/views/edit-descriptor.client.view.html'
		});
	}
	]);