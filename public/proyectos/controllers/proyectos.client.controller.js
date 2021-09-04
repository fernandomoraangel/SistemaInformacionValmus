'use scrict'

//Controller obras
angular.module('proyectos').controller('ProyectosController',['$scope','$routeParams','$location','Authentication', 'Proyectos','Actores',
	function($scope, $routeParams, $location, Authentication, Proyectos,Actores){
		//Exponer el servicio Authentication
		$scope.authentication=Authentication;
		$scope.items=["Si","No"];
		$scope.roles=["Investigador principal","Investigador", "Estudiante de maestría","Estudiante de pregrado","Colaborador"];
		$scope.estados=["Formulación","Ejecución","Terminado","Suspendido","Prorroga"];
		$scope.eventos=["inicio","finalización","Inicio Prorroga","Fin Prorroga"];
		$scope.dEtiquetas=["Interés pedagógico", "Obra representativa", "Relación con línea de investigación"];
		$scope.idActores =[];
		$scope.idFechas =[];
		$scope.idDescriptores=[];
		$scope.actores=Actores.query();
		$scope.todoInput=[];
		$scope.actorName=[];
		$scope.idEnlaces=[];
		$scope.reverse=false;

//Preparar datos
$scope.actualizarTodo=function(){
$scope.idActores=this.proyecto.investigadores;
$scope.idFechas=this.proyecto.fechasAsociadas;
$scope.idDescriptores=this.proyecto.descriptoresLibres;
$scope.idEnlaces=this.proyecto.vinculoRelacionado;
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

$scope.verInvestigadores=function(x){
	y=""
	for(var i in x){
		y=y+$scope.actorAux(x[i].id)+" ("+x[i].rol+"), ";
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

$scope.verFechas=function(x){
	y=""
	for(var i in x){
		y=y+x[i].fecha+": "+x[i].evento+", ";
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

$scope.actorAux=function(aux){
		for (var i in $scope.actores){
						if($scope.actores[i]._id===aux){
							return $scope.actores[i].fullName;
						}
					}
	}

$scope.updateActores=function(){
	$scope.actores=Actores.query();
}

$scope.actorAdd = function() {
		var x= "id:"+this.actor+",rol:"+this.rol+",activoDesde:"+this.fechaInicioActivo+",activoHasta:"+this.fechaFinActivo;
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
				alert("va a eliminar a "+ $scope.actorAux(x));
						$scope.idActores.splice(i,1);
					}
				}
    };


$scope.fechaAdd = function(f) {
		var x= "fecha:"+this.fecha+",evento:"+this.evento;
        var properties = x.split(',');
	var obj = {};
	properties.forEach(function(property) {
    var tup = property.split(':');
    obj[tup[0]] = tup[1];
    
});
        $scope.idFechas.push(obj);
    };

 $scope.fechaRemove = function(f) {
     				for (var i in $scope.idFechas){
     					alert("va a eliminar a "+ $scope.idFechas[i].evento);
					if($scope.idFechas[i].evento===f){
						$scope.idFechas.splice(i,1);
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

	//Crear método controller para crear nuevas obras
	$scope.create=function(){
		//Usar los campos form para crear un nuevo objeto $resource obra
		var proyecto=new Proyectos({
			nombre: this.nombre,
			estado:this.estado,
			investigadores:$scope.idActores,
			fechasAsociadas:$scope.idFechas,
			descriptoresLibres:$scope.idDescriptores,
			vinculoRelacionado:$scope.idEnlaces
		});
		//Usar el método '$save' de obra para enviar una petición POST apropiada
		proyecto.$save(function(response){
			alert("El proyecto ha sido creado")
			//Si la obra fue creada de la manera correcta, redireccionar a la página de la obra
			$location.path('proyectos/' + response._id);
		}, function(errorResponse){
			//En caso contrario, presentar mensaje de error
			$scope.error=errorResponse.data.message;
		});
		
	};
	//Método controller para recuperar la lista de obras
	$scope.find=function(){
		//Usar el método 'querry' de obra, para enviar una petición GET apropiada
		$scope.proyectos=Proyectos.query();
	};

	//Método controller para recuperar una única obra
	$scope.findOne=function(){
		//Usa el método 'get' de obra para enviar una petición GET apropiada
		$scope.proyecto=Proyectos.get({
			proyectoId: $routeParams.proyectoId
		});
	};



	//Método controller para actualizar una única obra
	$scope.update=function(){

		//Usa el método $update de proyecto para enviar la petición PUT adecuada
		$scope.proyecto.$update(function(){
			//Si la actualización es correcta, redireccionar
			$location.path('proyectos/' + $scope.proyecto._id);
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