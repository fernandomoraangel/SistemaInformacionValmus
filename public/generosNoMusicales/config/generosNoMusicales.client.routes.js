'use strict'
//Configuración de rutas para 'generos'
angular.module('generosNoMusicales').config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
		when('/generosNoMusicales',{
			templateUrl:'generosNoMusicales/views/list-generoNoMusical.client.view.html'
		}).
		when('/generosNoMusicales/create',{
			templateUrl: 'generosNoMusicales/views/create-generoNoMusical.client.view.html'
		}).
		when('/generosNoMusicales/:generoId',{
			templateUrl:'generosNoMusicales/views/view-generoNoMusical.client.view.html'
		}).
		when('/generosNoMusicales/:generoNoMusicalId/edit',{
			templateUrl:'generosNoMusicales/views/edit-generoNoMusical.client.view.html'
		});
	}
	]);