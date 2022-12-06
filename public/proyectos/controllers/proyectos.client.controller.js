"use scrict";

//Controller proyectos
angular.module("proyectos").controller("ProyectosController", [
  "$scope",
  "$routeParams",
  "$location",
  "Authentication",
  "Proyectos",
  "Actores",
  function (
    $scope,
    $routeParams,
    $location,
    Authentication,
    Proyectos,
    Actores
  ) {
    //Exponer el servicio Authentication
    $scope.authentication = Authentication;
    $scope.items = ["Si", "No"];
    $scope.roles = [
      "Investigador principal",
      "Investigador",
      "Estudiante de maestría",
      "Estudiante de pregrado",
      "Colaborador",
    ];
    $scope.estados = [
      "Formulación",
      "Ejecución",
      "Terminado",
      "Suspendido",
      "Prorroga",
    ];
    $scope.eventos = [
      "inicio",
      "finalización",
      "Inicio Prorroga",
      "Fin Prorroga",
    ];
    $scope.dEtiquetas = [
      "Interés pedagógico",
      "Obra representativa",
      "Relación con línea de investigación",
    ];
    $scope.idActores = [];
    $scope.idFechas = [];
    $scope.idDescriptores = [];
    $scope.actores = Actores.query();
    $scope.todoInput = [];
    $scope.actorName = [];
    $scope.idEnlaces = [];
    $scope.reverse = false;

    //Preparar datos
    $scope.actualizarTodo = function () {
      $scope.idActores = this.proyecto.investigadores;
      $scope.idFechas = this.proyecto.fechasAsociadas;
      $scope.idDescriptores = this.proyecto.descriptoresLibres;
      $scope.idEnlaces = this.proyecto.vinculoRelacionado;
    };

    // Funciones auxiliares
    $scope.validarFecha = (fecha, id) => validarFecha(fecha, id);
      $scope.formatDate = (date, precision = "AMD") =>
        formatDate(date, precision);
      $scope.nombrarSi = (nombre, x) => nombrarSi(nombre, x);


    $scope.sortBy = function (propertyName) {
      $scope.reverse = !$scope.reverse;
    };

    $scope.darFormato = function (y) {
      while (y.indexOf("undefined,") > 0) {
        y =
          y.slice(0, y.indexOf("undefined,")) +
          y.slice(y.indexOf("undefined,") + 10, length);
      }
      return y;
    };

    $scope.verInvestigadores = function (x) {
      y = "";
      for (var i in x) {
        y = y + $scope.actorAux(x[i].id) + " (" + x[i].rol + "), Activo desde: "+ $scope.formatDate(x[i].activoDesde,"AMD")+", Hasta:"+ 
        $scope.formatDate(x[i].activoHasta,"AMD");
        //Poner coma al final
        if(i!=x.length-1){
          y=y+", "
        }
      }
      return $scope.darFormato(y);
    };

    $scope.verVinculo = function (x) {
      y = "";
      for (var i in x) {
        y = y + x[i].etiqueta + " (" + x[i].url + "), ";
      }
      return $scope.darFormato(y);
    };

    $scope.verFechas = function (x) {
      y = "";
      for (var i in x) {
        y = y + x[i].evento+": "+ $scope.formatDate(x[i].fecha, x[i].precision);
        if(i!=x.length-1){
          y=y+", "
        }
      }
      return $scope.darFormato(y);
    };

    $scope.verDescriptor = function (x) {
      y = "";
      for (var i in x) {
        y = y + x[i].etiqueta + ": " + x[i].contenido + ", ";
      }
      return $scope.darFormato(y);
    };

    $scope.actorAux = function (aux) {
      for (var i in $scope.actores) {
        if ($scope.actores[i]._id === aux) {
          return $scope.actores[i].fullName;
        }
      }
    };

    $scope.updateActores = function () {
      $scope.actores = Actores.query();
    };

    $scope.actorAdd = function () {
      existe = false;
      var x =
        "id:" +
        this.actor +
        ",rol:" +
        this.rol +
        ",activoDesde:" +
        this.fechaInicioActivo +
        ",activoHasta:" +
        this.fechaFinActivo;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (
        this.actor === undefined ||
        this.actor === "" ||
        this.rol === undefined ||
        this.rol === ""
      ) {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar un actor y un rol",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idActores.indexOf(x) === -1) {
          for (var i in $scope.idActores) {
            if (
              $scope.idActores[i].id === this.actor &&
              $scope.idActores[i].rol === this.rol
            ) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "El actor y rol se encuentran ya en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              this.actor = "";
              this.rol = "";
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idActores.push(obj);
          this.actor = "";
          this.rol = "";
        }
      }
    };

    $scope.actorRemove = function (x) {
      for (var i in $scope.idActores) {
        if ($scope.idActores[i].id === x) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text:
              "Va a eliminar  " +
              $scope.actorAux(x) +
              ", " +
              $scope.idActores[i].rol,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              $scope.idActores.splice(i, 1);
              // funcion propia de Angular.Js refresca mi scope y recarga mis datos
              $scope.$apply();
              Swal.fire("Eliminado!", "El actor ha sido eliminado", "success");
            }
          });
        }
      }
    };
