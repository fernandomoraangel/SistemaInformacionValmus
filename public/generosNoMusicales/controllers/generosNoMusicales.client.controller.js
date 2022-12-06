"use scrict";

//Controller géneros NO MUSICALES
angular
  .module("generosNoMusicales")
  .controller("GenerosNoMusicalesController", [
    "$scope",
    "$routeParams",
    "$location",
    "Authentication",
    "GenerosNoMusicales",
    "Idiomas",
    function (
      $scope,
      $routeParams,
      $location,
      Authentication,
      GenerosNoMusicales,
      Idiomas
    ) {
      //Exponer el servicio Authentication
      $scope.authentication = Authentication;
      $scope.items = ["Si", "No"];
      $scope.rols = ["Autor letra", "Autor música", "Arreglista", "Compilador"];
      $scope.tipos = [
        "Partitura",
        "Grabación de audio",
        "Grabación de video",
        "Libro",
        "Revista",
      ];
      $scope.eventos = ["Composición", "Estreno", "Primera grabación"];
      $scope.lugares = ["Andes", "Pacífico", "Atlántico", "Llanos"];
      $scope.coberturas = ["Local", "País", "Mundial"];
      $scope.proyectos = ["Andes", "Emisoras", "Industria discográfica"];
      $scope.nNormalizados = ["ISBN", "ISSN", "ISMN", "ISAN", "ISWC", "ISRC"];
      $scope.dEtiquetas = [
        "Interés pedagógico",
        "Obra representativa",
        "Relación con línea de investigación",
      ];
      $scope.idActores = [];
      $scope.idAnotacionesCartograficoTemporales = [];
      $scope.idDescriptores = [];
      $scope.idEnlaces = [];
      $scope.idiomas = Idiomas.query();
      $scope.idTipos = [];
      $scope.idGenerosRelacionados = [];
      $scope.idAlias = [];
      $scope.idPadres = [];
      $scope.idHijos = [];
      $scope.idIdiomas = [];
      $scope.generosNoMusicales = GenerosNoMusicales.query();
      var generoNoMusicalId;
      $scope.reverse = false;
      //Preparar datos
      $scope.actualizarTodo = function () {
        $scope.idEstados = this.generoNoMusical.estados;
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

      $scope.verGeneros = function (x) {
        y = "";
        for (var i in x) {
          y = y + $scope.generoAux(x[i].id);
          //Poner coma al final
          if (i != x.length - 1) {
            y = y + ", ";
          }
        }
        return $scope.darFormato(y);
      }
  

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
  
      $scope.verIdiomas = function (x) {
        y = "";
        for (var i in x) {
          y = y + $scope.idiomasAux(x[i].id);
          //Poner coma al final
          if (i != x.length - 1) {
            y = y + ", ";
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

      $scope.generoAux = function (aux) {
        var out = "";
        try {
          for (var i in $scope.generosNoMusicales) {
            if ($scope.generosNoMusicales[i].id === aux) {
              out = $scope.generosNoMusicales[i].nombre;
            }
          }
        } catch (e) {
          alert("error " + e);
        }
        return out;
      };

      $scope.autorAux = function (aux) {
        for (var i in $scope.actores) {
          if ($scope.actores[i]._id === aux) {
            return $scope.actores[i].fullName;
          }
        }
      };

      $scope.updateGenerosNoMusicales = function () {
        $scope.generosNoMusicales = GenerosNoMusicales.query();
        //console.log("Géneros actualizados")
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

      //Género relacionado
      $scope.generoRelacionadoAdd = function () {
        existe = false;
        var x = "id:" + this.generoRelacionado;
        var properties = x.split(",");
        var obj = {};
        properties.forEach(function (property) {
          var tup = property.split(":");
          obj[tup[0]] = tup[1];
        });
        if (
          this.generoRelacionado === undefined ||
          this.generoRelacionado === ""
        ) {
          //Mostrar mensaje de error
          Swal.fire({
            title: "¡Error!",
            text: "Debe seleccionar un género",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        } else {
          if ($scope.idGenerosRelacionados.indexOf(x) === -1) {
            for (var i in $scope.idGenerosRelacionados) {
              if (
                $scope.idGenerosRelacionados[i].id === this.generoRelacionado
              ) {
                //Mensaje de error
                Swal.fire({
                  title: "¡Error!",
                  text: "El género ya se encuentra en la lista",
                  icon: "error",
                  confirmButtonText: "Cerrar",
                });
                existe = true;
                return;
              }
            }
          }
          if (existe === false) {
            $scope.idGenerosRelacionados.push(obj);
            this.generoRelacionado = "";
          }
        }
      };

      $scope.generoRelacionadoRemove = function (x) {
        for (var i in $scope.idGenerosRelacionados) {
          if ($scope.idGenerosRelacionados[i].id === x) {
            Swal.fire({
              title: "¡Advertencia de eliminación!",
              text: "Va a eliminar  " + $scope.generoAux(x),
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Confirmar",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                $scope.idGenerosRelacionados.splice(i, 1);
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
              text: "Va a eliminar  " + $scope.generoAux(x),
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
                  text: "El  hijo ya se encuentra en la lista",
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
              text: "Va a eliminar  " + $scope.generoAux(x),
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

      //Idiomas
      $scope.idiomasAux = function (aux) {
        for (var i in $scope.idiomas) {
          if ($scope.idiomas[i].id === aux) {
            return $scope.idiomas[i].idioma;
          }
        }
      };

      $scope.idiomaAdd = function () {
        existe = false;
        x = "id:" + this.idioma;
        var properties = x.split(",");
        var obj = {};
        properties.forEach(function (property) {
          var tup = property.split(":");
          obj[tup[0]] = tup[1];
        });
        if (this.idioma === undefined || this.idioma === "") {
          //Mostrar mensaje de error
          Swal.fire({
            title: "¡Error!",
            text: "Debe seleccionar un idioma",
            icon: "error",
            confirmButtonText: "Cerrar",
          });
        } else {
          if ($scope.idIdiomas.indexOf(x) === -1) {
            for (var i in $scope.idIdiomas) {
              if ($scope.idIdiomas[i].id === this.idioma) {
                //Mensaje de error
                Swal.fire({
                  title: "¡Error!",
                  text: "El idioma ya se encuentra en la lista",
                  icon: "error",
                  confirmButtonText: "Cerrar",
                });
                existe = true;
                return;
              }
            }
          }
          if (existe === false) {
            $scope.idIdiomas.push(obj);
            this.idioma = "";
          }
        }
      };

      $scope.idiomaRemove = function (x) {
        for (var i in $scope.idIdiomas) {
          if ($scope.idIdiomas[i].id === x) {
            Swal.fire({
              title: "¡Advertencia de eliminación!",
              text: "Va a eliminar  " + $scope.idiomasAux(x),
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Confirmar",
              cancelButtonText: "Cancelar",
            }).then((result) => {
              if (result.isConfirmed) {
                $scope.idIdiomas.splice(i, 1);
                // funcion propia de Angular.Js refresca mi scope y recarga mis datos
                $scope.$apply();
                Swal.fire(
                  "Eliminado!",
                  "El idioma ha sido eliminado.",
                  "success"
                );
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
                $scope.idAnotacionesCartograficoTemporales[i]
                  .coberturaAmplitud +
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
                this.eEtiqueta = "";
                this.eUrl = "";
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

      //Crear método controller para crear nuevos géneros no musicales
      $scope.create = function () {
        //Usar los campos form para crear un nuevo objeto $resource obra
        var generoNoMusical = new GenerosNoMusicales({
          nombre: this.nombre,
          alias: $scope.idAlias,
          generosRelacionados: $scope.idGenerosRelacionados,
          padres: $scope.idPadres,
          hijos: $scope.idHijos,
          descripcion: this.descripcion,
          anotacionCartograficoTemporal:
            $scope.idAnotacionesCartograficoTemporales,
          idioma: $scope.idIdiomas,
          descriptorLibre: $scope.idDescriptores,
          vinculoRelacionado:$scope.idEnlaces
        });

        //Usar el método '$save' de genero no musical para enviar una petición POST apropiada
        generoNoMusical.$save(
          function (response) {
            Swal.fire({
              title: "¡Registro correcto!",
              text: "El registro se ha creado correctamente",
              icon: "success",
              confirmButtonText: "Cerrar",
            });
            //Si la obra fue creada de la manera correcta, redireccionar a la página de la obra
            $location.path('generosnomusicales/' + response._id);
          },
          function (errorResponse) {
            //En caso contrario, presentar mensaje de error
            Swal.fire({
              title: "¡Error!",
              text: $scope.error = errorResponse.data.message,
              icon: "error",
              confirmButtonText: "Cerrar",
            });
            $scope.error = errorResponse.data.message;
          }
        );
      };

      //Método controller para recuperar la lista de registros
      $scope.find = function () {
        //Usar el método 'querry' de obra, para enviar una petición GET apropiada
        $scope.generosNoMusicales = GenerosNoMusicales.query();
      };

      //Método controller para recuperar una única obra
      $scope.findOne = function () {
        //Usa el método 'get' de obra para enviar una petición GET apropiada
        $scope.generoNoMusical = GenerosNoMusicales.get({
          generoNoMusicalId: $routeParams.generoNoMusicalId,
        });
      };

      //Método controller para actualizar una única obra
      $scope.update = function () {
        //Agregar actores
        for (var i in $scope.idActores) {
          actorObra = new ActoresObras({
            actor: $scope.idActores[i].id,
            obra: $routeParams.obraId,
            roll: $scope.idActores[i].rol,
          });

          //Usar el método '$save' de actor para enviar una petición POST apropiada
          generoNoMusical.$save(
            function (response) {
              //$location.path('obras/' + obraId);
            },
            function (errorResponse) {
              //En caso contrario, presentar mensaje de error
              $scope.error = errorResponse.data.message;
              alert("Problemas al crear el registro " + $scope.error);
            }
          );
        }

        //Usa el método $update de obra para enviar la petición PUT adecuada
        $scope.obra.$update(
          function () {
            //Si la actualización es correcta, redireccionar
            $location.path("generoNoMusical/" + $scope.generoNoMusical._id);
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
          if (generoNoMusical) {
            //Confirmar

            //Usar el método '$remove' del la obra para borrarla
            generoNoMusical.$remove(function () {
              //Eliminar la obra de la lista
              for (var i in $scope.obras) {
                if ($scope.generoNoMusical[i] === generoNoMusical) {
                  $scope.generosNoMusicales.splice(i, 1);
                }
              }
            });
          } else {
            //En otro caso usar el método $remove para borrar
            $scope.generoNoMusical.$remove(function () {
              $location.path("generosNoMusicales");
            });
          }
        } else {
        }
      };
    },
  ]);
