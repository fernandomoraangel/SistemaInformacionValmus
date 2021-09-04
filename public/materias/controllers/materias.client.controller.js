	'use scrict'

	//Controller materias
	angular.module('materias').controller('MateriasController',['$scope','$routeParams','$location','Authentication', 'Obras','Actores','ActoresObras','Materias',
		function($scope, $routeParams, $location, Authentication,  Obras, Actores,ActoresObras,Materias){
			//Exponer el servicio Authentication
			$scope.authentication=Authentication;
			$scope.items=["Si","No"];
			$scope.rols=["Autor letra","Autor música", "Arreglista","Compilador"];
			$scope.tipos=["Partitura","Grabación de audio","Grabación de video","Libro","Revista"];
			$scope.medios=["Solista","Orquesta","Banda", "Solista con acompañamiento"];
			$scope.sistemasSonoros=["Temperado","No-temperado","Tonal","Modal","Politonal","Pantonal"];
			$scope.idiomas=["Español", "Inglés","Francés", "Quechua", "Aymara"];
			$scope.generos=["Canción","Bambuco","Pasillo","Joropo","Vals", "Danza","Bolero"];
			$scope.eventos=["Composición","Estreno","Primera grabación"];
			$scope.lugares=["Andes","Pacífico","Atlántico","Llanos"];
			$scope.coberturas=["Local","País","Mundial"];
			$scope.proyectos=["Andes","Emisoras","Industria discográfica"];
			$scope.nNormalizados=["ISBN","ISSN","ISMN", "ISAN","ISWC","ISRC"];
			$scope.dEtiquetas=["Interés pedagógico", "Obra representativa", "Relación con línea de investigación"]
			$scope.idActores =[];
			$scope.idAnotacionesCartograficoTemporales=[];
			$scope.idProyectos =[];
			$scope.idNormalizados=[];
			$scope.idDescriptores=[];
			$scope.idSistemasSonoros=[];
			$scope.idIdiomas=[];
			$scope.idTipos=[];
			$scope.idMediosSonoros=[];
			$scope.idAlias=[];
			$scope.idPadres=[];
			$scope.idHijos=[];
			$scope.materias=Materias.query();
			$scope.actorName=[];
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

$scope.verAlias=function(x){
	console.log(x);
  y="";
  for(var i in x){
	  y=y+$scope.materiaAux(x[i].materiarelacionadaid)+", ";	
  };
  return $scope.darFormato(y);
}

$scope.verRecurso=function(x){

	y="";
	for(var i in x){
		y=$scope.recursoAux(x);
	};
	return y;
};

	$scope.materiaAux=function(aux){
	var out ="";
	try{
		for (var i in $scope.materias){
						if($scope.materias[i]._id===aux){
					out= $scope.materias[i].nombre;
												}
					
					}
	}
	catch(e){
		alert("error "+e)
	}
	//alert(out);
	return out;
	}

	$scope.updateMaterias=function(){
		$scope.materias=Materias.query();
		console.log("Materias actualizadas")
	}

//Materia relacionada
	$scope.materiaRelacionadaAdd = function() {
		x="materiarelacionadaid:"+this.materiaRelacionada.trim()+",nombre:"+$scope.materiaAux(this.materiaRelacionada);
		var properties = x.split(',');
		var obj = {};
		properties.forEach(function(property) {
	    var tup = property.split(':');
	    obj[tup[0]] = tup[1];
	});
	        $scope.idAlias.push(obj);
	    };
	 $scope.materiaRelacionadaRemove = function(x) {
	     				for (var i in $scope.idAlias){
						if($scope.idAlias[i].materiarelacionadaid===x){
					alert("va a eliminar a "+ $scope.materiaAux(x));
							$scope.idAlias.splice(i,1);
						}
					}
	    };

//Padres
	$scope.padresAdd = function() {
		x="materiarelacionadaid:"+this.padres.trim()+",nombre:"+$scope.materiaAux(this.padres);
		var properties = x.split(',');
		var obj = {};
		properties.forEach(function(property) {
	    var tup = property.split(':');
	    obj[tup[0]] = tup[1];
	});
	        $scope.idPadres.push(obj);
	    };
	 $scope.padresRemove = function(x) {
	 	
	     				for (var i in $scope.idPadres){
						if($scope.idPadres[i].materiarelacionadaid===x){
					alert("va a eliminar a "+ $scope.materiaAux(x));
							$scope.idPadres.splice(i,1);
						}
					}
	    };

//Hijos, revisar
	$scope.hijosAdd = function() {
		x="materiarelacionadaid:"+this.hijos.trim()+",nombre:"+$scope.materiaAux(this.hijos);
		var properties = x.split(',');
		var obj = {};
		properties.forEach(function(property) {
	    var tup = property.split(':');
	    obj[tup[0]] = tup[1];
	});
	        $scope.idHijos.push(obj);
	    };
	 $scope.hijosRemove = function(x) {
	 	
	     				for (var i in $scope.idHijos){
						if($scope.idHijos[i].materiarelacionadaid===x){
					alert("va a eliminar a "+ $scope.materiaAux(x));
							$scope.idHijos.splice(i,1);
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


	
		//Crear método controller para crear nuevas materias
		$scope.create=function(){
			//Usar los campos form para crear un nuevo objeto $resource obra
			var materia=new Materias({
				nombre: this.nombre,
				alias:$scope.idAlias,
				padres:$scope.idPadres,
				hijos:$scope.idHijos,
				descripcion:this.descripcion,
				descriptorLibre:$scope.idDescriptores
			});

			//Usar el método '$save' de obra para enviar una petición POST apropiada
			materia.$save(function(response){
				//Si la obra fue creada de la manera correcta, redireccionar a la página de la obra
				//$location.path('recursos/' + response._id);
				alert("La materia ha sido creada");
			}, function(errorResponse){
				//En caso contrario, presentar mensaje de error
				
				$scope.error=errorResponse.data.message;
				alert("No creado "+$scope.error);
			});
			
	
		};
		//Método controller para recuperar la lista de obras
		$scope.find=function(){
			//Usar el método 'querry' de materia, para enviar una petición GET apropiada
			$scope.materias=Materias.query();
		};

		//Método controller para recuperar una única obra
		$scope.findOne=function(){
			//Usa el método 'get' de obra para enviar una petición GET apropiada
			$scope.obra=Obras.get({
				obraId: $routeParams.obraId
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
			$scope.obra.$update(function(){
				//Si la actualización es correcta, redireccionar
				$location.path('obras/' + $scope.obra._id);
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