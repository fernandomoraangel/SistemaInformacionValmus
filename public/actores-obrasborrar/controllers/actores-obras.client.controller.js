'use scrict'

//Controller Actores
angular.module('actoresObras').controller('ActoresObrasController',['$scope', '$routeParams', '$location', 'Authentication', 'ActoresObras',
	function($scope, $routeParams, $location, Authentication, ActoresObras){
		//Exponer el servicio Authentication
		$scope.authentication=Authentication;
		$scope.items=["Si","No"];
		$scope.roles=["Autor letra","Autor música", "Arreglista", "Colector", "Editor"];
	//Crear método controller para crear nuevas Actores
	$scope.create=function(){
		//Usar los campos form para crear un nuevo objeto $resource actor
		var actorObra=new ActoresObras({
			actor: this.actor,
			obra:this.obra,
			roll:this.roll,
		});
		//Usar el método '$save' de actor para enviar una petición POST apropiada
		actorObra.$save(function(response){
			//Si el actor fue creada de la manera correcta, redireccionar a la página de la actor
			//$location.path('actores/' + response._id);
			$location.path('actoresObras/' );
		}, function(errorResponse){
			//En caso contrario, presentar mensaje de error
			$scope.error=errorResponse.data.message;
		});
	};
	//Método controller para recuperar la lista de Actores
	$scope.find=function(){
		//Usar el método 'querry' de actor, para enviar una petición GET apropiada
		$scope.actoresObras=ActoresObras.query();
	};

	//Método controller para recuperar una única actor
	$scope.findOne=function(){
		//Usa el método 'get' de actor para enviar una petición GET apropiada
		$scope.actorObra=ActoresObras.get({
			actorObraId: $routeParams.actorObraId
		});
	};

	//Método controller para actualizar una única actor
	$scope.update=function(){
		//Usa el método $update de actor para enviar la petición PUT adecuada
		$scope.actorObra.$update(function(){
			//Si la actualización es correcta, redireccionar
			$location.path('ActoresObras/' + $scope.actorObra._id);
		}, function(errorResponse){
			$scope.error=errorResponse.data.message;
		});
	};

	//Método controller para borrar una actor
	$scope.delete=function(actorObra){
		//Si una actor es enviado al método, borrarlo
		if (actorObra){
			//Usar el método '$remove' del la actor para borrarla
			actor.$remove(function(){
				//Eliminar la actor de la lista
				for (var i in $scope.ActoresObras){
					if($scope.ActoresObras[i]===actorObra){
						$scope.ActoresObras.splice(i,1);
					}
				}
			});
		} else {
			//En otro caso usar el método $remove para borrar
			$scope.actor.$remove(function(){
				$location.path('/ActoresObras');
			});
		}
	};

}

	
]);