'use strict'
//Configuración de rutas para 'generos'
angular.module('generosNoMusicales').config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
		when('/generosnomusicales',{
			templateUrl:'generosnomusicales/views/list-generonomusical.client.view.html'
		}).
		when('/generosnomusicales/create',{
			templateUrl: 'generosnomusicales/views/create-generonomusical.client.view.html'
		}).
		when('/generosnomusicales/:generoId',{
			templateUrl:'generosnomusicales/views/view-generonomusical.client.view.html'
		}).
		when('/generosnomusicales/:generonomusicalId/edit',{
			templateUrl:'generosnomusicales/views/edit-generoNoMusical.client.view.html'
		});
	}
	]);