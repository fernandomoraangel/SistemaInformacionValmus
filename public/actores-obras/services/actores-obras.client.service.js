'use strict';

//Crear el service 'actores'
angular.module('actoresObras').factory('ActoresObras',['$resource', function($resource){
	//Usar el service '$resource' para devolver un objeto '$resource' actor-obra
	//console.log("Uso servicio actoresObras");
	return $resource('api/actoresObras/:actorObraId',{
		actorObraId:'@_id'
	},{
		update:{
			method:'PUT'
		}
	});
}]);
