'use strict';

//Crear el service 'relaciones'
angular.module('relaciones').factory('relaciones',['$resource', function($resource){
	//Usar el service '$resource' para devolver un objeto '$resource' obra
	//console.log("Uso servicio relaciones");
	return $resource('api/relaciones/:relacionId',{
		obraId:'@_id'
	},{
		update:{
			method:'PUT'
		}
	});
}]);
