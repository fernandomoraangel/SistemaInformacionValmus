"use scrict";

//Controller obras
angular.module("obras").controller("ObrasController", [
  "$scope",
  "$routeParams",
  "$location",
  "Authentication",
  "Obras",
  "Actores",
  "Generos",
  "GenerosNoMusicales",
  "Materias",
  "Medios",
  "Sistemas",
  "Proyectos",
  "Idiomas",
  "Diccionarios",
  function (
    $scope,
    $routeParams,
    $location,
    Authentication,
    Obras,
    Actores,
    Generos,
    GenerosNoMusicales,
    Materias,
    Medios,
    Sistemas,
    Proyectos,
    Idiomas,
    Diccionarios
  ) {
    //Exponer el servicio Authentication
    $scope.authentication = Authentication;
    $scope.items = ["Si", "No"];
    $scope.roles = ["Autor letra", "Autor música", "Arreglista", "Compilador"];
    $scope.tipos = [
      "Musical",
      "literario",
      "dramatúrgico",
      "teatral",
      "visual",
      "plástico",
      "teórico",
    ];
    $scope.medios = [
      "Solista",
      "Orquesta",
      "Banda",
      "Solista con acompañamiento",
    ];
    $scope.eventos = ["Composición", "Estreno", "Primera grabación"];
    $scope.lugares = ["Andes", "Pacífico", "Atlántico", "Llanos"];
    $scope.centros = [
      "C",
      "C#",
      "Db",
      "E",
      "F",
      "F#",
      "G",
      "Ab",
      "A",
      "A#",
      "Bb",
      "B",
    ];
    $scope.coberturas = ["Local", "País", "Mundial"];
    $scope.dEtiquetas = [
      "Interés pedagógico",
      "Obra representativa",
      "Relación con línea de investigación",
    ];
    $scope.direcciones = ["A-B", "B-A", "No direccional"];
    $scope.tiposDeRelacion = [
      "Obra derivada",
      "Obra relacionada",
      "Variaciones sobre",
    ];
    $scope.idActores = [];
    $scope.idDenominacionesRegionales = [];
    $scope.idFechas = [];
    $scope.idCoberturas = [];
    $scope.idGeneros = [];
    $scope.idGenerosNoMusicales = [];
    $scope.idMedios = [];
    $scope.idMaterias = [];
    $scope.idProyectos = [];
    $scope.idSistemas = [];
    $scope.idIdiomas = [];
    $scope.idContenedores = [];
    $scope.idAsientosLigados = [];
    $scope.idAnotacionesCartograficoTemporales = [];
    $scope.idDescriptores = [];
    $scope.idEnlaces = [];

    $scope.idiomas = Idiomas.query();
    $scope.diccionarios = Diccionarios.query();
    $scope.proyectos = Proyectos.query();
    $scope.actores = Actores.query();
    $scope.generos = Generos.query();
    $scope.generosNoMusicales = GenerosNoMusicales.query();
    $scope.sistemas = Sistemas.query();
    $scope.medios = Medios.query();
    $scope.materias = Materias.query();
    $scope.obras = Obras.query();
    $scope.control = 0;
    $scope.reverse = false;
    var generosUpdate = 0;
    $scope.campo = "";

    //Actualizar para editar
    $scope.actualizarTodo = function () {
      $scope.idContenedores = this.obra.contenedores;
      $scope.idAsientosLigados = this.obra.asientoLigado;
      $scope.idGeneros = this.obra.generosFormas;
      $scope.idMaterias = this.obra.materias;
      $scope.idMedios = this.obra.mediosSonoros;
      $scope.idSistemas = this.obra.sistemasSonoros;
      $scope.idIdiomas = this.obra.idiomas;
      $scope.idActores = this.obra.actores;
      $scope.idAnotacionesCartograficoTemporales =
        this.obra.anotacionCartograficoTemporal;
      $scope.idDescriptores = this.obra.descriptores;
      $scope.idProyectos = this.obra.proyectos;
      $scope.idEnlaces = this.obra.vinculosRelacionados;
      // c;
    };
    // Funciones auxiliares
    $scope.abrirVentana = function (url) {
      window.open(url);
    };

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

      y = y.slice(0, y.length - 2);
      return y;
    };

    //Ver
    $scope.verActores = function (x) {
      y = "";
      for (var i in x) {
        y = y + $scope.actorAux(x[i].id) + " (" + x[i].rol + ") ,";
      }
      return $scope.darFormato(y);
    };

    $scope.verGeneros = function (x) {
      y = "";
      for (var i in x) {
        y = y + $scope.generoAux(x[i].id) + ", ";
      }
      return $scope.darFormato(y);
    };

    $scope.verContenedores = function (x) {
      y = "";
      for (var i in x) {
        y = y + $scope.obraAux(x[i].id) + ", ";
      }
      return $scope.darFormato(y);
    };

    $scope.verMaterias = function (x) {
      y = "";
      for (var i in x) {
        y = y + $scope.materiaAux(x[i].id) + ", ";
      }
      return $scope.darFormato(y);
    };

    $scope.verMedios = function (x) {
      y = "";
      for (var i in x) {
        y = y + $scope.medioAux(x[i].id) + ", ";
      }
      return $scope.darFormato(y);
    };

    $scope.verSistemas = function (x) {
      y = "";
      for (var i in x) {
        y = y + $scope.sistemaAux(x[i].id) + " " + x[i].centro + ", ";
      }
      return $scope.darFormato(y);
    };

    $scope.verAnotacion = function (x) {
      y = "";
      for (var i in x) {
        y =
          y +
          x[i].lugar +
          ", " +
          x[i].evento +
          ", " +
          x[i].coberturaAmplitud +
          ", " +
          x[i].fechaInicio +
          ", " +
          x[i].fechaFin +
          ", " +
          x[i].evidencias +
          ". ";
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

    $scope.verIdiomas = function (x) {
      y = "";

      for (var i in x) {
        y = y + x[i].idioma + ", ";
      }
      return $scope.darFormato(y);
    };

    $scope.verProyecto = function (x) {
      y = "";
      for (var i in x) {
        y = y + $scope.proyectoAux(x[i].id) + ", ";
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

    //Obras-contenedores
    $scope.updateObras = function () {
      if ($scope.control === 0) {
        $scope.obras = Obras.query();
        $scope.control = 1;
      }
    };

    $scope.obraAux = function (aux) {
      for (var i in $scope.obras) {
        if ($scope.obras[i].id === aux) {
          return $scope.obras[i].titulo;
        }
      }
    };

    $scope.obraAdd = function () {
      existe = false;
      x = "id:" + this.contenedor;
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
          text: "Debe seleccionar una obra",
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
                text: "La obra ya se encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idContenedores.push(obj);
          this.contenedor = "";
        }
      }
      // console.log($scope.idContenedores)
    };

    $scope.obraRemove = function (x) {
      for (var i in $scope.idContenedores) {
        Swal.fire({
          title: "¡Advertencia de eliminación!",
          text: "Va a eliminar  " + $scope.obraAux(x),
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
        if ($scope.idContenedores[i].id === x) {
          $scope.idContenedores.splice(i, 1);
        }
      }
    };

    //Denominación Regional-socio-cultural
    $scope.denominacionRegionalAdd = function () {
      existe = false;
      x =
        "denominacionRegional:" +
        this.denominacionRegional +
        ",fuenteDenominacion:" +
        this.fuenteDenominacion;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (
        this.denominacionRegional === undefined ||
        this.denominacionRegional === "" ||
        this.fuenteDenominacion === undefined ||
        this.fuenteDenominacion === ""
      ) {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe agregar una denominación regional y su fuente",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idDenominacionesRegionales.indexOf(x) === -1) {
          for (var i in $scope.idDenominacionesRegionales) {
            if (
              $scope.idDenominacionesRegionales[i].denominacionRegional ===
                this.denominacionRegional &&
              $scope.idDenominacionesRegionales[i].fuenteDenominacion ===
                this.fuenteDenominacion
            ) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "La denominación y fuente ya se encuentran ya en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idDenominacionesRegionales.push(obj);
          this.denominacionRegional = "";
          this.fuenteDenominacion = "";
        }
      }
    };

    $scope.denominacionRegionalRemove = function (x) {
      for (var i in $scope.idDenominacionesRegionales) {
        if ($scope.idDenominacionesRegionales[i].denominacionRegional === x) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text:
              "Va a eliminar  " +
              $scope.idDenominacionesRegionales[i].denominacionRegional +
              " " +
              $scope.idDenominacionesRegionales[i].fuenteDenominacion,
            icon: "warning",
            confirmButtonText: "Cerrar",
          });

          $scope.idDenominacionesRegionales.splice(i, 1);
        }
      }
    };

    //Asientos ligados
    $scope.asientoLigadoAux = function (aux) {
      for (var i in $scope.obras) {
        if ($scope.obras[i].id === aux) {
          return $scope.obras[i].titulo;
        }
      }
    };
    $scope.asientoLigadoAdd = function (x) {
      //Verificar que los campos están llenos
      existe = false;
      x =
        "asientoligado:" +
        this.asientoligado +
        ",tipoDeRelacion:" +
        this.tipoDeRelacion +
        ",direccionDeRelacion:" +
        this.direccionDeRelacion +
        ",fuenteRelacion:" +
        this.fuenteRelacion +
        ",proyectoRelacion:" +
        this.proyectoRelacion +
        ",notaGeneral:" +
        this.notaGeneral;

      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (this.asientoligado === undefined || this.asientoligado === "") {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe completar los campos del asiento ligado",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idAsientosLigados.indexOf(x) === -1) {
          for (var i in $scope.idContenedores) {
            if ($scope.idContenedores[i].id === this.contenedor) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "EL asiento ligado ya se encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idAsientosLigados.push(obj);
          this.asientoligado = "";
          this.tipoDeRelacion = "";
          this.direccionDeRelacion = "";
          this.fuenteRelacion = "";
          this.proyectoRelacion = "";
          this.notaGeneral = "";
          //Vaciar los otros campos
        }
      }
      // console.log($scope.idContenedores)
    };

    $scope.asientoLigadoRemove = function (x) {
      for (var i in $scope.idAsientosLigados) {
        Swal.fire({
          title: "¡Advertencia de eliminación!",
          text: "Va a eliminar  " + $scope.obraAux(x),
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
        if ($scope.idAsientosLigados[i].asientoligado === x) {
          $scope.idAsientosLigados.splice(i, 1);
        }
      }
    };

    $scope.nombrarSi = function (nombre, x) {
      if (x === "undefined" || x === "" || x === undefined) {
        return;
      } else {
        return " " + nombre + ": " + x;
      }
    };

    //Generos
    $scope.updateGeneros = function () {
      $scope.generos = Generos.query();
    };

    $scope.generoAux = function (aux) {
      for (var i in $scope.generos) {
        if ($scope.generos[i].id === aux) {
          return $scope.generos[i].nombre;
        }
      }
    };

    $scope.generoAdd = function (x) {
      existe = false;
      x = "id:" + this.genero;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (this.genero === undefined || this.genero === "") {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar un género-forma",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idGeneros.indexOf(x) === -1) {
          for (var i in $scope.idGeneros) {
            if ($scope.idGeneros[i].id === this.genero) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "El género-forma ya se encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              this.genero = "";
              existe = true;
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idGeneros.push(obj);
          this.genero = "";
        }
      }
    };

    $scope.generoRemove = function (x) {
      Swal.fire({
        title: "¡Advertencia de eliminación!",
        text: "Va a eliminar  " + $scope.generoAux(x),
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
      for (var i in $scope.idGeneros) {
        if ($scope.idGeneros[i].id === x) {
          $scope.idGeneros.splice(i, 1);
        }
      }
    };

    //Generos no musicales
    $scope.updateGenerosNoMusicales = function () {
      $scope.generosNoMusicales = GenerosNoMusicales.query();
    };

    $scope.generoNoMusicalAux = function (aux) {
      for (var i in $scope.generosNoMusicales) {
        if ($scope.generosNoMusicales[i].id === aux) {
          return $scope.generosNoMusicales[i].nombre;
        }
      }
    };

    $scope.generoNoMusicalAdd = function (x) {
      existe = false;
      x = "id:" + this.generoNoMusical;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (this.generoNoMusical === undefined || this.generoNoMusical === "") {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar un género-forma no musical",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idGenerosNoMusicales.indexOf(x) === -1) {
          for (var i in $scope.idGenerosNoMusicales) {
            if ($scope.idGenerosNoMusicales[i].id === this.generoNoMusical) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "El género-forma no musical ya se encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              this.generoNoMusical = "";
              existe = true;
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idGenerosNoMusicales.push(obj);
          this.generoNoMusical = "";
        }
      }
    };

    $scope.generoNoMusicalRemove = function (x) {
      Swal.fire({
        title: "¡Advertencia de eliminación!",
        text: "Va a eliminar  " + $scope.generoNoMusicalAux(x),
        icon: "warning",
        confirmButtonText: "Cerrar",
      });
      for (var i in $scope.idGenerosNoMusicales) {
        if ($scope.idGenerosNoMusicales[i].id === x) {
          $scope.idGenerosNoMusicales.splice(i, 1);
        }
      }
    };

    //Materias
    $scope.updateMaterias = function () {
      $scope.materias = Materias.query();
    };

    $scope.materiaAux = function (aux) {
      for (var i in $scope.materias) {
        if ($scope.materias[i].id === aux) {
          return $scope.materias[i].nombre;
        }
      }
    };

    $scope.materiaAdd = function (x) {
      existe = false;
      x = "id:" + this.materia;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (this.materia === undefined || this.materia === "") {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar una materia",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idMaterias.indexOf(x) === -1) {
          for (var i in $scope.idMaterias) {
            if ($scope.idMaterias[i].id === this.materia) {
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
          $scope.idMaterias.push(obj);
          this.materia = "";
        }
      }
      // console.log($scope.idContenedores)
    };

    $scope.materiaRemove = function (x) {
      for (var i in $scope.idMaterias) {
        Swal.fire({
          title: "¡Advertencia de eliminación!",
          text: "Va a eliminar  " + $scope.materiaAux(x),
          icon: "warning",
          confirmButtonText: "Cerrar",
        });

        if ($scope.idMaterias[i].id === x) {
          $scope.idMaterias.splice(i, 1);
        }
      }
    };

    //Medios
    $scope.updateMedios = function () {
      $scope.medios = Medios.query();
    };

    $scope.medioAux = function (aux) {
      for (var i in $scope.medios) {
        if ($scope.medios[i].id === aux) {
          return $scope.medios[i].nombre;
        }
      }
    };

    $scope.medioAdd = function (x) {
      existe = false;
      x = "id:" + this.medio;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (this.medio === undefined || this.medio === "") {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar un medio",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idMedios.indexOf(x) === -1) {
          for (var i in $scope.idMedios) {
            if ($scope.idMedios[i].id === this.medio) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "El medio ya se encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idMedios.push(obj);
          this.medio = "";
        }
      }
    };

    $scope.medioRemove = function (x) {
      for (var i in $scope.idMedios) {
        Swal.fire({
          title: "¡Advertencia de eliminación!",
          text: "Va a eliminar  " + $scope.medioAux(x),
          icon: "warning",
          confirmButtonText: "Cerrar",
        });
        if ($scope.idMedios[i].id === x) {
          $scope.idMedios.splice(i, 1);
        }
      }
    };

    //Sistemas
    $scope.updateSistemas = function () {
      $scope.sistemas = Sistemas.query();
    };

    $scope.sistemaAux = function (aux) {
      for (var i in $scope.sistemas) {
        if ($scope.sistemas[i].id === aux) {
          return $scope.sistemas[i].nombre;
        }
      }
    };

    $scope.sistemaAdd = function (x) {
      existe = false;
      x = "id:" + this.sistema + ",centro:" + this.centroSistema;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (this.sistema === undefined || this.sistema === "") {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar un sistema",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idSistemas.indexOf(x) === -1) {
          for (var i in $scope.idSistemas) {
            if ($scope.idSistemas[i].id === this.sistema) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "El sistema ya se encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idSistemas.push(obj);
          this.sistema = "";
          this.centroSistema = "";
        }
      }
    };

    $scope.sistemaRemove = function (x) {
      for (var i in $scope.idSistemas) {
        Swal.fire({
          title: "¡Advertencia de eliminación!",
          text: "Va a eliminar  " + $scope.sistemaAux(x),
          icon: "warning",
          confirmButtonText: "Cerrar",
        });

        if ($scope.idSistemas[i].id === x) {
          $scope.idSistemas.splice(i, 1);
        }
      }
    };

    //Idiomas
    $scope.idiomaAdd = function () {
      existe = false;
      //TODO:Revisar que pasa que no se comporta como las otras funciones semejantes y hubo que remendarla
      try {
        x = "idioma:" + this.idioma.idioma;
      } catch (e) {
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar un idioma",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
        return;
      }
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (this.idioma.idioma === undefined || this.idioma.idioma === "") {
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
            if ($scope.idIdiomas[i].idioma === this.idioma.idioma) {
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
        if ($scope.idIdiomas[i] === x) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text: "Va a eliminar  " + $scope.idIdiomas[i].idioma,
            icon: "warning",
            confirmButtonText: "Cerrar",
          });

          $scope.idIdiomas.splice(i, 1);
          this.idioma = "";
        }
      }
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
      existe = false;
      x = "id:" + this.actor + ",rol:" + this.rol;
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
              $scope.idActores.splice(i, 1); //Nunca se ejecuta
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
      var x =
        "lugar:" +
        this.lugar +
        ",evento:" +
        this.evento +
        ",coberturaAmplitud:" +
        this.coberturaAmplitud +
        ",fechaDeInicio:" +
        this.fechaDeInicio +
        ",fechaDeFin:" +
        this.fechaDeFin +
        ",evidencia:" +
        this.evidencia;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (this.evento === undefined || this.evento === "") {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar un evento",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idAnotacionesCartograficoTemporales.indexOf(x) === -1) {
          for (var i in $scope.idAnotacionesCartograficoTemporales) {
            if (
              $scope.idAnotacionesCartograficoTemporales[i].lugar ===
                this.lugar &&
              $scope.idAnotacionesCartograficoTemporales[i].evento ===
                this.evento &&
              $scope.idAnotacionesCartograficoTemporales[i].coberturaAmplitud ===
                this.coberturaAmplitud &&
              $scope.idAnotacionesCartograficoTemporales[i].fechaDeInicio ===
                this.fechaDeInicio &&
              $scope.idAnotacionesCartograficoTemporales[i].fechaDeFin ===
                this.fechaDeFin &&
              $scope.idAnotacionesCartograficoTemporales[i].evidencia ===
                this.evidencia
            ) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "La anotación ya se encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idAnotacionesCartograficoTemporales.push(obj);
          this.lugar = "";
          this.evento = "";
          this.coberturaAmplitud = "";
          this.fechaDeInicio = "";
          this.fechaDeFin = "";
          this.evidencia = "";
        }
      }
    };

    $scope.anotacionCartograficoTemporalRemove = function (l,e,c,fi,ff,evi) {
      for (var i in $scope.idAnotacionesCartograficoTemporales) {
        if (
          $scope.idAnotacionesCartograficoTemporales[i].lugar === l &&
          $scope.idAnotacionesCartograficoTemporales[i].evento === e &&
          $scope.idAnotacionesCartograficoTemporales[i].coberturaAmplitud ===
            c &&
          $scope.idAnotacionesCartograficoTemporales[i].fechaDeInicio === fi &&
          $scope.idAnotacionesCartograficoTemporales[i].fechaDeFin === ff &&
          $scope.idAnotacionesCartograficoTemporales[i].evidencia === evi
        ) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text:
              "Va a eliminar a: lugar: " +
              $scope.idAnotacionesCartograficoTemporales[i].lugar +
              ", evento: " +
              $scope.idAnotacionesCartograficoTemporales[i].evento +
              ", coberturaAmplitud: " +
              $scope.idAnotacionesCartograficoTemporales[i].coberturaAmplitud +
              ", fechaDeInicio: " +
              $scope.idAnotacionesCartograficoTemporales[i].fechaDeInicio +
              ", fechaDeFin: " +
              $scope.idAnotacionesCartograficoTemporales[i].fechaDeFin +
              ", evidencia: " +
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
              Swal.fire("Eliminado!", "El actor ha sido eliminado.", "success");
            }
          });
        }
      }
    };
    //Menú descriptores libres
    $scope.dDescriptorAdd = function () {
      existe = false;
      var x = "dEtiqueta:" + this.dEtiqueta + ",dContenido:" + this.dContenido;
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
                text: "La etiqueta se encuentran ya en la lista",
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
          $scope.idDescriptores[i].dContenido === y &&
          $scope.idDescriptores[i].dEtiqueta === x
        ) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text:
              "Va a eliminar  " +
              $scope.idDescriptores[i].dEtiqueta +
              ", " +
              $scope.idDescriptores[i].dContenido,
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

    //Proyectos

    $scope.proyectoAux = function (aux) {
      //console.log(aux);
      for (var i in $scope.proyectos) {
        if ($scope.proyectos[i].id === aux) {
          return $scope.proyectos[i].nombre;
        }
      }
    };

    $scope.proyectoAdd = function () {
      x = "id:" + this.proyecto;
      existe = false;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });

      if (
        this.proyecto === undefined ||
        this.proyecto === ""
      ) {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar un proyecto",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idProyectos.indexOf(x) === -1) {
          for (var i in $scope.idProyectos) {
            if (
              $scope.idProyectos[i].id === this.proyecto 
            ) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "El proyecto se ya encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idProyectos.push(obj);
          this.proyecto = "";
        }
      }
    };

    $scope.proyectoRemove = function (x) {
      for (var i in $scope.idProyectos) {
        if ($scope.idProyectos[i].id === x) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text:
              "Va a eliminar  " +
              $scope.proyectoAux(x),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              $scope.idProyectos.splice(i, 1); 
              // funcion propia de Angular.Js refresca mi scope y recarga mis datos
              $scope.$apply();
              Swal.fire(
                "Eliminado!",
                "El proyecto ha sido eliminado.",
                "success"
              );
            }
          });
        }
      }
        };
    

    //Enlaces
    $scope.enlaceAdd = function () {
      existe = false;
      var x = "eEtiqueta:" + this.eEtiqueta + ",eUrl:" + this.eUrl;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (
        this.eEtiqueta === undefined ||
        this.eEtiqueta === ""||
        this.eUrl === undefined ||
        this.eUrl === ""
      ) {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar un proyecto",
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
                text: "El proyecto se ya encuentra en la lista",
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

    $scope.enlaceRemove = function (x,y) {
      for (var i in $scope.idEnlaces) {
        if ($scope.idEnlaces[i].eEtiqueta === x && $scope.idEnlaces[i].eUrl === y) {
          
            Swal.fire({
              title: "¡Advertencia de eliminación!",
              text:
                "Va a eliminar: Descripción " +$scope.idEnlaces[i].eEtiqueta+
                ", Url: " +$scope.idEnlaces[i].eUrl,
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
                  "El proyecto ha sido eliminado.",
                  "success"
                );
              }
            });
          }
        }
      
    };

    //Crear método controller para crear nuevos registros
    $scope.create = function () {
      //Usar los campos form para crear un nuevo objeto $resource obra
      var obra = new Obras({
        titulo: this.titulo,
        denominacionRegional: this.denominacionRegional,
        descripcion: this.descripcion,
        tipo: this.tipo,
        contenedores: $scope.idContenedores,
        asientoLigado: $scope.idAsientoLigado,
        generosFormas: $scope.idGeneros,
        GenerosFormasNoMusicales: $scope.idGenerosFormasNoMusicales,
        materias: $scope.idMaterias,
        mediosSonoros: $scope.idMedios,
        sistemasSonoros: $scope.idSistemas,
        idiomas: $scope.idIdiomas,
        actores: $scope.idActores,
        anotacionCartograficoTemporal:
          $scope.idAnotacionesCartograficoTemporales,
        descriptores: $scope.idDescriptores,
        proyectos: $scope.idProyectos,
        vinculosRelacionados: $scope.idEnlaces,
      });
      //Usar el método '$save' de obra para enviar una petición POST apropiada
      obra.$save(
        function (response) {
          //Si la obra fue creada de la manera correcta, redireccionar a la página de la obra
          Swal.fire({
            title: "¡Registro correcto!",
            text: "El registro se ha creado correctamente",
            icon: "success",
            confirmButtonText: "Cerrar",
          });
          $location.path("obras/" + response._id);
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
      $scope.obras = Obras.query();
    };

    //Método controller para recuperar una única obra
    $scope.findOne = function () {
      //Usa el método 'get' de obra para enviar una petición GET apropiada
      $scope.obra = Obras.get({
        obraId: $routeParams.obraId,
      });
    };

    //Método controller para actualizar una única obra
    $scope.update = function () {
      //Usa el método $update de obra para enviar la petición PUT adecuada
      $scope.obra.$update(
        function () {
          //Si la actualización es correcta, redireccionar
          $location.path("obras/" + $scope.obra._id);
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
