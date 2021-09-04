'use scrict'

//Controller diccinarios
angular.module('diccionarios').controller('DiccionariosController',['$scope','$routeParams','$location','Authentication','Diccionarios',
	function($scope, $routeParams, $location, Authentication, Diccionarios){
		//Exponer el servicio Authentication
		$scope.authentication=Authentication;
		$scope.idEstados=[];
		$scope.reverse=false;
//Preparar datos
$scope.actualizarTodo=function(){
	$scope.idEstados=this.diccionario.estados;
}

// Funciones auxiliares
$scope.sortBy = function(propertyName) {
	$scope.reverse = !$scope.reverse;
  };

$scope.darFormato=function(y){
	
	while(y.indexOf("undefined,")>0)
	{
		y=y.slice(0, y.indexOf("undefined,"))+y.slice(y.indexOf("undefined,")+10, length);
	}
	
	y=y.slice(0, y.length-2);
	return y;
}

	//Crear método controller para crear nuevos idiomas
	$scope.create=function(){
		//Usar los campos form para crear un nuevo objeto $resource 
		var diccionario=new Diccionarios({
			tabla:this.tabla,
			campo:this.campo,
			definicion:this.definicion,
			campoLargo:this.campoLargo

		});
		//Usar el método '$save' para enviar una petición POST apropiada
		diccionario.$save(function(response){
			//Si el diccionario fue creado de la manera correcta, redireccionar a la página del diccionario
			alert("El registro ha sido creado");
			$location.path('diccionarios/' + response._id);
		}, function(errorResponse){
			//En caso contrario, presentar mensaje de error
			alert("No creado: "+ errorResponse.data.message);
			$scope.error=errorResponse.data.message;
		});	
	};
	//Método controller para recuperar la lista de registros
	$scope.find=function(){
		//Usar el método 'querry' de diccionario, para enviar una petición GET apropiada
		$scope.diccionarios=Diccionarios.query();
	};

	//Método controller para recuperar una única obra
	$scope.findOne=function(){
		//Usa el método 'get' de idioma para enviar una petición GET apropiada
		$scope.diccionario=Diccionarios.get({
			diccionarioId: $routeParams.diccionarioId
		});
	};



	//Método controller para actualizar una único diccionario
	$scope.update=function(){
			for (var i in $scope.idDiccionarios){
			diccionario=new Diccionarios({  
				diccionario:$scope.idDiccionarios[i].id
		});


		/* $scope.update = function () {
			//Usa el método $update de obra para enviar la petición PUT adecuada
			$scope.diccionario.$update(
			  function () {
				//Si la actualización es correcta, redireccionar
				$location.path("diccionarios/" + $scope.diccionario._id);
			  },
			  function (errorResponse) {
				$scope.error = errorResponse.data.message;
			  }
			);
		  }; */
			
					
		//Usar el método '$save' de actor para enviar una petición POST apropiada
		diccionario.$save(function(response){
			//$location.path('obras/' + obraId);
		}, function(errorResponse){
			//En caso contrario, presentar mensaje de error
			$scope.error=errorResponse.data.message;
			alert("Problemas al crear el registro "+$scope.error);
		});
		}


		//Usa el método $update de obra para enviar la petición PUT adecuada
		$scope.diccionario.$update(function(){
			//Si la actualización es correcta, redireccionar
			$location.path('diccionarios/' + $scope.diccionario._id);
		}, function(errorResponse){
			$scope.error=errorResponse.data.message;
		});
	};

	//Método controller para borrar un diccionario
	$scope.delete=function(diccionario){

		var r = confirm("¿Realmente desea borrar el registro? ");
if (r == true) {
		//Si un diccionario es enviado al método, borrarlo
		if (diccionario){
			//Usar el método '$remove' del diccionario para borrarla
			diccionario.$remove(function(){
				//Eliminar el diccionario de la lista
				for (var i in $scope.diccionarios){
					if($scope.diccionarios[i]===diccionario){
						$scope.diccionarios.splice(i,1);
					}
				}
			});
		} else {
			//En otro caso usar el método $remove para borrar
			$scope.diccionario.$remove(function(){
				$location.path('diccionarios');
			});
		}
} else {

}

	};

}
]);