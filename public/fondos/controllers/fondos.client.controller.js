'use scrict'

//Controller fondos
angular.module('fondos').controller('FondosController',['$scope','$routeParams','$location','Authentication', 'Obras','Actores','Fondos',
	function($scope, $routeParams, $location, Authentication,  Obras, Actores, Fondos){
		//Exponer el servicio Authentication
		$scope.authentication=Authentication;
		$scope.items=["Si","No"];
		$scope.rols=["Autor letra","Autor música", "Arreglista","Compilador"];
		$scope.tipos=["Música","Teórica","Visual","Artística"];
		$scope.medios=["Solista","Orquesta","Banda", "Solista con acompañamiento"];
		$scope.idiomas=["Español", "Inglés","Francés", "Quechua", "Aymara"];
		$scope.generos=["Canción","Bambuco","Pasillo","Joropo","Vals", "Danza","Bolero"];
		$scope.eventos=["Composición","Estreno","Primera grabación"];
		$scope.sitios=["Andes","Pacífico","Atlántico","Llanos"];
		$scope.coberturas=["Local","País","Mundial"];
		$scope.proyectos=["Andes","Emisoras","Industria discográfica"];
		$scope.idActores =[];
		$scope.idFechas =[];
		$scope.idCoberturas =[];
		$scope.idProyectos =[];
		$scope.actores=Actores.query();
		$scope.obrasAux=Obras.query();
		$scope.todoInput=[];
		$scope.actorName=[];
		$scope.obras =Obras.query();
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
	

	$scope.proyectoAdd = function(p) {
		//alert(p);
        var properties = p.split(',');
	var obj = {};
	properties.forEach(function(property) {
    var tup = property.split(':');
    obj[tup[0]] = tup[1];
    
});
        $scope.idProyectos.push(obj);
    };

 $scope.proyectoRemove = function(p) {
 	
     				for (var i in $scope.idProyectos){
     					//alert("va a eliminar a "+ $scope.idProyectos[i].name);
					if($scope.idProyectos[i].name===p){
						$scope.idProyectos.splice(i,1);
					}
				}
    };


	//Crear método controller para crear nuevas obras
	$scope.create=function(){
		//Usar los campos form para crear un nuevo objeto $resource obra
		var fondo=new Fondos({
			nombre: this.nombre,
			tipo: this.tipo,
			propiedadComodato: this.propiedadComodato,
			fechaDeCreacion: this.fechaDeCreacion
		});
		//Usar el método '$save' de obra para enviar una petición POST apropiada
		fondo.$save(function(response){
			alert("El registro ha sido creado");
			//Si la obra fue creada de la manera correcta, redireccionar a la página de la obra
			$location.path('fondos/' + response._id);
		}, function(errorResponse){
			//En caso contrario, presentar mensaje de error
			$scope.error=errorResponse.data.message;
			alert("No creado:"+ errorResponse.data.message);
		});
		
	};
	//Método controller para recuperar la lista de fondos
	$scope.find=function(){
		//Usar el método 'querry' de fondo, para enviar una petición GET apropiada
		$scope.fondos=Fondos.query();
	};

	//Método controller para recuperar una única fondo
	$scope.findOne=function(){
		//Usa el método 'get' de fondo para enviar una petición GET apropiada
		$scope.fondo=Fondos.get({
			fondoId: $routeParams.fondoId
		});
	};

	//Método controller para actualizar un único fondo
	$scope.update=function(){
		//Usa el método $update de fondo para enviar la petición PUT adecuada
		$scope.fondo.$update(function(){
			//Si la actualización es correcta, redireccionar
			$location.path('fondos/' + $scope.fondo._id);
		}, function(errorResponse){
			$scope.error=errorResponse.data.message;
		});
	};

	//Método controller para borrar una fondo
	$scope.delete=function(fondo){

		var r = confirm("¿Realmente desea borrar el registro?");
if (r == true) {
		//Si una fondo es enviado al método, borrarlo
		if (fondo){
			//Confirmar

			//Usar el método '$remove' del la fondo para borrarla
			fondo.$remove(function(){
				//Eliminar la fondo de la lista
				for (var i in $scope.fondos){
					if($scope.fondos[i]===fondo){
						$scope.fondos.splice(i,1);
					}
				}
			});
		} else {
			//En otro caso usar el método $remove para borrar
			$scope.fondo.$remove(function(){
				$location.path('fondos');
			});
		}
} else {

}

	};

}



]);