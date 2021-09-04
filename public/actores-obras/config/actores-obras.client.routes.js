'use strict'
//Configuración de rutas para 'actoresObras'
angular.module('actoresObras').config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
		when('/actoresObras',{
			templateUrl:'actores-obras/views/list-actor-obra.client.view.html'
		}).
		when('/actoresObras/create',{
			templateUrl: 'actores-obras/views/create-actor-obra.client.view.html'
		}).
		when('/actoresObras/:actorObraId',{
			templateUrl:'actores-obras/views/view-actor-obra.client.view.html'
		}).
		when('/actoresObras/:actorObraId/edit',{
			templateUrl:'actores-obras/views/edit-actor-obra.client.view.html'
		});
	}
	]);