'use scrict'

//Controller obras
angular.module('ejemplares').controller('EjemplaresController',['$scope','$routeParams','$location','Authentication', 'Ejemplares','Recursos',
	'Fondos','Colecciones',
	function($scope, $routeParams, $location, Authentication,Ejemplares,Recursos,Fondos,Colecciones){
		//Exponer el servicio Authentication
		$scope.authentication=Authentication;
		$scope.estados=["Óptimo","Apostillado","Marbete rayado o ilegible","Rayado","Trozos faltantes","Mutilado","Inservible","Lévemente deteriorado","Copia de circulación"];
		$scope.disponibilidades=["Disponible","En préstamo","Restringido","Reservado","En proceso técnico"];
		$scope.sitios=["Andes","Pacífico","Atlántico","Llanos"];
		$scope.coberturas=["Local","País","Mundial"];
		$scope.idEstados=[];
		$scope.recursos =Recursos.query();
		$scope.fondos =Fondos.query();
		$scope.coleccions =Colecciones.query();
		$scope.reverse=false;
//Preparar datos
$scope.actualizarTodo=function(){
	$scope.idEstados=this.ejemplar.estados;
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

$scope.verRecurso=function(x){

	y="";
	for(var i in x){
		y=$scope.recursoAux(x);
	};
	return y;
};

$scope.recursoAux=function(aux){
	for (var i in $scope.recursos){
					if($scope.recursos[i].id===aux){
				return $scope.recursos[i].titulo;
											}
				}
};

$scope.verFondo=function(x){

	y="";
	for(var i in x){
		y=$scope.fondoAux(x);
	};
	return y;
};

$scope.fondoAux=function(aux){
	for (var i in $scope.fondos){
					if($scope.fondos[i].id===aux){
				return $scope.fondos[i].nombre;
											}
				}
};

$scope.verColeccion=function(x){

	y="";
	for(var i in x){
		y=$scope.coleccionAux(x);
	};
	return y;
};

$scope.coleccionAux=function(aux){
	for (var i in $scope.coleccions){
					if($scope.coleccions[i].id===aux){
				return $scope.coleccions[i].nombre;
											}
				}
};

$scope.verEstados=function(x){
	y="";
	for(var i in x){
		y=y+x[i].etiqueta+": "+x[i].contenido+", ";	
	};
	return $scope.darFormato(y);
}
//Menú descriptores libres
	$scope.estadoAdd = function() {
			var x= "etiqueta:"+this.estadoEtiqueta+",contenido:"+this.estadoContenido;
	        var properties = x.split(',');
		var obj = {};
		properties.forEach(function(property) {
	    var tup = property.split(':');
	    obj[tup[0]] = tup[1];
	    
	});
	        $scope.idEstados.push(obj);
	    };

	 $scope.estadoRemove = function(x) {
	     				for (var i in $scope.idEstados){
						if($scope.idEstados[i].etiqueta===x){
					alert("va a eliminar a "+ $scope.idEstados[i].etiqueta+ ", "+ $scope.idEstados[i].contenido);
							$scope.idEstados.splice(i,1);
						}; 
					};
	    };

	//Crear método controller para crear nuevas obras
	$scope.create=function(){
		//Usar los campos form para crear un nuevo objeto $resource obra
		var ejemplar=new Ejemplares({
			recurso:this.recurso,
			numeroEjemplar:this.numeroEjemplar,
			disponibilidad:this.disponibilidad,
			fondo:this.fondo,
			coleccion:this.coleccion,
			procedencia:this.procedencia,
			estados:$scope.idEstados
		});
		//Usar el método '$save' de obra para enviar una petición POST apropiada
		ejemplar.$save(function(response){
			//Si la obra fue creada de la manera correcta, redireccionar a la página de la obra
			alert("El registro ha sido creado");
			$location.path('ejemplares/' + response._id);
		}, function(errorResponse){
			//En caso contrario, presentar mensaje de error
			alert("No creado: "+ errorResponse.data.message);
			$scope.error=errorResponse.data.message;
		});	
	};
	//Método controller para recuperar la lista de obras
	$scope.find=function(){
		//Usar el método 'querry' de obra, para enviar una petición GET apropiada
		$scope.ejemplares=Ejemplares.query();
	};

	//Método controller para recuperar una única obra
	$scope.findOne=function(){
		//Usa el método 'get' de obra para enviar una petición GET apropiada
		$scope.ejemplar=Ejemplares.get({
			ejemplarId: $routeParams.ejemplarId
		});
	};



	//Método controller para actualizar una única obra
	$scope.update=function(){
	//Agregar actores
			for (var i in $scope.idActores){
			actorObra=new ActoresObras({
				actor:$scope.idActores[i].id,
				obra: $routeParams.obraId,
				roll: $scope.idActores[i].rol,
		});
			
					
		//Usar el método '$save' de actor para enviar una petición POST apropiada
		actorObra.$save(function(response){
			//$location.path('obras/' + obraId);
		}, function(errorResponse){
			//En caso contrario, presentar mensaje de error
			$scope.error=errorResponse.data.message;
			alert("Problemas al crear el registro "+$scope.error);
		});
		}


		//Usa el método $update de obra para enviar la petición PUT adecuada
		$scope.ejemplar.$update(function(){
			//Si la actualización es correcta, redireccionar
			$location.path('ejemplares/' + $scope.ejemplar._id);
		}, function(errorResponse){
			$scope.error=errorResponse.data.message;
		});
	};

	//Método controller para borrar una obra
	$scope.delete=function(obra){

		var r = confirm("¿Realmente desea borrar el registro?");
if (r == true) {
		//Si una obra es enviado al método, borrarlo
		if (obra){
			//Confirmar

			//Usar el método '$remove' del la obra para borrarla
			obra.$remove(function(){
				//Eliminar la obra de la lista
				for (var i in $scope.obras){
					if($scope.obras[i]===obra){
						$scope.obras.splice(i,1);
					}
				}
			});
		} else {
			//En otro caso usar el método $remove para borrar
			$scope.obra.$remove(function(){
				$location.path('obras');
			});
		}
} else {

}

	};

}
]);