//Función para calcular la precisión de una fecha
precisionFecha=function(fecha)
{
  var arr = fecha.split("/");
  var ano = arr[0];
  var mes = arr[1];
  var dia = arr[2];
  var precision = "AMD";
  if (ano == 0) { 
    precision = precision.replace("A", "");
    ano = 3000;
  }
  if (mes == 0) {
    precision = precision.replace("M", "");
    mes = 1;
  }
  if (dia == 0) {
    precision = precision.replace("D", "");
    dia = 1;
  }
var fechayPrecision = new Object();
fechayPrecision.fecha=ano + "/" + mes + "/" + dia;
fechayPrecision.precision=precision;
return fechayPrecision
}


    $scope.fechaAdd = function (f) {
      existe = false;
      //Fecha y precisión
      var precisionyFecha= precisionFecha(this.fecha);
      this.fecha = precisionyFecha.fecha
      precision=precisionyFecha.precision
      var x =
        "fecha:" +
        this.fecha +
        ",evento:" +
        this.evento +
        ",precision:" +
        precision;
      //Agregar precisión, cambiar los ceros por datos válidos
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });

      if (
        this.fecha === undefined ||
        this.fecha === "" ||
        this.evento === undefined ||
        this.evento === ""
      ) {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar una fecha y un evento",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idFechas.indexOf(x) === -1) {
          for (var i in $scope.idFechas) {
            if (
              $scope.idFechas[i].fecha === this.fecha ||
              $scope.idFechas[i].evento === this.evento
              //TODO: Resolver comparación de fechas para usar &&
            ) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "La fecha y el evento ya se encuentran ya en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              this.fecha = "";
              this.evento = "";
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idFechas.push(obj);
          this.fecha = "";
          this.evento = "";
        }
      }
    };

    $scope.fechaRemove = function (f) {
      for (var i in $scope.idFechas) {
        if ($scope.idFechas[i].evento === f) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text:
              "Va a eliminar  " +
              $scope.idFechas[i].fecha +
              ", " +
              $scope.idFechas[i].evento,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              $scope.idFechas.splice(i, 1);
              // funcion propia de Angular.Js refresca mi scope y recarga mis datos
              $scope.$apply();
              Swal.fire(
                "Eliminado!",
                "La mención de responsabilidad ha sido eliminada.",
                "success"
              );
            }
          });
        }
      }
    };

    //Menú descriptores libres
    $scope.dDescriptorAdd = function () {
      existe = false;
      var x = "etiqueta:" + this.dEtiqueta + ",contenido:" + this.dContenido;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (
        this.dEtiqueta === undefined ||
        this.dEtiqueta === "" ||
        this.dContenido === undefined ||
        this.dContenido === ""
      ) {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar un Debe colocar una etiqueta y un contenido",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idDescriptores.indexOf(x) === -1) {
          for (var i in $scope.idDescriptores) {
            if (
              $scope.idDescriptores[i].etiqueta === this.dEtiqueta &&
              $scope.idDescriptores[i].contenido === this.dContenido
            ) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "La etiqueta ya se encuentran en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idDescriptores.push(obj);
          this.dEtiqueta = "";
          this.dContenido = "";
        }
      }
    };

    $scope.dDescriptorRemove = function (x, y) {
      for (var i in $scope.idDescriptores) {
        if (
          $scope.idDescriptores[i].contenido === y &&
          $scope.idDescriptores[i].etiqueta === x
        ) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text:
              "Va a eliminar  " +
              $scope.idDescriptores[i].etiqueta +
              ", " +
              $scope.idDescriptores[i].contenido,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              $scope.idDescriptores.splice(i, 1); //Nunca se ejecuta
              // funcion propia de Angular.Js refresca mi scope y recarga mis datos
              $scope.$apply();
              Swal.fire(
                "Eliminado!",
                "El descriptor ha sido eliminado.",
                "success"
              );
            }
          });
        }
      }
    };

    //Menú enlaces
    $scope.enlaceAdd = function () {
      existe = false;
      var x = "etiqueta:" + this.eEtiqueta + ",url:" + this.eUrl;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (
        this.eEtiqueta === undefined ||
        this.eEtiqueta === "" ||
        this.eUrl === undefined ||
        this.eUrl === ""
      ) {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe ingresar todos los datos",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idEnlaces.indexOf(x) === -1) {
          for (var i in $scope.idEnlaces) {
            if (
              $scope.idEnlaces[i].etiqueta === this.eEtiqueta &&
              $scope.idEnlaces[i].url === this.eUrl
            ) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "El enlace se ya encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idEnlaces.push(obj);
          this.eEtiqueta = "";
          this.eUrl = "";
        }
      }
    };

    $scope.enlaceRemove = function (x, y) {
      for (var i in $scope.idEnlaces) {
        if (
          $scope.idEnlaces[i].etiqueta === x &&
          $scope.idEnlaces[i].url === y
        ) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text:
              "Va a eliminar: Descripción " +
              $scope.idEnlaces[i].etiqueta +
              ", Url: " +
              $scope.idEnlaces[i].url,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              $scope.idEnlaces.splice(i, 1);
              // funcion propia de Angular.Js refresca mi scope y recarga mis datos
              $scope.$apply();
              Swal.fire(
                "Eliminado!",
                "El enlace ha sido eliminado.",
                "success"
              );
            }
          });
        }
      }
    };

    //Crear método controller para crear nuevas obras
    $scope.create = function () {
      //Usar los campos form para crear un nuevo objeto $resource obra
      var proyecto = new Proyectos({
        nombre: this.nombre,
        estado: this.estado,
        investigadores: $scope.idActores,
        fechasAsociadas: $scope.idFechas,
        descriptoresLibres: $scope.idDescriptores,
        vinculoRelacionado: $scope.idEnlaces,
      });
      //Usar el método '$save' de obra para enviar una petición POST apropiada
      proyecto.$save(
        function (response) {
          Swal.fire({
            title: "¡Registro correcto!",
            text: "El registro se ha creado correctamente",
            icon: "success",
            confirmButtonText: "Cerrar",
          });
          //Si la obra fue creada de la manera correcta, redireccionar a la página de la obra
          $location.path("proyectos/" + response._id);
        },
        function (errorResponse) {
          //En caso contrario, presentar mensaje de error
          $scope.error = errorResponse.data.message;
        }
      );
    };
    //Método controller para recuperar la lista de obras
    $scope.find = function () {
      //Usar el método 'querry' de obra, para enviar una petición GET apropiada
      $scope.proyectos = Proyectos.query();
    };

    //Método controller para recuperar una única obra
    $scope.findOne = function () {
      //Usa el método 'get' de obra para enviar una petición GET apropiada
      $scope.proyecto = Proyectos.get({
        proyectoId: $routeParams.proyectoId,
      });
    };

    //Método controller para actualizar una única obra
    $scope.update = function () {
      //Usa el método $update de proyecto para enviar la petición PUT adecuada
      $scope.proyecto.$update(
        function () {
          //Si la actualización es correcta, redireccionar
          $location.path("proyectos/" + $scope.proyecto._id);
        },
        function (errorResponse) {
          $scope.error = errorResponse.data.message;
        }
      );
    };

    //Método controller para borrar una obra
    $scope.delete = function (obra) {
      var r = confirm("¿Realmente desea borrar el registro?");
      if (r == true) {
        //Si una obra es enviado al método, borrarlo
        if (obra) {
          //Confirmar

          //Usar el método '$remove' del la obra para borrarla
          obra.$remove(function () {
            //Eliminar la obra de la lista
            for (var i in $scope.obras) {
              if ($scope.obras[i] === obra) {
                $scope.obras.splice(i, 1);
              }
            }
          });
        } else {
          //En otro caso usar el método $remove para borrar
          $scope.obra.$remove(function () {
            $location.path("obras");
          });
        }
      } else {
      }
    };
  },
]);
