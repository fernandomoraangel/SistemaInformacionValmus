'use strict';

//Crear el service 'descriptores'
angular.module('descriptores').factory('descriptores',['$resource', function($resource){
	//Usar el service '$resource' para devolver un objeto '$resource' obra
	//console.log("Uso servicio descriptores");
	return $resource('api/descriptores/:descriptorId',{
		obraId:'@_id'
	},{
		update:{
			method:'PUT'
		}
	});
}]);
