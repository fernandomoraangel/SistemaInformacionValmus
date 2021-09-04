var mainApplicationModuleName='simr';

var mainApplicationModule=angular.module(mainApplicationModuleName,['ngResource','ngRoute','users','example','obras','actores','actoresObras','recursos','ejemplares','proyectos','fondos','colecciones','medios','sistemas','materias','generos','descriptores','relaciones','instrumentos','idiomas','diccionarios']);

mainApplicationModule.config(['$locationProvider',
	function($locationProvider){
		$locationProvider.hashPrefix('!');
	}
	]);
angular.element(document).ready(function(){
	angular.bootstrap(document,[mainApplicationModuleName]);


});
