'use scrict'

//Controller obras
angular.module('sistemas').controller('SistemasController',['$scope','$routeParams','$location','Authentication','Sistemas','Proyectos',
	function($scope, $routeParams, $location, Authentication,Sistemas,Proyectos){
		//Exponer el servicio Authentication
		$scope.authentication=Authentication;
		$scope.items=["Si","No"];
		$scope.rols=["Autor letra","Autor música", "Arreglista","Compilador"];
		$scope.tipos=["Música","Teórica","Visual","Artística"];
		$scope.medios=["Solista","Orquesta","Banda", "Solista con acompañamiento"];
		$scope.idiomas=["Español", "Inglés","Francés", "Quechua", "Aymara"];
		$scope.generos=["Canción","Bambuco","Pasillo","Joropo","Vals", "Danza","Bolero"];
		$scope.eventos=["Composición","Estreno","Primera grabación"];
		$scope.lugares=["Andes","Pacífico","Atlántico","Llanos"];
		$scope.coberturas=["Local","País","Mundial"];
		$scope.dEtiquetas=["Interés pedagógico", "Obra representativa", "Relación con línea de investigación"];
		$scope.idAnotacionesCartograficoTemporales=[];
		$scope.idProyectos =[];
		$scope.idDescriptores=[];
		$scope.proyectos=Proyectos.query();
		$scope.idActores =[];
		$scope.idFechas =[];
		$scope.idCoberturas =[];
		$scope.todoInput=[];
		$scope.actorName=[];
		$scope.idAlias=[];
		$scope.idPadres=[];
		$scope.idHijos=[];
		$scope.idEnlaces=[];
		$scope.materias=Sistemas.query();
		$scope.reverse=false;
//Preparar datos
$scope.actualizarTodo=function(){
	$scope.idEstados=this.ejemplar.estados;
}

// Funciones auxiliares
$scope.sortBy = function(propertyName) {
	$scope.reverse = !$scope.reverse;
  };

  $scope.verAlias=function(x){
	  console.log(x);
	y="";
	for(var i in x){
		y=y+$scope.sistemaAux(x[i].id)+", ";	
	};
	return $scope.darFormato(y);
}

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

$scope.updateSistemas=function(){
		$scope.sistemas=Sistemas.query();
	};

$scope.sistemaAux=function(aux){
	var out ="";
	try{
		for (var i in $scope.sistemas){
						if($scope.sistemas[i]._id===aux){
					out= $scope.sistemas[i].nombre;
												}
					}
	}
	catch(e){
		alert("error "+e)
	}
	//alert(out);
	return out;
	}

//Sistema relacionado
	$scope.sistemaRelacionadoAdd = function() {
		x="id:"+this.sistemaRelacionado.trim()+",nombre:"+$scope.sistemaAux(this.sistemaRelacionado);
		var properties = x.split(',');
		var obj = {};
		properties.forEach(function(property) {
	    var tup = property.split(':');
	    obj[tup[0]] = tup[1];
	});
	        $scope.idAlias.push(obj);
	    };
	 $scope.sistemaRelacionadoRemove = function(x) {
	     				for (var i in $scope.idAlias){
						if($scope.idAlias[i].sistemarelacionadoid===x){
					alert("va a eliminar a "+ $scope.sistemaAux(x));
							$scope.idAlias.splice(i,1);
						}
					}
	    };

//Padres
	$scope.padresAdd = function() {
		x="id:"+this.padres.trim()+",nombre:"+$scope.sistemaAux(this.padres);
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
						if($scope.idPadres[i].id===x){
					alert("va a eliminar a "+ $scope.sistemaAux(x));
							$scope.idPadres.splice(i,1);
						}
					}
	    };

//Hijos
	$scope.hijosAdd = function() {
		x="id:"+this.hijos.trim()+",nombre:"+$scope.sistemaAux(this.hijos);
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
						if($scope.idHijos[i].id===x){
					alert("va a eliminar a "+ $scope.sistemaAux(x));
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
//Obras
$scope.obraAux=function(aux){
	//var tmp=JSON.parse($scope.obrasAux);

	for (var i in $scope.obrasAux){
					if($scope.obrasAux[i]._id===aux){
				return $scope.obrasAux[i].titulo;
											}
				}
}
$scope.updateActores=function(){
	$scope.actores=Actores.query();
}

$scope.actorAdd = function(x) {
		//alert(x);
        var properties = x.split(',');
	var obj = {};
	properties.forEach(function(property) {
    var tup = property.split(':');
    obj[tup[0]] = tup[1];
    
});
        $scope.idActores.push(obj);
    };

 $scope.actorRemove = function(x) {
     				for (var i in $scope.idActores){
					if($scope.idActores[i].id===x){
				//alert("va a eliminar a "+ $scope.idActores[i].name);
						$scope.idActores.splice(i,1);
					}
				}
    };


$scope.fechaAdd = function(f) {
		//alert(f);
        var properties = f.split(',');
	var obj = {};
	properties.forEach(function(property) {
    var tup = property.split(':');
    obj[tup[0]] = tup[1];
    
});
        $scope.idFechas.push(obj);
    };

 $scope.fechaRemove = function(f) {
 	
     				for (var i in $scope.idFechas){
     					//alert("va a eliminar a "+ $scope.idFechas[i].date);
					if($scope.idFechas[i].date===f){
						$scope.idFechas.splice(i,1);
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
 $scope.coberturaAdd = function(c) {
		//alert(c);
        var properties = c.split(',');
	var obj = {};
	properties.forEach(function(property) {
    var tup = property.split(':');
    obj[tup[0]] = tup[1];
    
});
        $scope.idCoberturas.push(obj);
    };

 $scope.coberturaRemove = function(c) {
 	
     				for (var i in $scope.idCoberturas){
     					alert("va a eliminar a "+ $scope.idCoberturas[i].place);
					if($scope.idCoberturas[i].place===c){
						$scope.idCoberturas.splice(i,1);
					}
				}
    };
	
	//Crear método controller para crear nuevas obras
	$scope.create=function(){
		//Usar los campos form para crear un nuevo objeto $resource obra
		var sistema=new Sistemas({
			nombre: this.nombre,
			descripcion:this.descripcion,
			alias:$scope.idAlias,
			padres:$scope.idPadres,
			hijos:$scope.idHijos,
			proyectosAsociados:$scope.idProyectos,
			anotacionCartograficoTemporal:$scope.idAnotacionesCartograficoTemporales,
			descriptorLibre:$scope.idDescriptores,
			vinculoRelacionado:$scope.idEnlaces
		});
		//Usar el método '$save' de obra para enviar una petición POST apropiada
		sistema.$save(function(response){
			//Si la obra fue creada de la manera correcta, redireccionar a la página de la obra
			alert("El sistema sonoro ha sido creado")
			//$location.path('obras/' + response._id);
		}, function(errorResponse){
			//En caso contrario, presentar mensaje de error
			alert("No creado "+$scope.error);
			$scope.error=errorResponse.data.message;

		});
		
	};
	//Método controller para recuperar la lista de obras
	$scope.find=function(){
		//Usar el método 'querry' de obra, para enviar una petición GET apropiada
		$scope.sistemas=Sistemas.query();
	};

	//Método controller para recuperar una única obra
	$scope.findOne=function(){
		//Usa el método 'get' de obra para enviar una petición GET apropiada
		$scope.sistema=Sistemas.get({
			sistemaId: $routeParams.sistemaId
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