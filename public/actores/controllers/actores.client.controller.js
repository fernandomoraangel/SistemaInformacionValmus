'use scrict'

//Controller Actores
angular.module('actores').controller('ActoresController',['$scope', '$routeParams', '$location', 'Authentication', 'Actores',
	function($scope, $routeParams, $location, Authentication, Actores){
		//Exponer el servicio Authentication
		$scope.authentication=Authentication;
		$scope.coberturas=["Local","País","Mundial"];
		$scope.lugares=["Andes","Pacífico","Atlántico","Llanos"];
		$scope.dEtiquetas=["Interés pedagógico", "Obra representativa", "Relación con línea de investigación"];
		$scope.idContenedores=[];
		$scope.idAnotacionesCartograficoTemporales=[];
		$scope.idDescriptores=[];
		$scope.idEnlaces=[];
		$scope.actores=Actores.query();
		$scope.reverse = false;

// Funciones auxiliares

$scope.sortBy = function(propertyName) {
	$scope.reverse = !$scope.reverse;
  };

$scope.darFormato=function(y){
	
	while(y.indexOf("undefined,")>0)
	{
		y=y.slice(0, y.indexOf("undefined,"))+y.slice(y.indexOf("undefined,")+10, length);
	};
	y=y.slice(0, y.length-2);
	return y;
}

//Actualizar para editar
$scope.actualizarTodo=function(){
	$scope.idContenedores=this.actor.contenedor;
	$scope.idAnotacionesCartograficoTemporales=this.actor.anotacionCartograficoTemporal;
	$scope.idDescriptores=this.actor.descriptores;
	$scope.idEnlaces=this.actor.vinculoRelacionado;
}
// Ver
$scope.verContenedores=function(x){
	y="";
	for(var i in x){
		y=y+$scope.actorAux(x[i].id)+", ";	
	};
	return $scope.darFormato(y);
};

$scope.verAnotacion=function(x){
	y="";
	for(var i in x){
		y=y+x[i].lugar+", "+x[i].evento+", "+x[i].coberturaAmplitud+", "+x[i].fechaInicio+", "+ x[i].fechaFin+", "+ x[i].evidencias+ ". ";	
	};
	return $scope.darFormato(y);
}

$scope.verDescriptor=function(x){
	y="";
	for(var i in x){
		y=y+x[i].etiqueta+": "+x[i].contenido+", ";	
	};
	return $scope.darFormato(y);
}

$scope.verVinculo=function(x){
	y="";
	for(var i in x){
		y=y+x[i].etiqueta+" ("+x[i].url+"), ";	
	};
	return $scope.darFormato(y);
};


//Actores
$scope.updateActores=function(){
	$scope.actores=Actores.query();
};

$scope.actorAux=function(aux){
	for (var i in $scope.actores){
					if($scope.actores[i].id===aux){
				return $scope.actores[i].fullName;
											}
				}
};

	$scope.actorAdd = function() {
	var existe = false;
	var x="id:"+this.contenedor;
    var properties = x.split(',');
	var obj = {};
	properties.forEach(function(property) {
    var tup = property.split(':');
    obj[tup[0]] = tup[1];
});
	if (
        this.contenedor === undefined ||
        this.contenedor === ""
      ) {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar un actor",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idContenedores.indexOf(x) === -1) {
          for (var i in $scope.idContenedores) {
            if (
              $scope.idContenedores[i].id === this.contenedor
             
            ) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "El actor se ya encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
			  this.contenedor = "";
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idContenedores.push(obj);
          this.contenedor = "";
        }
      }
    };

 $scope.actorRemove = function(x) {
 	
     				for (var i in $scope.idContenedores){
						Swal.fire({
							title: "¡Advertencia de eliminación!",
							text: "Va a eliminar  " + $scope.actorAux(x),
							icon: "warning",
							confirmButtonText: "Cerrar",
						  });
					if($scope.idContenedores[i].id===x){
						$scope.idContenedores.splice(i,1);
					}
				}
    };

//Anotaciones cartográfico temporales

		$scope.anotacionCartograficoTemporalAdd = function() {	
		var x= "lugar:"+this.lugar+",evento:"+this.evento+",coberturaAmplitud:"+this.coberturaAmplitud+",fechaInicio:"+this.fechaDeInicio+",fechaFin:"+this.fechaDeFin+",evidencia:"+this.evidencia;
	    var properties = x.split(',');
		var obj = {};
		properties.forEach(function(property) {
	    var tup = property.split(':');
	    obj[tup[0]] = tup[1];
	    
	});
	        $scope.idAnotacionesCartograficoTemporales.push(obj);
	    };

	 $scope.anotacionCartograficoTemporalRemove = function(x) {
	     				for (var i in $scope.idAnotacionesCartograficoTemporales){
						if($scope.idAnotacionesCartograficoTemporales[i].lugar===x){
					alert("va a eliminar a "+ $scope.idAnotacionesCartograficoTemporales[i].lugar);
							$scope.idAnotacionesCartograficoTemporales.splice(i,1);
						}
					}
	    };
//Menú descriptores libres
	$scope.dDescriptorAdd = function() {
			//alert(x);
			var x= "etiqueta:"+this.dEtiqueta+",contenido:"+this.dContenido;
	        var properties = x.split(',');
		var obj = {};
		properties.forEach(function(property) {
	    var tup = property.split(':');
	    obj[tup[0]] = tup[1];
	    
	});
	        $scope.idDescriptores.push(obj);
	    };

	 $scope.dDescriptorRemove = function(x) {
	 				//alert(x);
	     				for (var i in $scope.idDescriptores){
						if($scope.idDescriptores[i].contenido===x){
					alert("va a eliminar a "+ $scope.idDescriptores[i].contenido);
							$scope.idDescriptores.splice(i,1);
						}
					}
	    };

//Menú enlaces
	$scope.enlaceAdd = function() {
			//alert(x);
			var x= "etiqueta:"+this.eEtiqueta+",url:"+this.eUrl;
	        var properties = x.split(',');
		var obj = {};
		properties.forEach(function(property) {
	    var tup = property.split(':');
	    obj[tup[0]] = tup[1];
	    
	});
	        $scope.idEnlaces.push(obj);
	    };

	 $scope.enlaceRemove = function(x) {
	 				alert(x);
	     				for (var i in $scope.idEnlaces){
						if($scope.idEnlaces[i].etiqueta===x){
					alert("va a eliminar a "+ $scope.idEnlaces[i].etiqueta);
							$scope.idEnlaces.splice(i,1);
						}
					}
	    };



	//Crear método controller para crear nuevas Actores
	$scope.create=function(){
		//Usar los campos form para crear un nuevo objeto $resource actor
		var actor=new Actores({
			nombres: this.nombres,
			apellidos:this.apellidos,
			nombreReunion:this.nombreReunion,
			contenedor:$scope.idContenedores,
			anotacionCartograficoTemporal:$scope.idAnotacionesCartograficoTemporales,
			descriptores:$scope.idDescriptores,
			vinculoRelacionado:$scope.idEnlaces
		});
		//Usar el método '$save' de actor para enviar una petición POST apropiada
		actor.$save(function(response){
			//Si el actor fue creada de la manera correcta, redireccionar a la página de la actor
			$location.path('actores/'+ response._id);
		}, function(errorResponse){
			//En caso contrario, presentar mensaje de error
			$scope.error=errorResponse.data.message;
		});
	};
	//Método controller para recuperar la lista de Actores
	$scope.find=function(){
		//Usar el método 'querry' de actor, para enviar una petición GET apropiada
		$scope.actores=Actores.query();
	};

	//Método controller para recuperar una única actor
	$scope.findOne=function(){
		//Usa el método 'get' de actor para enviar una petición GET apropiada
		$scope.actor=Actores.get({
			actorId: $routeParams.actorId
		});
	};

	//Método controller para actualizar una única actor
	$scope.update=function(){
		//Usa el método $update de actor para enviar la petición PUT adecuada
		$scope.actor.$update(function(){
			//Si la actualización es correcta, redireccionar
			$location.path('actores/' + $scope.actor._id);
		}, function(errorResponse){
			$scope.error=errorResponse.data.message;
		});
	};

	//Método controller para borrar una actor
	$scope.delete=function(actor){
		//Si una actor es enviado al método, borrarlo
		if (actor){
			//Usar el método '$remove' del la actor para borrarla
			actor.$remove(function(){
				//Eliminar la actor de la lista
				for (var i in $scope.Actores){
					if($scope.Actores[i]===actor){
						$scope.Actores.splice(i,1);
					}
				}
			});
		} else {
			//En otro caso usar el método $remove para borrar
			$scope.actor.$remove(function(){
				$location.path('Actores');
			});
		}
	};

}

	
]);