	'use scrict'

	//Controller géneros
	angular.module('generos').controller('GenerosController',['$scope','$routeParams','$location','Authentication','Generos','Proyectos', 'Sistemas','Medios',
		function($scope, $routeParams, $location, Authentication,Generos,Proyectos,Sistemas,Medios){
			//Exponer el servicio Authentication
			$scope.authentication=Authentication;
			$scope.items=["Si","No"];
			$scope.rols=["Autor letra","Autor música", "Arreglista","Compilador"];
			$scope.tipos=["Partitura","Grabación de audio","Grabación de video","Libro","Revista"];
			$scope.medios=Medios.query();
			$scope.sistemas=Sistemas.query();
			$scope.idiomas=["Español", "Inglés","Francés", "Quechua", "Aymara"];
			$scope.generos=["Canción","Bambuco","Pasilo","Joropo","Vals", "Danza","Bolero"];
			$scope.eventos=["Composición","Estreno","Primera grabación"];
			$scope.lugares=["Andes","Pacífico","Atlántico","Llanos"];
			$scope.coberturas=["Local","País","Mundial"];
			$scope.proyectos=["Andes","Emisoras","Industria discográfica"];
			$scope.nNormalizados=["ISBN","ISSN","ISMN", "ISAN","ISWC","ISRC"];
			$scope.dEtiquetas=["Interés pedagógico", "Obra representativa", "Relación con línea de investigación"]
			$scope.idActores =[];
			$scope.idAnotacionesCartograficoTemporales=[];
			$scope.idProyectos =[];$scope.idProyectos =[];
			$scope.proyectos=Proyectos.query();
			$scope.idNormalizados=[];
			$scope.idDescriptores=[];
			$scope.idSistemas=[];
			$scope.idIdiomas=[];
			$scope.idTipos=[];
			$scope.idMedios=[];
			$scope.idAlias=[];
			$scope.idPadres=[];
			$scope.idHijos=[];
			$scope.generos=Generos.query();
			var obraId;$scope.reverse=false;
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
				  y=y+$scope.generoAux(x[i].generorelacionadoid)+", ";	
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


//Parece que no es está usando
	$scope.generoAux=function(aux){
	var out ="";
	try{
		aux=aux.trim();
		for (var i in $scope.generos){
						if($scope.generos[i]._id===aux){
					out= $scope.generos[i].nombre;
												}
					
					}
	}
	catch(e){
		alert("error "+e)
	}
	//alert(out);
	return out;
	}

	$scope.autorAux=function(aux){
		for (var i in $scope.actores){
						if($scope.actores[i]._id===aux){
							return $scope.actores[i].fullName;
						}
					}
	}

	$scope.updateGeneros=function(){
		$scope.generos=Generos.query();
		//console.log("Géneros actualizados")
	}

	


//Género relacionado
	$scope.generoRelacionadoAdd = function() {
		x="generorelacionadoid:"+this.generoRelacionado.trim()+",nombre:"+$scope.generoAux(this.generoRelacionado);
		var properties = x.split(',');
		var obj = {};
		properties.forEach(function(property) {
	    var tup = property.split(':');
	    obj[tup[0]] = tup[1];
	});
	        $scope.idAlias.push(obj);
	    };
	 $scope.generoRelacionadoRemove = function(x) {
	     				for (var i in $scope.idAlias){
						if($scope.idAlias[i].generorelacionadoid===x){
					alert("va a eliminar a "+ $scope.generoAux(x));
							$scope.idAlias.splice(i,1);
						}
					}
	    };

//Padres
	$scope.padresAdd = function() {
		x="generorelacionadoid:"+this.padres.trim()+",nombre:"+$scope.generoAux(this.padres);
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
						if($scope.idPadres[i].generorelacionadoid===x){
					alert("va a eliminar a "+ $scope.generoAux(x));
							$scope.idPadres.splice(i,1);
						}
					}
	    };

//Hijos
	$scope.hijosAdd = function() {
		x="generorelacionadoid:"+this.hijos.trim()+",nombre:"+$scope.generoAux(this.hijos);
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
						if($scope.idHijos[i].generorelacionadoid===x){
					alert("va a eliminar a "+ $scope.generoAux(x));
							$scope.idHijos.splice(i,1);
						}
					}
	    };


//Proyectos
$scope.updateProyectos=function(){
	$scope.proyectos=Proyectos.query();
};

$scope.proyectoAux=function(aux){
	//var tmp=JSON.parse($scope.obrasAux);
	for (var i in $scope.proyectos){
					if($scope.proyectos[i].id===aux){
				return $scope.proyectos[i].nombre;
											}
				}
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

//Medios
$scope.updateMedios=function(){
	$scope.medios=Medios.query();
};

$scope.medioAux=function(aux){
	for (var i in $scope.medios){
					if($scope.medios[i].id===aux){
				return $scope.medios[i].nombre;
											}
				}
};

	$scope.medioAdd = function() {	
		x="medio:"+this.medio;
        var properties = x.split(',');
	var obj = {};
	properties.forEach(function(property) {
    var tup = property.split(':');
    obj[tup[0]] = tup[1];
    
});
        $scope.idMedios.push(obj);
    };

 $scope.medioRemove = function(x) {
 	
     				for (var i in $scope.idMedios){
     					alert("va a eliminar a "+ $scope.medioAux(x));
					if($scope.idMedios[i].medio===x){
						$scope.idMedios.splice(i,1);
					}
				}
    };

 //Sistemas
$scope.updateSistemas=function(){
	$scope.sistemas=Sistemas.query();
};

$scope.sistemaAux=function(aux){
	for (var i in $scope.sistemas){
					if($scope.sistemas[i].id===aux){
				return $scope.sistemas[i].nombre;
											}
				}
};

	$scope.sistemaAdd = function(x) {
		x="sistema:"+this.sistema;
        var properties = x.split(',');
	var obj = {};
	properties.forEach(function(property) {
    var tup = property.split(':');
    obj[tup[0]] = tup[1];
    
});
        $scope.idSistemas.push(obj);
    };

 $scope.sistemaRemove = function(x) {
 	
     				for (var i in $scope.idSistemas){
     					alert("va a eliminar a "+ $scope.sistemaAux(x));
					if($scope.idSistemas[i].sistema===x){
						$scope.idSistemas.splice(i,1);
					}
				}
    };


//Idiomas
	$scope.idiomaAdd= function() {
	        $scope.idIdiomas.push(this.idioma);
	 $scope.idiomaRemove = function(x) {
	     				for (var i in $scope.idIdiomas){
						if($scope.idIdiomas[i]===x){
					alert("va a eliminar a "+ $scope.idIdiomas[i]);
							$scope.idIdiomas.splice(i,1);
						}
					}
	    };
	};
//Anotaciones cartográfico temporales


		$scope.anotacionCartograficoTemporalAdd = function() {
//$scope.datos='place:this.lugar,evento:this.evento,scope:this.coberturaAmplitud,date1:this.fechaDeInicio,date2:this.fechaDeFin,evidencia:this.evidencia';	
		
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

	
		//Crear método controller para crear nuevos géneros
		$scope.create=function(){
			//Usar los campos form para crear un nuevo objeto $resource obra
			var genero=new Generos({
				nombre: this.nombre,
				alias:$scope.idAlias,
				padres:$scope.idPadres,
				hijos:$scope.$idHijos,
				descripcion:this.descripcion,
				anotacionCartograficoTemporal:$scope.idAnotacionesCartograficoTemporales,
				materia:this.materia,
				mediosSonoros:$scope.idMedios,
				sistemasSonoros:$scope.idSistemas,
				idioma:$scope.idIdiomas,
				descriptorLibre:$scope.idDescriptores,
				proyectosAsociados:$scope.idProyectos
			});

			//Usar el método '$save' de obra para enviar una petición POST apropiada
			genero.$save(function(response){
				//Si la obra fue creada de la manera correcta, redireccionar a la página de la obra
				//$location.path('recursos/' + response._id);
				alert("El genero ha sido creado");
			}, function(errorResponse){
				//En caso contrario, presentar mensaje de error
				
				$scope.error=errorResponse.data.message;
				alert("No creado "+$scope.error);
			});
		};
		
		//Método controller para recuperar la lista de registros
		$scope.find=function(){
			//Usar el método 'querry' de obra, para enviar una petición GET apropiada
			$scope.generos=Generos.query();
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