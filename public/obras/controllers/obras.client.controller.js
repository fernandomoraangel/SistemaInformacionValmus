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
    $scope.tipos = ["Musical", "literario", "dramatúrgico", "teatral", "visual", "plástico", "teórico"];
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
    $scope.idiomas = Idiomas.query();
    $scope.diccionarios = Diccionarios.query();
    $scope.idActores = [];
    $scope.idFechas = [];
    $scope.idCoberturas = [];
    $scope.idGeneros = [];
    $scope.idMedios = [];
    $scope.idMaterias = [];
    $scope.idProyectos = [];
    $scope.idSistemas = [];
    $scope.idIdiomas = [];
    $scope.idContenedores = [];
    $scope.idAnotacionesCartograficoTemporales = [];
    $scope.idDescriptores = [];
    $scope.idEnlaces = [];
    $scope.proyectos = Proyectos.query();
    $scope.actores = Actores.query();
    $scope.generos = Generos.query();
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
      c;
    };
    // Funciones auxiliares

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

    $scope.obraAdd = function (x) {
      x = "id:" + this.contenedor;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      $scope.idContenedores.push(obj);
      this.contenedor = "";
    };

    $scope.obraRemove = function (x) {
      for (var i in $scope.idContenedores) {
        alert("va a eliminar a " + $scope.obraAux(x));
        if ($scope.idContenedores[i].id === x) {
          $scope.idContenedores.splice(i, 1);
        }
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
      x = "id:" + this.genero;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      $scope.idGeneros.push(obj);
      this.genero = "";
    };

    $scope.generoRemove = function (x) {
      alert("va a eliminar a " + $scope.generoAux(x));
      for (var i in $scope.idGeneros) {
        if ($scope.idGeneros[i].id === x) {
          $scope.idGeneros.splice(i, 1);
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
      x = "id:" + this.materia;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      $scope.idMaterias.push(obj);
      this.materia = "";
    };

    $scope.materiaRemove = function (x) {
      for (var i in $scope.idMaterias) {
        alert("va a eliminar a " + $scope.materiaAux(x));
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
      c;
    };

    $scope.medioAdd = function (x) {
      x = "id:" + this.medio;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      $scope.idMedios.push(obj);
      this.medio = "";
    };

    $scope.medioRemove = function (x) {
      for (var i in $scope.idMedios) {
        alert("va a eliminar a " + $scope.medioAux(x));
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
      x = "id:" + this.sistema + ",centro:" + this.centroSistema;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      $scope.idSistemas.push(obj);
      this.sistema = "";
      this.centroSistema = "";
    };

    $scope.sistemaRemove = function (x) {
      for (var i in $scope.idSistemas) {
        alert("va a eliminar a " + $scope.sistemaAux(x));
        if ($scope.idSistemas[i].id === x) {
          $scope.idSistemas.splice(i, 1);
        }
      }
    };

    //Idiomas
    $scope.idiomaAdd = function () {
      x = "idioma:" + this.idioma.idioma;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      $scope.idIdiomas.push(obj);
      this.idioma = "";
    };

    $scope.idiomaRemove = function (x) {
      for (var i in $scope.idIdiomas) {
        if ($scope.idIdiomas[i] === x) {
          alert("va a eliminar a " + $scope.idIdiomas[i].idioma);
          $scope.idIdiomas.splice(i, 1);
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
      x = "id:" + this.actor + ",rol:" + this.rol;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      $scope.idActores.push(obj);
    };

    $scope.actorRemove = function (x) {
      for (var i in $scope.idActores) {
        if ($scope.idActores[i].id === x) {
          alert("va a eliminar a " + $scope.actorAux(x));
          $scope.idActores.splice(i, 1);
        }
      }
    };

    //Anotaciones cartográfico temporales

    $scope.anotacionCartograficoTemporalAdd = function () {
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
        ",evidencias:" +
        this.evidencia;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      $scope.idAnotacionesCartograficoTemporales.push(obj);
    };

    $scope.anotacionCartograficoTemporalRemove = function (x) {
      for (var i in $scope.idAnotacionesCartograficoTemporales) {
        if ($scope.idAnotacionesCartograficoTemporales[i].lugar === x) {
          alert(
            "va a eliminar a " +
              $scope.idAnotacionesCartograficoTemporales[i].lugar
          );
          $scope.idAnotacionesCartograficoTemporales.splice(i, 1);
        }
      }
    };
    //Menú descriptores libres
    $scope.dDescriptorAdd = function () {
      //alert(x);
      var x = "etiqueta:" + this.dEtiqueta + ",contenido:" + this.dContenido;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      $scope.idDescriptores.push(obj);
    };

    $scope.dDescriptorRemove = function (x) {
      for (var i in $scope.idDescriptores) {
        if ($scope.idDescriptores[i].contenido === x) {
          alert("va a eliminar a " + $scope.idDescriptores[i].contenido);
          $scope.idDescriptores.splice(i, 1);
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

    $scope.proyectoAdd = function (x) {
      x = "id:" + this.proyecto;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      $scope.idProyectos.push(obj);
    };

    $scope.proyectoRemove = function (x) {
      for (var i in $scope.idProyectos) {
        alert("va a eliminar a " + $scope.proyectoAux(x));
        if ($scope.idProyectos[i].proyecto === x) {
          $scope.idProyectos.splice(i, 1);
        }
      }
    };

    //Menú enlaces
    $scope.enlaceAdd = function () {
      //alert(x);
      var x = "etiqueta:" + this.eEtiqueta + ",url:" + this.eUrl;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      $scope.idEnlaces.push(obj);
    };

    $scope.enlaceRemove = function (x) {
      alert(x);
      for (var i in $scope.idEnlaces) {
        if ($scope.idEnlaces[i].etiqueta === x) {
          alert("va a eliminar a " + $scope.idEnlaces[i].etiqueta);
          $scope.idEnlaces.splice(i, 1);
        }
      }
    };

    //Crear método controller para crear nuevos registros
    $scope.create = function () {
      //Usar los campos form para crear un nuevo objeto $resource obra
      var obra = new Obras({
        titulo: this.titulo,
        descripcion: this.descripcion,
        tipo: this.tipo,
        contenedores: $scope.idContenedores,
        generosFormas: $scope.idGeneros,
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
