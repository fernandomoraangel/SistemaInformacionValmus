"use scrict";

//Controller Actores
angular.module("actores").controller("ActoresController", [
  "$scope",
  "$routeParams",
  "$location",
  "Authentication",
  "Actores",
  "Diccionarios",
  function ($scope, $routeParams, $location, Authentication, Actores,Diccionarios) {
    //Exponer el servicio Authentication
    $scope.authentication = Authentication;
    $scope.diccionarios = Diccionarios.query();
    $scope.coberturas = ["Local", "País", "Mundial"];
    $scope.lugares = ["Andes", "Pacífico", "Atlántico", "Llanos"];
    $scope.dEtiquetas = [
      "Interés pedagógico",
      "Obra representativa",
      "Relación con línea de investigación",
    ];
    $scope.idContenedores = [];
    $scope.idAnotacionesCartograficoTemporales = [];
    $scope.idDescriptores = [];
    $scope.idEnlaces = [];
    $scope.actores = Actores.query();
    $scope.reverse = false;

    // Funciones auxiliares

    $scope.validarFecha = (fecha, id) => validarFecha(fecha, id);
    $scope.formatDate = (date, precision = "AMD") =>
      formatDate(date, precision);
    $scope.nombrarSi = (nombre, x) => nombrarSi(nombre, x);

    $scope.sortBy = function (propertyName) {
      $scope.reverse = !$scope.reverse;
    };

    $scope.mostrarAyuda = function (tabla, campo) {
      for (var i in $scope.diccionarios) {
        //alert($scope.diccionarios[i].campo)
        if (
          $scope.diccionarios[i].campo === campo &&
          $scope.diccionarios[i].tabla === tabla
        ) {
          $scope.campo = $scope.diccionarios[i].definicion;
          return;
        }
      }
      $scope.campo = "Datos del diccionario no encontrados";
      return;
    };

    $scope.darFormato = function (y) {
      while (y.indexOf("undefined,") > 0) {
        y =
          y.slice(0, y.indexOf("undefined,")) +
          y.slice(y.indexOf("undefined,") + 10, length);
      }
      return y;
    };

 // Funciones auxiliares
    //Cargar los campos que tienen vectores para la vista de edición
    //Actualizar para editar

    $scope.cargaContenedores = function (d) {
      console.log(d)
      for (var i in d) {
        delete d[i]._id;
      }
      $scope.idContenedores = [].concat(d);
    };

    $scope.cargaAnotacionesCartograficoTemporales = function (d) {
      for (var i in d) {
        delete d[i]._id;
      }
      $scope.idAnotacionesCartograficoTemporales = [].concat(d);
    };

    $scope.cargaDescriptores = function (d) {
      console.log(d);
      for (var i in d) {
        delete d[i]._id;
      }
      $scope.idDescriptores = [].concat(d);
    };

    $scope.cargaEnlaces = function (d) {
      console.log(d);
      for (var i in d) {
        delete d[i]._id;
      }
      $scope.idEnlaces = [].concat(d);
    };

    $scope.actualizarTodo = function () {
      $scope.idContenedores = this.actor.contenedor;
      $scope.idAnotacionesCartograficoTemporales =
        this.actor.anotacionCartograficoTemporal;
      $scope.idDescriptores = this.actor.descriptores;
      $scope.idEnlaces = this.actor.vinculoRelacionado;
    };
    // Ver
    $scope.verContenedores = function (x) {
      y = "";
      for (var i in x) {
        y = y + $scope.actorAux(x[i].id);
        //Poner coma al final
        if(i!=x.length-1){
          y=y+", "
        }
      }
      return $scope.darFormato(y);
    };

    $scope.verAnotacion = function (x) {
      y = "";
      for (var i in x) {
        y =
          y +
          "Lugar: " +
          x[i].lugar +
          ", Evento: " +
          x[i].evento +
          ", Amplitud de cobertura: " +
          x[i].coberturaAmplitud +
          ", Inicio: " +
          $scope.formatDate(x[i].fechaInicio, x[i].precisionInicio) +
          ", Fin: " +
          $scope.formatDate(x[i].fechaFin, x[i].precisionFin) +
          ", Evidencia: " +
          x[i].evidencia;
          //Poner coma al final
        if(i!=x.length-1){
          y=y+", "
        }
      }
      return $scope.darFormato(y);
    };

    $scope.verDescriptor = function (x) {
      y = "";
      for (var i in x) {
        y = y + x[i].etiqueta + ": " + x[i].contenido;
        //Poner coma al final
        if(i!=x.length-1){
          y=y+"; "
        }
      }
      return $scope.darFormato(y);
    };

    $scope.verVinculo = function (x) {
      y = "";
      for (var i in x) {
        y = y + x[i].etiqueta + " (" + x[i].url + ") ";
        //Poner coma al final
        if(i!=x.length-1){
          y=y+", "
        }
      }
      return $scope.darFormato(y);
    };

    //Actores
    $scope.updateActores = function () {
      $scope.actores = Actores.query();
    };

    $scope.actorAux = function (aux) {
      for (var i in $scope.actores) {
        if ($scope.actores[i].id === aux) {
          return $scope.actores[i].fullName;
        }
      }
    };

    $scope.actorAdd = function () {
      var existe = false;
      var x = "id:" + this.contenedor;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (this.contenedor === undefined || this.contenedor === "") {
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
            if ($scope.idContenedores[i].id === this.contenedor) {
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

    $scope.actorRemove = function (x) {
      for (var i in $scope.idContenedores) {
        if ($scope.idContenedores[i].id === x) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text: "Va a eliminar a " + $scope.actorAux(x),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              $scope.idContenedores.splice(i, 1); //Nunca se ejecuta
              // funcion propia de Angular.Js refresca mi scope y recarga mis datos
              $scope.$apply();
              Swal.fire("Eliminado!", "El actor ha sido eliminado.", "success");
            }
          });
        }
      }
    };
    //Anotaciones cartográfico temporales
    $scope.anotacionCartograficoTemporalAdd = function () {
      existe = false;
      //Calcular precisión para fecha inicio
      var precisionyFechaInicio = precisionFecha(this.fechaDeInicio);
      this.fechaDeInicio = precisionyFechaInicio.fecha;
      var precisionInicio = precisionyFechaInicio.precision;

      //Calcular precisión para fecha fin
      var precisionyFechaFin = precisionFecha(this.fechaDeFin);
      this.fechaDeFin = precisionyFechaFin.fecha;
      var precisionFin = precisionyFechaFin.precision;

      var x =
        "lugar:" +
        this.lugar +
        ",evento:" +
        this.evento +
        ",coberturaAmplitud:" +
        this.coberturaAmplitud +
        ",fechaInicio:" +
        this.fechaDeInicio +
        ",fechaFin:" +
        this.fechaDeFin +
        ",precisionInicio:" +
        precisionInicio +
        ",precisionFin:" +
        precisionFin +
        ",evidencia:" +
        this.evidencia;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (
        this.lugar === undefined ||
        this.lugar === "" ||
        this.evento === undefined ||
        this.evento === "" ||
        this.fechaDeInicio === undefined ||
        this.fechaDeInicio === "" ||
        this.fechaDeFin === undefined ||
        this.fechaDeFin === "" ||
        this.evidencia === undefined ||
        this.evidencia === ""
      ) {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar completar todos los datos",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idAnotacionesCartograficoTemporales.indexOf(x) === -1) {
          for (var i in $scope.idAnotacionesCartograficoTemporales) {
            if (
              $scope.idAnotacionesCartograficoTemporales[i].lugar ===
                this.lugar ||
              $scope.idAnotacionesCartograficoTemporales[i].evento ===
                this.evento
              //TODO: Resolver comparación de fechas para usar &&
            ) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "EL elemento ya se encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              this.lugar = "";
              this.evento = "";
              this.fechaDeInicio = "";
              this.fechaDeFin = "";
              this.evidencia = "";
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idAnotacionesCartograficoTemporales.push(obj);
          this.lugar = "";
          this.evento = "";
          this.fechaDeInicio = "";
          this.fechaDeFin = "";
          this.evidencia = "";
        }
      }
    };

    $scope.anotacionCartograficoTemporalRemove = function (x) {
      for (var i in $scope.idAnotacionesCartograficoTemporales) {
        if ($scope.idAnotacionesCartograficoTemporales[i].lugar === x) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text:
              "va a eliminar a " +
              $scope.idAnotacionesCartograficoTemporales[i].lugar +
              "; " +
              $scope.idAnotacionesCartograficoTemporales[i].evento +
              "; " +
              $scope.idAnotacionesCartograficoTemporales[i].coberturaAmplitud +
              "; " +
              $scope.formatDate(
                $scope.idAnotacionesCartograficoTemporales[i].fechaInicio,
                $scope.idAnotacionesCartograficoTemporales[i].precisionInicio
              ) +
              "; " +
              $scope.formatDate(
                $scope.idAnotacionesCartograficoTemporales[i].fechaFin,
                $scope.idAnotacionesCartograficoTemporales[i].precisionFin
              ) +
              "; " +
              $scope.idAnotacionesCartograficoTemporales[i].evidencia,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              $scope.idAnotacionesCartograficoTemporales.splice(i, 1);
              // funcion propia de Angular.Js refresca mi scope y recarga mis datos
              $scope.$apply();
              Swal.fire(
                "Eliminado!",
                "La anotación cartográfica-temporal ha sido eliminada",
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
              $scope.idDescriptores[i].dEtiqueta === this.dEtiqueta &&
              $scope.idDescriptores[i].dContenido === this.dContenido
            ) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "La etiqueta ya se encuentra en la lista",
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

    $scope.dDescriptorRemove = function (x) {
      for (var i in $scope.idDescriptores) {
        if ($scope.idDescriptores[i].contenido === x) {
          {
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
              $scope.idEnlaces[i].eEtiqueta === this.Etiqueta &&
              $scope.idEnlaces[i].url === this.Url
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

    $scope.enlaceRemove = function (x) {
      for (var i in $scope.idEnlaces) {
        if ($scope.idEnlaces[i].etiqueta === x) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text:
              "Va a eliminar: Descripción: " +
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

    //Crear método controller para crear nuevas Actores
    $scope.create = function () {
      //Usar los campos form para crear un nuevo objeto $resource actor
      var actor = new Actores({
        nombres: this.nombres,
        apellidos: this.apellidos,
        nombreReunion: this.nombreReunion,
        contenedor: $scope.idContenedores,
        anotacionCartograficoTemporal:
          $scope.idAnotacionesCartograficoTemporales,
        descriptores: $scope.idDescriptores,
        vinculoRelacionado: $scope.idEnlaces,
      });
      //Usar el método '$save' de actor para enviar una petición POST apropiada
      actor.$save(
        function (response) {
          //Si el actor fue creada de la manera correcta, redireccionar a la página de la actor
          $location.path("actores/" + response._id);
        },
        function (errorResponse) {
          //En caso contrario, presentar mensaje de error
          $scope.error = errorResponse.data.message;
        }
      );
    };
    //Método controller para recuperar la lista de Actores
    $scope.find = function () {
      //Usar el método 'querry' de actor, para enviar una petición GET apropiada
      $scope.actores = Actores.query();
    };

    //Método controller para recuperar una única actor
    $scope.findOne = function () {
      //Usa el método 'get' de actor para enviar una petición GET apropiada
      $scope.actor = Actores.get({
        actorId: $routeParams.actorId,
      });
    };

    //Método controller para actualizar una única actor
    $scope.update = function () {

      //Agregar vectores para que se actualicen, el  es porque si no se hace click en la carga, el vector queda vacío
      if ($scope.idContenedores.length != 0) {
        $scope.actor.contenedor = $scope.idContenedores;
      }

      if ($scope.idAnotacionesCartograficoTemporales.length != 0) {
        $scope.actor.anotacionCartograficoTemporal =
          $scope.idAnotacionesCartograficoTemporales;
      }

      if ($scope.idDescriptores.length != 0) {
        $scope.actor.descriptores = $scope.idDescriptores;
      }

      if ($scope.idEnlaces.length != 0) {
        $scope.actor.vinculoRelacionado = $scope.idEnlaces;
      }
      

      //Usa el método $update de actor para enviar la petición PUT adecuada
      $scope.actor.$update(
        function () {
          //Si la actualización es correcta, redireccionar
          $location.path("actores/" + $scope.actor._id);
        },
        function (errorResponse) {
          $scope.error = errorResponse.data.message;
        }
      );
    };

    //Método controller para borrar una actor
    $scope.delete = function (actor) {
      //Si una actor es enviado al método, borrarlo
      if (actor) {
        //Usar el método '$remove' del la actor para borrarla
        actor.$remove(function () {
          //Eliminar la actor de la lista
          for (var i in $scope.Actores) {
            if ($scope.Actores[i] === actor) {
              $scope.Actores.splice(i, 1);
            }
          }
        });
      } else {
        //En otro caso usar el método $remove para borrar
        $scope.actor.$remove(function () {
          $location.path("Actores");
        });
      }
    };
  },
]);
