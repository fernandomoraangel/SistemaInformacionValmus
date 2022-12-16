"use scrict";

//Controller materias
angular.module("materias").controller("MateriasController", [
  "$scope",
  "$routeParams",
  "$location",
  "Authentication",
  "Obras",
  "Actores",
  "Materias",
  "Diccionarios",
  function (
    $scope,
    $routeParams,
    $location,
    Authentication,
    Obras,
    Actores,
    Materias,
    Diccionarios
  ) {
    //Exponer el servicio Authentication
    $scope.authentication = Authentication;
    $scope.dEtiquetas = dEtiquetas;
    $scope.idActores = [];
    $scope.idAnotacionesCartograficoTemporales = [];
    $scope.idProyectos = [];
    $scope.idNormalizados = [];
    $scope.idDescriptores = [];
    $scope.idEnlaces = [];
    $scope.idSistemasSonoros = [];
    $scope.idIdiomas = [];
    $scope.idTipos = [];
    $scope.idMediosSonoros = [];
    $scope.idMateriasRelacionadas = [];
    $scope.idAlias = [];
    $scope.idPadres = [];
    $scope.idHijos = [];
    $scope.materias = Materias.query();
    $scope.diccionarios = Diccionarios.query();
    $scope.actorName = [];
    $scope.reverse = false;
    //Preparar datos
    $scope.actualizarTodo = function () {
      $scope.idEstados = this.ejemplar.estados;
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

    $scope.mostrarAyuda = function (tabla, campo) {
      var out = new Object();
      for (var i in $scope.diccionarios) {
        if (
          $scope.diccionarios[i].campo === campo &&
          $scope.diccionarios[i].tabla === tabla
        ) {
          $scope.campo = $scope.diccionarios[i].definicion;
          $scope.campoLargo = $scope.diccionarios[i].campoLargo;
          return;
        }
      }
      $scope.campo = "Datos del diccionario no encontrados";
      return;
    };
    //Cargar campos con vectores

    $scope.cargaAlias = function (d) {
      for (var i in d) {
        delete d[i]._id;
      }
      $scope.idAlias = [].concat(d);
    };

    $scope.cargaMateriasRelacionadas = function (d) {
      for (var i in d) {
        delete d[i]._id;
      }
      $scope.idMateriasRelacionadas = [].concat(d);
    };

    $scope.cargaMateriasPadre = function (d) {
      for (var i in d) {
        delete d[i]._id;
      }
      $scope.idPadres = [].concat(d);
    };

    $scope.cargaMateriasHijo = function (d) {
      for (var i in d) {
        delete d[i]._id;
      }
      $scope.idHijos = [].concat(d);
    };

    $scope.cargaDescriptoresLibres = function (d) {
      for (var i in d) {
        delete d[i]._id;
      }
      $scope.idDescriptores = [].concat(d);
    };

    $scope.cargaEnlaces = function (d) {
      for (var i in d) {
        delete d[i]._id;
      }
      $scope.idEnlaces = [].concat(d);
    };

    $scope.verAlias = function (x) {
      y = "";

      for (var i in x) {
        y = y + x[i].nombre;
        //Poner coma al final
        if (i != x.length - 1) {
          y = y + ", ";
        }
      }
      return $scope.darFormato(y);
    };

    $scope.verMaterias = function (x) {
      y = "";
      for (var i in x) {
        y = y + $scope.materiaAux(x[i].id);
        //Poner coma al final
        if (i != x.length - 1) {
          y = y + ", ";
        }
      }
      return $scope.darFormato(y);
    };

    $scope.verVinculo = function (x) {
      y = "";
      for (var i in x) {
        y = y + x[i].etiqueta + " (" + x[i].url + ") ";
        //Poner coma al final
        if (i != x.length - 1) {
          y = y + ", ";
        }
      }
      return $scope.darFormato(y);
    };

    $scope.verDescriptor = function (x) {
      y = "";
      for (var i in x) {
        y = y + x[i].etiqueta + ": " + x[i].contenido;
        //Poner coma al final
        if (i != x.length - 1) {
          y = y + "; ";
        }
      }
      return $scope.darFormato(y);
    };

    $scope.verRecurso = function (x) {
      y = "";
      for (var i in x) {
        y = $scope.recursoAux(x);
      }
      return y;
    };

    $scope.materiaAux = function (aux) {
      for (var i in $scope.materias) {
        if ($scope.materias[i].id === aux) {
          return $scope.materias[i].nombre;
        }
      }
    };

    $scope.updateMaterias = function () {
      $scope.materias = Materias.query();
      console.log("Materias actualizadas");
    };

    //Alias
    $scope.aliasAdd = function () {
      existe = false;
      var x = "nombre:" + this.alias;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
        this.alias = "";
      });
      if (this.alias === undefined || this.alias === "") {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe colocar la información del campo",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idAlias.indexOf(x) === -1) {
          for (var i in $scope.idAlias) {
            if (
              //TODO:Difuminar la conversión a mayúsculas
              $scope.idAlias[i].nombre.toUpperCase() ===
              this.alias.toUpperCase()
            ) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "AL nombre alternativo ya se encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idAlias.push(obj);
          this.alias = "";
        }
      }
    };

    $scope.aliasRemove = function (x) {
      for (var i in $scope.idAlias) {
        if ($scope.idAlias[i] === x) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text: "Va a eliminar  " + x.nombre,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              $scope.idAlias.splice(i, 1);
              // funcion propia de Angular.Js refresca mi scope y recarga mis datos
              $scope.$apply();
              Swal.fire(
                "Eliminado!",
                "El nombre alternativo ha sido eliminado.",
                "success"
              );
            }
          });
        }
      }
    };

    //Materia relacionada
    $scope.materiaRelacionadaAdd = function () {
      existe = false;
      x = "id:" + this.materiaRelacionada;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (
        this.materiaRelacionada === undefined ||
        this.materiaRelacionada === "" ||
        this.materiaRelacionada === undefined ||
        this.materiaRelacionada === ""
      ) {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar una materia",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idMateriasRelacionadas.indexOf(x) === -1) {
          for (var i in $scope.idMateriasRelacionadas) {
            if (
              $scope.idMateriasRelacionadas[i].id === this.materiaRelacionada
            ) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "La materia ya se encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idMateriasRelacionadas.push(obj);
          this.materiaRelacionada = "";
        }
      }
    };

    $scope.materiaRelacionadaRemove = function (x) {
      for (var i in $scope.idMateriasRelacionadas) {
        if ($scope.idMateriasRelacionadas[i].id === x) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text: "Va a eliminar  " + $scope.materiaAux(x),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              $scope.idMateriasRelacionadas.splice(i, 1);
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

    //Padres
    $scope.padresAdd = function () {
      existe = false;
      x = "id:" + this.padre;
      // $scope.sistemaAux(this.padres);
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (this.padre === undefined || this.padre === "") {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar un padre",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idPadres.indexOf(x) === -1) {
          for (var i in $scope.idPadres) {
            if ($scope.idPadres[i].id === this.padre) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "El padre ya se encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idPadres.push(obj);
          this.padre = "";
        }
      }
    };

    $scope.padresRemove = function (x) {
      for (var i in $scope.idPadres) {
        if ($scope.idPadres[i].id === x) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text: "Va a eliminar  " + $scope.materiaAux(x),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              $scope.idPadres.splice(i, 1);
              // funcion propia de Angular.Js refresca mi scope y recarga mis datos
              $scope.$apply();
              Swal.fire(
                "Eliminado!",
                "El sistema padre ha sido eliminado.",
                "success"
              );
            }
          });
        }
      }
    };

    //Hijos
    $scope.hijosAdd = function () {
      existe = false;
      x = "id:" + this.hijo;
      // $scope.sistemaAux(this.padres);
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (this.hijo === undefined || this.hijo === "") {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar un hijo",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idHijos.indexOf(x) === -1) {
          for (var i in $scope.idHijos) {
            if ($scope.idHijos[i].id === this.hijo) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "El sistema hijo ya se encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idHijos.push(obj);
          this.hijo = "";
        }
      }
    };

    $scope.hijosRemove = function (x) {
      for (var i in $scope.idHijos) {
        if ($scope.idHijos[i].id === x) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text: "Va a eliminar  " + $scope.materiaAux(x),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              $scope.idHijos.splice(i, 1);
              // funcion propia de Angular.Js refresca mi scope y recarga mis datos
              $scope.$apply();
              Swal.fire(
                "Eliminado!",
                "El sistema hijos ha sido eliminado.",
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

    //Crear método controller para crear nuevas materias
    $scope.create = function () {
      //Usar los campos form para crear un nuevo objeto $resource obra
      var materia = new Materias({
        nombre: this.nombre,
        alias: $scope.idAlias,
        materiasRelacionadas: $scope.idMateriasRelacionadas,
        padres: $scope.idPadres,
        hijos: $scope.idHijos,
        descripcion: this.descripcion,
        descriptorLibre: $scope.idDescriptores,
        vinculoRelacionado: $scope.idEnlaces,
      });

      //Usar el método '$save' de obra para enviar una petición POST apropiada
      materia.$save(
        function (response) {
          //Si la obra fue creada de la manera correcta, redireccionar a la página de la obra

          Swal.fire({
            title: "¡Registro correcto!",
            text: "El registro se ha creado correctamente",
            icon: "success",
            confirmButtonText: "Cerrar",
          });
          $location.path("materias/" + response._id);
        },
        function (errorResponse) {
          //En caso contrario, presentar mensaje de error
          Swal.fire({
            title: "¡Error!",
            text: ($scope.error = errorResponse.data.message),
            icon: "error",
            confirmButtonText: "Cerrar",
          });
          $scope.error = errorResponse.data.message;
        }
      );
    };
    //Método controller para recuperar la lista de obras
    $scope.find = function () {
      //Usar el método 'querry' de materia, para enviar una petición GET apropiada
      $scope.materias = Materias.query();
    };

    //Método controller para recuperar una única obra
    $scope.findOne = function () {
      //Usa el método 'get' de materia para enviar una petición GET apropiada
      $scope.materia = Materias.get({
        materiaId: $routeParams.materiaId,
      });
    };

    //Método controller para actualizar un único registro

    $scope.update = function () {
      //Agregar vectores para que se actualicen, el  es porque si no se hace click en la carga, el vector queda vacío
      if ($scope.idAlias.length != 0) {
        $scope.materia.alias = $scope.idAlias;
      }

      if ($scope.idMateriasRelacionadas.length != 0) {
        $scope.materia.materiasRelacionadas = $scope.idMateriasRelacionadas;
      }

      if ($scope.idPadres.length != 0) {
        $scope.materia.padres = $scope.idPadres;
      }

      if ($scope.idHijos.length != 0) {
        $scope.materia.hijos = $scope.idHijos;
      }

      if ($scope.idDescriptores.length != 0) {
        $scope.materia.descriptorLibre = $scope.idDescriptores;
      }

      if ($scope.idEnlaces.length != 0) {
        $scope.materia.vinculoRelacionado = $scope.idEnlaces;
      }

      //Usa el método $update de obra para enviar la petición PUT adecuada
      $scope.materia.$update(
        function () {
          //Si la actualización es correcta, redireccionar
          Swal.fire({
            title: "¡Registro correcto!",
            text: "El registro se ha actualizado correctamente",
            icon: "success",
            confirmButtonText: "Cerrar",
          });
          $location.path("materias/" + $scope.materia._id);
        },
        function (errorResponse) {
          Swal.fire({
            title: "¡Error!",
            text: ($scope.error = errorResponse.data.message),
            icon: "error",
            confirmButtonText: "Cerrar",
          });
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
