	'use scrict'

	//Controller obras
	angular.module('instrumentos').controller('InstrumentosController',['$scope','$routeParams','$location','Authentication','Instrumentos','Proyectos',
		function($scope, $routeParams, $location, Authentication,  Instrumentos,Proyectos){
			//Exponer el servicio Authentication
			$scope.authentication=Authentication;
			$scope.tipoFuente=["Editor","Fabricante","Publicador","Distribuidor"]
			$scope.criterio=["Rata de muestreo","Resolución","Tipo de cinta","Calidad de grabación","Tipo de archivo","Dimensiones","Duración"];
			$scope.coberturas=["Local","País","Mundial"];
			$scope.sitios=["Andes","Pacífico","Atlántico","Llanos"];
			$scope.dEtiquetas=["Interés pedagógico", "Obra representativa", "Relación con línea de investigación"];
			$scope.idActores =[];
			$scope.idAnotacionesCartograficoTemporales=[];
			$scope.idProyectos =[];
			$scope.idDescriptores=[];
			$scope.idSistemasSonoros=[];
			$scope.idEnlaces=[];
			$scope.idAlias=[];
			$scope.idMediosSonoros=[];
			$scope.idObrasRelacionadas=[];
			$scope.idDTecnicas=[];
			$scope.actorName=[];
			$scope.errorclass="form-control"; 
			$scope.reverse=false;
			$scope.proyectos=Proyectos.query();

//Preparar datos
$scope.actualizarTodo=function(){
	$scope.idProyectos=this.instrumento.proyectosAsociados;
	$scope.idDescriptores=this.instrumento.descriptorLibre;
	$scope.idEnlaces=this.instrumento.vinculoRelacionado;
	$scope.idAnotacionesCartograficoTemporales=this.instrumento.anotacionCartograficoTemporal;
	$scope.idAlias=this.instrumento.alias;
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
$scope.verAnotacion=function(x){
	y="";
	for(var i in x){
		y=y+x[i].lugar+", "+x[i].evento+", "+x[i].coberturaAmplitud+", "+x[i].fechaInicio+", "+ x[i].fechaFin+", "+ x[i].evidencias+ ". ";	
	};
	return $scope.darFormato(y);
}

$scope.verAlias=function(x){
	y="";
	for(var i in x){
		y=y+x[i].nombre+", ";	
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

$scope.verProyecto=function(x){
	y="";
	for(var i in x){
		y=y+$scope.proyectoAux(x[i].proyecto)+", ";	
	};
	return $scope.darFormato(y);
};

$scope.verVinculo=function(x){

	y="";
	for(var i in x){
		y=x[i].etiqueta+"("+x[i].url+"), ";
	};
	return $scope.darFormato(y);
};

//Proyectos
$scope.proyectoAux=function(aux){
	//var tmp=JSON.parse($scope.obrasAux);
	for (var i in $scope.proyectos){
					if($scope.proyectos[i].id===aux){
				return $scope.proyectos[i].nombre;
											}
				}
}



$scope.updateProyectos=function(){
	$scope.proyectos=Proyectos.query();
};

	$scope.proyectoAdd = function(x) {
		x="proyecto:"+this.proyecto;
        var properties = x.split(',');
	var obj = {};
	properties.forEach(function(property) {
    var tup = property.split(':');
    obj[tup[0]] = tup[1];
    
});
        $scope.idProyectos.push(obj);
    };

 $scope.proyectoRemove = function(x) {
 	
     				for (var i in $scope.idProyectos){
     					alert("va a eliminar a "+ $scope.proyectoAux(x));
					if($scope.idProyectos[i].proyecto===x){
						$scope.idProyectos.splice(i,1);
					}
				}
    };

//Alias
	$scope.aliasAdd = function() {
		var x= "nombre:"+this.alias;
	    var properties = x.split(',');
		var obj = {};
		properties.forEach(function(property) {
	    var tup = property.split(':');
	    obj[tup[0]] = tup[1];
		this.alias="";
	});
	$scope.idAlias.push(obj);
};

 $scope.aliasRemove = function(x) {
 				alert("va a eliminar a "+x.nombre);
     				for (var i in $scope.idAlias){
					if($scope.idAlias[i]===x){
						$scope.idAlias.splice(i,1);
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


//Proyectos
//Proyectos
	$scope.proyectoAdd = function() {
		x="proyecto:"+this.proyecto;
        var properties = x.split(',');
	var obj = {};
	properties.forEach(function(property) {
    var tup = property.split(':');
    obj[tup[0]] = tup[1];
    
});
        $scope.idProyectos.push(obj);
    };

 $scope.proyectoRemove = function(x) {
 	
     				for (var i in $scope.idProyectos){
     					alert("va a eliminar a "+ $scope.proyectoAux(x));
					if($scope.idProyectos[i].proyecto===x){
						$scope.idProyectos.splice(i,1);
					}
				}
    };


		//Crear método controller para crear nuevas obras
		$scope.create=function(){
			//Usar los campos form para crear un nuevo objeto $resource obra
			var instrumento=new Instrumentos({
				nombre: this.nombre,
				clasificacion: this.clasificacion,
				alias:$scope.idAlias,
				descriptorLibre:$scope.idDescriptores,
				proyectosAsociados:$scope.idProyectos,
				anotacionCartograficoTemporal:$scope.idAnotacionesCartograficoTemporales,
				vinculoRelacionado:$scope.idEnlaces
			});

			//Usar el método '$save' de obra para enviar una petición POST apropiada
			instrumento.$save(function(response){
				//Si el instrumento fue creado de la manera correcta, redireccionar a la página de la obra
				$location.path('instrumentos/' + response._id);
				alert("El instrumento ha sido creado");
			}, function(errorResponse){
				//En caso contrario, presentar mensaje de error
				alert("No creado:"+ errorResponse.data.message);
				$scope.error=errorResponse.data.message;
			});
			
	
		};
		//Método controller para recuperar la lista de obras
		$scope.find=function(){
			//Usar el método 'querry' de obra, para enviar una petición GET apropiada
			$scope.instrumentos=Instrumentos.query();
		};

		//Método controller para recuperar una única obra
		$scope.findOne=function(){
			//Usa el método 'get' de obra para enviar una petición GET apropiada
			$scope.instrumento=Instrumentos.get({
				instrumentoId: $routeParams.instrumentoId
			});
		};



		//Método controller para actualizar una única obra
		$scope.update=function(){

			//Usa el método $update de obra para enviar la petición PUT adecuada
			$scope.instrumento.$update(function(){
				//Si la actualización es correcta, redireccionar
				$location.path('instrumentos/' + $scope.instrumento._id);
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