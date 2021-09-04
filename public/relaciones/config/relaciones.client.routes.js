'use strict'
//Configuración de rutas para 'relaciones'
angular.module('relaciones').config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
		when('/relaciones',{
			templateUrl:'relaciones/views/list-relacion.client.view.html'
		}).
		when('/relaciones/create',{
			templateUrl: 'relaciones/views/create-relacion.client.view.html'
		}).
		when('/relaciones/:relacionId',{
			templateUrl:'relaciones/views/view-relacion.client.view.html'
		}).
		when('/relaciones/:relacionId/edit',{
			templateUrl:'relaciones/views/edit-relacion.client.view.html'
		});
	}
	]);