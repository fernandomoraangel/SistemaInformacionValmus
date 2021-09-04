	'use scrict'

	//Controller obras
	angular.module('recursos').controller('RecursosController',['$scope','$routeParams','$location','Authentication', 
		'Recursos','Obras','Actores','Materias','Proyectos',
		function($scope, $routeParams, $location, Authentication, Recursos,Obras, Actores,Materias,Proyectos){
			//Exponer el servicio Authentication
			$scope.authentication=Authentication;
			$scope.items=["Si","No"];
			$scope.roles=["Autor","Editor","Compilador","Productor"];
			$scope.tipos=["Partitura","Grabación de audio","Grabación de video","Libro","Revista"];
			$scope.medios=["Solista","Orquesta","Banda", "Solista con acompañamiento"];
			$scope.sistemasSonoros=["Temperado","No-temperado","Tonal","Modal","Politonal","Pantonal"];
			$scope.idiomas=["Español", "Inglés","Francés", "Quechua", "Aymara"];
			$scope.generos=["Canción","Bambuco","Pasillo","Joropo","Vals", "Danza","Bolero"];
			$scope.eventos=["Composición","Estreno","Primera grabación"];
			$scope.lugares=["Andes","Pacífico","Atlántico","Llanos"];
			$scope.coberturas=["Local","País","Mundial"];
			$scope.proyectos=["Andes","Emisoras","Industria discográfica"];
			$scope.nNormalizados=[{sigla:"ISBN",frase:"International Standard Book Number"},{sigla:"ISSN",frase:"International Standard Serial Number"},{sigla:"ISMN",frase:"International Standard Music Number"}, {sigla:"ISAN",frase:"International Standard Audiovisual Number"},{sigla:"ISWC",frase:"International Standard Musical Work Code"},{sigla:"ISRC",frase:"International Standard Recording Code"},{sigla:"Depósito legal",frase:""}];
			$scope.dEtiquetas=["Interés pedagógico", "Obra representativa", "Relación con línea de investigación"];
			$scope.tipoFuente=["Editor","Fabricante","Publicador","Distribuidor","Matriz"];
			$scope.criterio=["Rata de muestreo","Resolución","Tipo de cinta","Calidad de grabación","Tipo de archivo","Dimensiones","Duración"];
			$scope.idMenciones =[];
			$scope.idAnotacionesCartograficoTemporales=[];
			$scope.idProyectos =[];
			$scope.idNormalizados=[];
			$scope.idContenedores=[];
			$scope.idDescriptores=[];
			$scope.idSistemasSonoros=[];
			$scope.idIdiomas=[];
			$scope.idMaterias=[];
			$scope.idTipos=[];
			$scope.idEnlaces=[];
			$scope.idMediosSonoros=[];
			$scope.idObrasRelacionadas=[];
			$scope.idFuentes=[];
			$scope.idDTecnicas=[];
			$scope.actores=Actores.query();
			$scope.recursos=Recursos.query();
			$scope.proyectos=Proyectos.query();
			$scope.obras =Obras.query();
			$scope.materias=Materias.query();
			$scope.errorclass="form-control"; 
			$scope.reverse = false;

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

//Actualizar para editar
$scope.actualizarTodo=function(){
	$scope.idContenedores=this.recurso.contenedores;
	$scope.idObrasRelacionadas=this.recurso.obrasRelacionadas;
	$scope.idNormalizados=this.recurso.numeroNormalizado;
	$scope.idMenciones=this.recurso.mencionResponsabilidad;
	$scope.idFuentes=this.recurso.fuente;
	$scope.idTipos=this.recurso.tiposDeRecurso;
	$scope.idMaterias=this.recurso.materia;
	$scope.idDTecnicas=this.recurso.descripcionTecnica;
	$scope.idIdiomas=this.recurso.idiomas;
	$scope.idActores=this.recurso.actores;
	$scope.idAnotacionesCartograficoTemporales=this.recurso.anotacionCartograficoTemporal;
	$scope.idDescriptores=this.recurso.descriptorLibre;
	$scope.idProyectos=this.recurso.proyectos;
	$scope.idEnlaces=this.recurso.vinculoRelacionado;
};

//Ver
$scope.verActores=function(x){
	y="";
	for(var i in x){
		y=y+$scope.actorAux(x[i].actor)+" ("+x[i].tipoDeMencion+") ,";
	};
	return $scope.darFormato(y);
};

$scope.verTipos=function(x){
	y="";
	
	for(var i in x){
		y=y+x[i].id+", ";
	};
	return $scope.darFormato(y);
};

$scope.verNNormalizado=function(x){
	y="";
	
	for(var i in x){
		y=y+x[i].nombre+": "+x[i].numero+", ";
	};
	return $scope.darFormato(y);
};

$scope.verDTecnica=function(x){
	y="";
	
	for(var i in x){
		y=y+x[i].criterio+": "+x[i].valor+", ";
	};
	return $scope.darFormato(y);
};

$scope.verObras=function(x){
	y="";
	for(var i in x){
		y=y+$scope.obraAux(x[i].id)+", ";	
	};
	return $scope.darFormato(y);
};

$scope.verContenedores=function(x){

	y="";
	for(var i in x){
		y=y+$scope.contenedorAux(x[i].id)+", ";	
	};
	return $scope.darFormato(y);
};

$scope.verMateria=function(x){
	y="";
	for(var i in x){
		y=y+$scope.materiaAux(x[i].id)+", ";	
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

$scope.verIdiomas=function(x){
	y="";
	
	for(var i in x){
		y=y+x[i].idioma+", ";
	};
	return $scope.darFormato(y);
};

$scope.verProyecto=function(x){
	y="";
	for(var i in x){
		y=y+$scope.proyectoAux(x[i].id)+", ";	
	};
	return $scope.darFormato(y);
};

$scope.verVinculo=function(x){
	y="";
	for(var i in x){
		y=y+x[i].etiqueta+" ("+x[i].url+"), ";	
	};
	return $scope.darFormato(y);
};

$scope.verDescriptor=function(x){
	y="";
	for(var i in x){
		y=y+x[i].etiqueta+": "+x[i].contenido+", ";	
	};
	return $scope.darFormato(y);
}

	$scope.obraAux=function(aux){
		for (var i in $scope.obras){
						if($scope.obras[i].id===aux){
					return $scope.obras[i].titulo;
												}
					}
	}
	

	$scope.contenedorAux=function(aux){
		for (var i in $scope.obras){
						if($scope.recursos[i].id===aux){
					return $scope.recursos[i].titulo;
												}
					}
	}


	$scope.autorAux=function(aux){
		for (var i in $scope.actores){
						if($scope.actores[i]._id===aux){
							return $scope.actores[i].fullName;
						}
					}
	}

	$scope.updateActores=function(){
		$scope.actores=Actores.query();
	}
//Menciones de responsabilidad

$scope.actorAux=function(aux){
	for (var i in $scope.actores){
					if($scope.actores[i].id===aux){
				return $scope.actores[i].fullName;
											}
				}
};
	$scope.actorAdd = function() {
		x="actor:"+this.idActor+",tipoDeMencion:"+this.rol;
        var properties = x.split(',');
		var obj = {};     
		properties.forEach(function(property) {
	    var tup = property.split(':');
	    obj[tup[0]] = tup[1];
	});

		$scope.idMenciones.push(obj);
    };

 $scope.actorRemove = function(x) {
 				alert("va a eliminar a "+$scope.autorAux(x));
     				for (var i in $scope.idMenciones){
					if($scope.idMenciones[i].actor===x){
						$scope.idMenciones.splice(i,1);
					}
				}
    };
//nnormalizados
	$scope.nnormalizadoAdd = function() {
			//alert(x);
			var x= "nombre:"+this.nNormalizadoNombre+",numero:"+this.nNormalizadoNumero;
	        var properties = x.split(',');
		var obj = {};
		properties.forEach(function(property) {
	    var tup = property.split(':');
	    obj[tup[0]] = tup[1];
	    
	});
	        $scope.idNormalizados.push(obj);
	    };

	 $scope.nnormalizadoRemove = function(x) {
	 				//alert(x);
	     				for (var i in $scope.idNormalizados){
						if($scope.idNormalizados[i].nombre===x){
					alert("va a eliminar a "+ $scope.idNormalizados[i].nombre);
							$scope.idNormalizados.splice(i,1);
						}
					}
	    };


//Recursos
$scope.updateRecursos=function(){
	$scope.recursos=Recursos.query();
};

$scope.recursoAux=function(aux){
	for (var i in $scope.recursos){
					if($scope.recursos[i].id===aux){
				return $scope.recursos[i].titulo;
											}
				}
};

	$scope.recursoAdd = function(x) {
		x="id:"+this.contenedor;
        var properties = x.split(',');
	var obj = {};
	properties.forEach(function(property) {
    var tup = property.split(':');
    obj[tup[0]] = tup[1];
    
});
        $scope.idContenedores.push(obj);
        this.contenedor="";
    };

 $scope.recursoRemove = function(x) {
 	
     				for (var i in $scope.idContenedores){
     					alert("va a eliminar a "+ $scope.recursoAux(x));
					if($scope.idContenedores[i].id===x){
						$scope.idContenedores.splice(i,1);
					}
				}
    };


//Materias
$scope.updateMaterias=function(){
	$scope.materias=Materias.query();
};

$scope.materiaAux=function(aux){
	for (var i in $scope.materias){
					if($scope.materias[i].id===aux){
				return $scope.materias[i].nombre;
											}
				}
};

	$scope.materiaAdd = function(x) {
		x="id:"+this.materia;
        var properties = x.split(',');
	var obj = {};
	properties.forEach(function(property) {
    var tup = property.split(':');
    obj[tup[0]] = tup[1];
    
});
        $scope.idMaterias.push(obj);
        this.materia="";
    };

 $scope.materiaRemove = function(x) {
     				for (var i in $scope.idMaterias){
     					alert("va a eliminar a "+ $scope.materiaAux(x));
					if($scope.idMaterias[i].id===x){
						$scope.idMaterias.splice(i,1);
					}
				}
    };



//Descripción técnica
	$scope.dTecnicaAdd = function() {
		var x= "criterio:"+this.criterioDTecnica+",valor:"+this.valordTecnica;
	    var properties = x.split(',');
		var obj = {};
		properties.forEach(function(property) {
	    var tup = property.split(':');
	    obj[tup[0]] = tup[1];
	    
	});
	        $scope.idDTecnicas.push(obj);
	    };

	 $scope.dTecnicaRemove = function(x) {
	 				//alert(x);
	     				for (var i in $scope.idDTecnicas){
						if($scope.idDTecnicas[i].criterio===x){
					alert("va a eliminar a "+ $scope.idDTecnicas[i].criterio);
							$scope.idDTecnicas.splice(i,1);
						}
					}
	    };
//Obra relacionada

	$scope.obraRelacionadaAdd = function() {
		x="id:"+this.obraRelacionada;
		var properties = x.split(',');
		var obj = {};
		properties.forEach(function(property) {
	    var tup = property.split(':');
	    obj[tup[0]] = tup[1];
	});
	        $scope.idObrasRelacionadas.push(obj);
	    };
	 $scope.obraRelacionadaRemove = function(x) {
	     				for (var i in $scope.idObrasRelacionadas){
						if($scope.idObrasRelacionadas[i].id===x){
					alert("va a eliminar a "+ $scope.obraAux(x));
							$scope.idObrasRelacionadas.splice(i,1);
						}
					}
	    };

//Tipo
	$scope.tipoAdd = function() {
		x="id:"+this.tipodeRecurso;
		var properties = x.split(',');
		var obj = {};
		properties.forEach(function(property) {
	    var tup = property.split(':');
	    obj[tup[0]] = tup[1];
	});
	        $scope.idTipos.push(obj);
	    };
	 $scope.tipoRemove = function(x) {
	 				
	     				for (var i in $scope.idTipos){
						if($scope.idTipos[i]===x){
					alert("va a eliminar a "+ $scope.idTipos[i]);
							$scope.idTipos.splice(i,1);
						}
					}
	    };

//Fuente
	$scope.fuenteAdd = function() {
		x="tipoFuente:"+this.tipoDeFuente+",lugar:"+this.lugarDeFuente+",nombre:"+this.nombreDeFuente+",fecha:"+this.fechaDeFuente;
		var properties = x.split(',');
		var obj = {};
		properties.forEach(function(property) {
	    var tup = property.split(':');
	    obj[tup[0]] = tup[1];
	});
	        $scope.idFuentes.push(obj);
	    };
	 $scope.fuenteRemove = function(x) {
	     				for (var i in $scope.idFuentes){
						if($scope.idFuentes[i].tipoFuente===x){
					alert("va a eliminar a "+ $scope.idFuentes[i].tipoFuente);
							$scope.idFuentes.splice(i,1);
						}
					}
	    };


//Medio Sonoro
	$scope.medioSonoroAdd= function() {
	        $scope.idMediosSonoros.push(this.medioSonoro);
	    };
	 $scope.medioSonoroRemove = function(x) {
	     				for (var i in $scope.idMediosSonoros){
						if($scope.idMediosSonoros[i]===x){
					alert("va a eliminar a "+ $scope.idMediosSonoros[i]);
							$scope.idMediosSonoros.splice(i,1);
						}
					}
	    };

//Sistema Sonoro
	$scope.sistemaSonoroAdd= function() {
	        $scope.idSistemasSonoros.push(this.sistemaSonoro);
	 $scope.sistemaSonoroRemove = function(x) {
	     				for (var i in $scope.idSistemasSonoros){
						if($scope.idSistemasSonoros[i]===x){
					alert("va a eliminar a "+ $scope.idSistemasSonoros[i]);
							$scope.idSistemasSonoros.splice(i,1);
						}
					}
	    };
	};

//Idiomas
$scope.idiomaAdd= function() {
	x="idioma:"+this.idioma;
	var properties = x.split(',');
var obj = {};
properties.forEach(function(property) {
var tup = property.split(':');
obj[tup[0]] = tup[1];
});
	$scope.idIdiomas.push(obj);
	this.idioma="";
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

//Proyectos

$scope.proyectoAux=function(aux){
	//var tmp=JSON.parse($scope.obrasAux);
	for (var i in $scope.proyectos){
					if($scope.proyectos[i].id===aux){
				return $scope.proyectos[i].nombre;
											}
				}
};

	$scope.proyectoAdd = function(x) {
		x="id:"+this.proyecto;
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


		//Crear método controller para crear nuevas obras
		$scope.create=function(){
			var  validar=false;
			//Usar los campos form para crear un nuevo objeto $resource obra
			var recurso=new Recursos({
				titulo: this.titulo,
				obrasRelacionadas:$scope.idObrasRelacionadas,
				numeroNormalizado:$scope.idNormalizados,
				faceta:this.faceta,
				mencionResponsabilidad:$scope.idMenciones,
				descripcion:this.descripcion,
				contenedores:$scope.idContenedores,
				fuente:$scope.idFuentes,
				tiposDeRecurso:$scope.idTipos,
				anotacionCartograficoTemporal:$scope.idAnotacionesCartograficoTemporales,
				materia:$scope.idMaterias,
				idiomas:$scope.idIdiomas,
				descripcionTecnica:$scope.idDTecnicas,
				materialAcompanante:this.materialAcompanante,
				mencionDeSerie:this.mencionDeSerie,
				proyectos:$scope.idProyectos,
				vinculoRelacionado:$scope.idEnlaces,
				descriptorLibre:$scope.idDescriptores
			});

				if(this.titulo==undefined){
					
					$scope.errorclass="form-controlError";
					alert("Campos pendientes");
				}
				else{
					validar=true;
				}
			//Usar el método '$save' de obra para enviar una petición POST apropiada
			recurso.$save(function(response){
				//Si la obra fue creada de la manera correcta, redireccionar a la página de la 
				alert("El recurso ha sido creado");
				$location.path('recursos/' + response._id);
				
			}, function(errorResponse){
				//En caso contrario, presentar mensaje de error
				alert("No creado: "+ errorResponse.data.message);
				$scope.error=errorResponse.data.message;
			});
			
	
		};
		//Método controller para recuperar la lista de recursos
		$scope.find=function(){
			//Usar el método 'querry' de recurso, para enviar una petición GET apropiada
			$scope.recursos=Recursos.query();
		};

		//Método controller para recuperar una única recurso
		$scope.findOne=function(){
			//Usa el método 'get' de recurso para enviar una petición GET apropiada
			$scope.recurso=Recursos.get({
				recursoId: $routeParams.recursoId
			});
		};

		//Método controller para actualizar una única obra
		$scope.update=function(){			
			//Usa el método $update de recurso para enviar la petición PUT adecuada
			$scope.recurso.$update(function(){
				//Si la actualización es correcta, redireccionar
				$location.path('recursos/' + $scope.recurso._id);
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