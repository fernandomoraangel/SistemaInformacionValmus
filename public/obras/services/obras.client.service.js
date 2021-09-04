'use strict';

//Crear el service 'obras'
angular.module('obras').factory('Obras',['$resource', function($resource){
	//Usar el service '$resource' para devolver un objeto '$resource' obra
	//console.log("Uso servicio obras");
	return $resource('api/obras/:obraId',{
		obraId:'@_id'
	},{
		update:{
			method:'PUT'
		}
	});
}]);
