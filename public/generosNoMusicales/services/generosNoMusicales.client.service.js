'use strict';

//Crear el service 'generos'
angular.module('generosNoMusicales').factory('GenerosNoMusicales',['$resource', function($resource){
	//Usar el service '$resource' para devolver un objeto '$resource' 
	//console.log("Uso servicio generos");
	return $resource('api/generosNoMusicales/:generoNoMusicalId',{
		generoNoMusicalId:'@_id'
	},{
		update:{
			method:'PUT'
		}
	});
}]);
