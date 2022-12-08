"use scrict";

//Controller obras
angular.module("recursos").controller("RecursosController", [
  "$scope",
  "$routeParams",
  "$location",
  "Authentication",
  "Recursos",
  "Obras",
  "Actores",
  "Materias",
  "Proyectos",
  "Idiomas",
  "Diccionarios",
  function (
    $scope,
    $routeParams,
    $location,
    Authentication,
    Recursos,
    Obras,
    Actores,
    Materias,
    Proyectos,
    Idiomas,
    Diccionarios
  ) {
    //Exponer el servicio Authentication
    $scope.authentication = Authentication;
    $scope.items = ["Si", "No"];
    $scope.roles = ["Autor", "Editor", "Compilador", "Productor"];
    $scope.validarFecha = (fecha, id) => validarFecha(fecha, id);
    $scope.tipos=tipos;
    $scope.idiomas = Idiomas.query();
    $scope.eventos = ["Composición", "Estreno", "Primera grabación"];
    $scope.lugares = ["Andes", "Pacífico", "Atlántico", "Llanos"];
    $scope.coberturas = ["Local", "País", "Mundial"];
    $scope.proyectos = ["Andes", "Emisoras", "Industria discográfica"];
    $scope.nNormalizados = nNormalizados;
    $scope.dEtiquetas = [
      "Interés pedagógico",
      "Obra representativa",
      "Relación con línea de investigación",
    ];
    $scope.tipoFuente =tipoFuente
    $scope.criterio = criterio
    $scope.idMenciones = [];
    $scope.idAnotacionesCartograficoTemporales = [];
    $scope.idProyectos = [];
    $scope.idNormalizados = [];
    $scope.diccionarios = Diccionarios.query();
    $scope.idContenedores = [];
    $scope.idDescriptores = [];
    $scope.idSistemasSonoros = [];
    $scope.idIdiomas = [];
    $scope.idMaterias = [];
    $scope.idTipos = [];
    $scope.idEnlaces = [];
    $scope.idMediosSonoros = [];
    $scope.idObrasRelacionadas = [];
    $scope.idFuentes = [];
    $scope.idDTecnicas = [];
    $scope.actores = Actores.query();
    $scope.recursos = Recursos.query();
    $scope.proyectos = Proyectos.query();
    $scope.obras = Obras.query();
    $scope.materias = Materias.query();
    $scope.errorclass = "form-control";
    $scope.reverse = false;
//Carga vectores

$scope.cargaObrasRelacionadas = function (d) {
  for (var i in d) {
    delete d[i]._id;
  }
  $scope.idObrasRelacionadas = [].concat(d);
};

$scope.cargaNNormalizados = function (d) {
  for (var i in d) {
    delete d[i]._id;
  }
  $scope.idNormalizados = [].concat(d);
};

$scope.cargaMResponsabilidad = function (d) {
  for (var i in d) {
    delete d[i]._id;
  }
  $scope.idMenciones = [].concat(d);
};

$scope.cargaAnotacionesCartograficoTemporales = function (d) {
  console.log(d);
  for (var i in d) {
    delete d[i]._id;
  }
  $scope.idAnotacionesCartograficoTemporales = [].concat(d);
};

$scope.cargaContenedores = function (d) {
  console.log(d);
  for (var i in d) {
    delete d[i]._id;
  }
  $scope.idContenedores = [].concat(d);
};

$scope.cargaFuentes = function (d) {
  console.log(d);
  for (var i in d) {
    delete d[i]._id;
  }
  $scope.idFuentes = [].concat(d); 
};


    // Funciones auxiliares
    $scope.validarFecha = (fecha, id) => validarFecha(fecha, id);
    $scope.formatDate = (date, precision = "AMD") =>
      formatDate(date, precision);
    $scope.nombrarSi = (nombre, x) => nombrarSi(nombre, x);
    $scope.sortBy = function (propertyName) {
      $scope.reverse = !$scope.reverse;
    };

    $scope.validarFecha = (fecha, id) => validarFecha(fecha, id);
    $scope.formatDate = (date, precision = "AMD") =>
      formatDate(date, precision);
    $scope.nombrarSi = (nombre, x) => nombrarSi(nombre, x);
    //Función para calcular la precisión de una fecha
    precisionFecha = function (fecha) {
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
      fechayPrecision.fecha = ano + "/" + mes + "/" + dia;
      fechayPrecision.precision = precision;
      return fechayPrecision;
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

    $scope.abrirVentana = function (url) {
      window.open(url);
    };

    //Actualizar para editar
    $scope.actualizarTodo = function () {
      $scope.idContenedores = this.recurso.contenedores;
      $scope.idObrasRelacionadas = this.recurso.obrasRelacionadas;
      $scope.idNormalizados = this.recurso.numeroNormalizado;
      $scope.idMenciones = this.recurso.mencionResponsabilidad;
      $scope.idFuentes = this.recurso.fuente;
      $scope.idTipos = this.recurso.tiposDeRecurso;
      $scope.idMaterias = this.recurso.materia;
      $scope.idDTecnicas = this.recurso.descripcionTecnica;
      $scope.idIdiomas = this.recurso.idiomas;
      $scope.idActores = this.recurso.actores;
      $scope.idAnotacionesCartograficoTemporales =
        this.recurso.anotacionCartograficoTemporal;
      $scope.idDescriptores = this.recurso.descriptorLibre;
      $scope.idProyectos = this.recurso.proyectos;
      $scope.idEnlaces = this.recurso.vinculoRelacionado;
    };

    //Ver
    $scope.verActores = function (x) {
      y = "";
      for (var i in x) {
        y = y + $scope.actorAux(x[i].actor) + " (" + x[i].tipoDeMencion + ")";
        //Poner coma al final
        if (i != x.length - 1) {
          y = y + "; ";
        }
      }
      return $scope.darFormato(y);
    };
    
    $scope.verFuente = function (x) {
      y = "";
      for (var i in x) {
        y =
          y +
          "Tipo de fuente:"+
          x[i].tipoFuente+
          ",Lugar: " +
          x[i].lugar +
          ", nombre:" +
          x[i].nombre +
          ", Fecha:" +
          $scope.formatDate(x[i].fecha, x[i].precision);
        //Poner coma al final
        if (i != x.length - 1) {
          y = y + "; ";
        }
      }
      return $scope.darFormato(y);
    };

    $scope.verTipos = function (x) {
      y = "";

      for (var i in x) {
        y = y + x[i].id;
        //Poner coma al final
        if (i != x.length - 1) {
          y = y + "; ";
        }
      }
      return $scope.darFormato(y);
    };

    $scope.verNNormalizado = function (x) {
      y = "";

      for (var i in x) {
        y = y + x[i].nombre + ": " + x[i].numero;
        //Poner coma al final
        if (i != x.length - 1) {
          y = y + "; ";
        }
      }
      return $scope.darFormato(y);
    };

    $scope.verDTecnica = function (x) {
      y = "";

      for (var i in x) {
        y = y + x[i].criterio + ": " + x[i].valor;
        //Poner coma al final
        if (i != x.length - 1) {
          y = y + "; ";
        }
      }
      return $scope.darFormato(y);
    };

    $scope.verObras = function (x) {
      y = "";
      for (var i in x) {
        y = y + $scope.obraAux(x[i].id);
        //Poner coma al final
        if (i != x.length - 1) {
          y = y + "; ";
        }
      }
      return $scope.darFormato(y);
    };

    $scope.verContenedores = function (x) {
      y = "";
      for (var i in x) {
        y = y + $scope.contenedorAux(x[i].id);
        //Poner coma al final
        if (i != x.length - 1) {
          y = y + "; ";
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
//TODO: Difundir formato puntuación
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
          x[i].evidencia + ". "
        //Poner coma al final
        if (i != x.length - 1) {
          //y = y + ", ";
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

    $scope.verProyecto = function (x) {
      y = "";
      for (var i in x) {
        y = y + $scope.proyectoAux(x[i].id);
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

    $scope.obraAux = function (aux) {
      for (var i in $scope.obras) {
        if ($scope.obras[i].id === aux) {
          return $scope.obras[i].titulo;
        }
      }
    };

    $scope.contenedorAux = function (aux) {
      for (var i in $scope.obras) {
        if ($scope.recursos[i].id === aux) {
          return $scope.recursos[i].titulo;
        }
      }
    };

    $scope.autorAux = function (aux) {
      for (var i in $scope.actores) {
        if ($scope.actores[i]._id === aux) {
          return $scope.actores[i].fullName;
        }
      }
    };

    $scope.updateActores = function () {
      $scope.actores = Actores.query();
    };
    //Menciones de responsabilidad

    $scope.actorAux = function (aux) {
      for (var i in $scope.actores) {
        if ($scope.actores[i].id === aux) {
          return $scope.actores[i].fullName;
        }
      }
    };
    $scope.actorAdd = function () {
      existe = false;
      x = "actor:" + this.idActor + ",tipoDeMencion:" + this.rol;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (
        this.idActor === undefined ||
        this.idActor === "" ||
        this.rol === undefined ||
        this.rol === ""
      ) {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar un actor y un tipo de mención",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idMenciones.indexOf(x) === -1) {
          for (var i in $scope.idMenciones) {
            if (
              $scope.idMenciones[i].actor === this.idActor &&
              $scope.idMenciones[i].tipoDeMencion === this.rol
            ) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "El actor y tipo de mención se encuentran ya en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              this.idActor = "";
              this.rol = "";
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idMenciones.push(obj);
          this.idActor = "";
          this.rol = "";
        }
      }
    };

    $scope.actorRemove = function (x) {
      for (var i in $scope.idMenciones) {
        if ($scope.idMenciones[i].actor === x) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text:
              "Va a eliminar  " +
              $scope.actorAux(x) +
              ", " +
              $scope.idMenciones[i].tipoDeMencion,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              $scope.idMenciones.splice(i, 1);
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
    //nnormalizados
    $scope.nnormalizadoAdd = function () {
      existe = false;
      var x =
        "nombre:" +
        this.nNormalizadoNombre +
        ",numero:" +
        this.nNormalizadoNumero;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (
        this.nNormalizadoNombre === undefined ||
        this.nNormalizadoNombre === "" ||
        this.nNormalizadoNumero === undefined ||
        this.nNormalizadoNumero === ""
      ) {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe ingresar todos los datos",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idNormalizados.indexOf(x) === -1) {
          for (var i in $scope.idNormalizados) {
            if (
              $scope.idNormalizados[i].nombre === this.nNormalizadoNombre ||
              $scope.idNormalizados[i].numero === this.nNormalizadoNumero
            ) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "El número normalizado ya se encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              this.nNormalizadoNombre = "";
              this.nNormalizadoNumero = "";
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idNormalizados.push(obj);
          this.nNormalizadoNombre = "";
          this.nNormalizadoNumero = "";
        }
      }
    };

    $scope.nnormalizadoRemove = function (x) {
      for (var i in $scope.idNormalizados) {
        if ($scope.idNormalizados[i].nombre === x) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text:
              "Va a eliminar  " +
              $scope.idNormalizados[i].nombre +
              ": " +
              $scope.idNormalizados[i].numero,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              $scope.idNormalizados.splice(i, 1);
              // funcion propia de Angular.Js refresca mi scope y recarga mis datos
              $scope.$apply();
              Swal.fire(
                "Eliminado!",
                "El número normalizado ha sido eliminado.",
                "success"
              );
            }
          });
        }
      }
    };

    //Recursos
    $scope.updateRecursos = function () {
      $scope.recursos = Recursos.query();
    };

    $scope.recursoAux = function (aux) {
      for (var i in $scope.recursos) {
        if ($scope.recursos[i].id === aux) {
          return $scope.recursos[i].titulo;
        }
      }
    };

    $scope.recursoAdd = function (x) {
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
          text: "Debe seleccionar un recurso",
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
                text: "EL recurso ya se encuentra en la lista",
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

    $scope.recursoRemove = function (x) {
      for (var i in $scope.idContenedores) {
        if ($scope.idContenedores[i].id === x) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text: "Va a eliminar  " + $scope.recursoAux(x),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              $scope.idContenedores.splice(i, 1);
              // funcion propia de Angular.Js refresca mi scope y recarga mis datos
              $scope.$apply();
              Swal.fire(
                "Eliminado!",
                "El recurso contenido ha sido eliminado.",
                "success"
              );
            }
          });
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
              this.materia = "";
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
        if ($scope.idMaterias[i].id === x) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text: "Va a eliminar  " + $scope.materiaAux(x),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              $scope.idMaterias.splice(i, 1);
              // funcion propia de Angular.Js refresca mi scope y recarga mis datos
              $scope.$apply();
              Swal.fire(
                "Eliminado!",
                "La materia ha sido eliminada.",
                "success"
              );
            }
          });
        }
      }
    };

    //Descripción técnica
    $scope.dTecnicaAdd = function () {
      existe = false;
      var x =
        "criterio:" + this.criterioDTecnica + ",valor:" + this.valordTecnica;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (
        this.criterioDTecnica === undefined ||
        this.criterioDTecnica === "" ||
        this.valordTecnica === undefined ||
        this.valordTecnica === ""
      ) {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe ingresar todos los campos",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idDTecnicas.indexOf(x) === -1) {
          for (var i in $scope.idDTecnicas) {
            if (
              $scope.idDTecnicas[i].criterio === this.criterioDTecnica &&
              $scope.idDTecnicas[i].valor === this.valordTecnica
            ) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "El idioma ya se encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              this.criterioDTecnica = "";
              this.valordTecnica = "";
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idDTecnicas.push(obj);
          this.criterioDTecnica = "";
          this.valordTecnica = "";
        }
      }
    };

    $scope.dTecnicaRemove = function (x) {
      for (var i in $scope.idDTecnicas) {
        if ($scope.idDTecnicas[i].criterio === x) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text:
              "Va a eliminar  " +
              $scope.idDTecnicas[i].criterio +
              "," +
              $scope.idDTecnicas[i].valor,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              $scope.idDTecnicas.splice(i, 1);
              // funcion propia de Angular.Js refresca mi scope y recarga mis datos
              $scope.$apply();
              Swal.fire(
                "Eliminado!",
                "La descripción técnica ha sido eliminada.",
                "success"
              );
            }
          });
          this.criterioDTecnica = "";
          this.valordTecnica = "";
        }
      }
    };
    //Obra relacionada

    $scope.obraRelacionadaAdd = function () {
      existe = false;
      x = "id:" + this.obraRelacionada;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (this.obraRelacionada === undefined || this.obraRelacionada === "") {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar una obra",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idObrasRelacionadas.indexOf(x) === -1) {
          for (var i in $scope.idObrasRelacionadas) {
            if ($scope.idObrasRelacionadas[i].id === this.obraRelacionada) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "La obra ya se encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              this.obraRelacionada = "";
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idObrasRelacionadas.push(obj);
          this.obraRelacionada = "";
        }
      }
    };

    $scope.obraRelacionadaRemove = function (x) {
      for (var i in $scope.idObrasRelacionadas) {
        if ($scope.idObrasRelacionadas[i].id === x) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text: "Va a eliminar  " + $scope.obraAux(x),
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              $scope.idObrasRelacionadas.splice(i, 1);
              // funcion propia de Angular.Js refresca mi scope y recarga mis datos
              $scope.$apply();
              Swal.fire("Eliminado!", "La obra ha sido eliminada.", "success");
            }
          });
        }
      }
    };

    //Tipo
    $scope.tipoAdd = function () {
      existe = false;
      x = "id:" + this.tipodeRecurso;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      if (this.tipodeRecurso === undefined || this.tipodeRecurso === "") {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe seleccionar tipo de recurso",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idTipos.indexOf(x) === -1) {
          for (var i in $scope.idTipos) {
            if ($scope.idTipos[i].id === this.tipodeRecurso) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "El tipo de recurso ya se encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              this.tipodeRecurso = "";
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idTipos.push(obj);
          this.tipodeRecurso = "";
        }
      }
    };

    $scope.tipoRemove = function (x) {
      for (var i in $scope.idTipos) {
        if ($scope.idTipos[i] === x) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text: "Va a eliminar  " + $scope.idTipos[i].id,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              $scope.idTipos.splice(i, 1);
              // funcion propia de Angular.Js refresca mi scope y recarga mis datos
              $scope.$apply();
              Swal.fire(
                "Eliminado!",
                "El tipo de recurso ha sido eliminado.",
                "success"
              );
            }
          });
        }
      }
    };

    //Fuente
    $scope.fuenteAdd = function () {
      existe = false;
      //Fecha y precisión
      var precisionyFecha = precisionFecha(this.fechaDeFuente);
      this.fechaDeFuente = precisionyFecha.fecha;
      precision = precisionyFecha.precision;
      var x =
        "tipoFuente:" +
        this.tipoDeFuente +
        ",lugar:" +
        this.lugarDeFuente +
        ",nombre:" +
        this.nombreDeFuente +
        ",fecha:" +
        precisionyFecha.fecha +
        ",precision:" +
        precisionyFecha.precision;
      var properties = x.split(",");
      var obj = {};
      properties.forEach(function (property) {
        var tup = property.split(":");
        obj[tup[0]] = tup[1];
      });
      //TODO: Revisar este condicional
      if (
        this.tipoDeFuente === undefined ||
        this.tipoDeFuente === "" ||
        this.lugarDeFuente === undefined ||
        this.lugarDeFuente === "" ||
        this.nombreDeFuente === undefined ||
        this.nombreDeFuente === "" ||
        this.fechaDeFuente === undefined ||
        this.fechaDeFuente === ""
      ) {
        //Mostrar mensaje de error
        Swal.fire({
          title: "¡Error!",
          text: "Debe ingresar, por lo menos el tipo de fuente y un dato adicional",
          icon: "error",
          confirmButtonText: "Cerrar",
        });
      } else {
        if ($scope.idFuentes.indexOf(x) === -1) {
          for (var i in $scope.idFuentes) {
            if (
              ($scope.idFuentes[i].tipoFuente === this.tipoDeFuente &&
                $scope.idFuentes[i].lugar === this.lugarDeFuente) ||
              $scope.idFuentes[i].nombre === this.nombreDeFuente ||
              $scope.idFuentes[i].fecha === this.fechaDeFuente
            ) {
              //Mensaje de error
              Swal.fire({
                title: "¡Error!",
                text: "La fuente ya se encuentra en la lista",
                icon: "error",
                confirmButtonText: "Cerrar",
              });
              existe = true;
              this.tipoDeFuente = "";
              this.lugarDeFuente = "";
              this.nombreDeFuente = "";
              this.fechaDeFuente = "";
              return;
            }
          }
        }
        if (existe === false) {
          $scope.idFuentes.push(obj);
          this.tipoDeFuente = "";
          this.lugarDeFuente = "";
          this.nombreDeFuente = "";
          this.fechaDeFuente = "";
        }
      }
    };

    $scope.fuenteRemove = function (x) {
      for (var i in $scope.idFuentes) {
        if ($scope.idFuentes[i].tipoFuente === x) {
          Swal.fire({
            title: "¡Advertencia de eliminación!",
            text:
              "Va a eliminar  a " +
              $scope.idFuentes[i].tipoFuente +
              ", " +
              $scope.idFuentes[i].lugar +
              ", " +
              $scope.idFuentes[i].nombre +
              ", " +
              $scope.idFuentes[i].fecha,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirmar",
            cancelButtonText: "Cancelar",
          }).then((result) => {
            if (result.isConfirmed) {
              $scope.idFuentes.splice(i, 1);
              // funcion propia de Angular.Js refresca mi scope y recarga mis datos
              $scope.$apply();
              Swal.fire(
                "Eliminado!",
                "La fuente ha sido eliminada.",
                "success"
              );
            }
          });
        }
      }
    };

    //Medio Sonoro
    $scope.medioSonoroAdd = function () {
      $scope.idMediosSonoros.push(this.medioSonoro);
    };
    $scope.medioSonoroRemove = function (x) {
      for (var i in $scope.idMediosSonoros) {
        if ($scope.idMediosSonoros[i] === x) {
          alert("va a eliminar a " + $scope.idMediosSonoros[i]);
          $scope.idMediosSonoros.splice(i, 1);
        }
      }
    };

    //Sistema Sonoro
    $scope.sistemaSonoroAdd = function () {
      $scope.idSistemasSonoros.push(this.sistemaSonoro);
      $scope.sistemaSonoroRemove = function (x) {
        for (var i in $scope.idSistemasSonoros) {
          if ($scope.idSistemasSonoros[i] === x) {
            alert("va a eliminar a " + $scope.idSistemasSonoros[i]);
            $scope.idSistemasSonoros.splice(i, 1);
          }
        }
      };
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

    //Proyectos

    $scope.proyectoAux = function (aux) {
      //var tmp=JSON.parse($scope.obrasAux);
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

      if (this.proyecto === undefined || this.proyecto === "") {
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
            if ($scope.idProyectos[i].id === this.proyecto) {
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
            text: "Va a eliminar  " + $scope.proyectoAux(x),
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

    //Crear método controller para crear nuevos registros
    $scope.create = function () {
      var validar = false;
      //Usar los campos form para crear un nuevo objeto $resource obra
      var recurso = new Recursos({
        titulo: this.titulo,
        obrasRelacionadas: $scope.idObrasRelacionadas,
        numeroNormalizado: $scope.idNormalizados,
        faceta: this.faceta,
        mencionResponsabilidad: $scope.idMenciones,
        descripcion: this.descripcion,
        contenedores: $scope.idContenedores,
        fuente: $scope.idFuentes,
        tiposDeRecurso: $scope.idTipos,
        anotacionCartograficoTemporal:
          $scope.idAnotacionesCartograficoTemporales,
        materia: $scope.idMaterias,
        idiomas: $scope.idIdiomas,
        descripcionTecnica: $scope.idDTecnicas,
        materialAcompanante: this.materialAcompanante,
        mencionDeSerie: this.mencionDeSerie,
        proyectos: $scope.idProyectos,
        vinculoRelacionado: $scope.idEnlaces,
        descriptorLibre: $scope.idDescriptores,
      });

      if (this.titulo == undefined) {
        $scope.errorclass = "form-controlError";
        alert("Campos pendientes");
      } else {
        validar = true;
      }
      //Usar el método '$save' de obra para enviar una petición POST apropiada
      recurso.$save(
        function (response) {
          //Si la obra fue creada de la manera correcta, redireccionar a la página de la
          Swal.fire({
            title: "¡Registro correcto!",
            text: "El registro se ha creado correctamente",
            icon: "success",
            confirmButtonText: "Cerrar",
          });
          $location.path("recursos/" + response._id);
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
    //Método controller para recuperar la lista de recursos
    $scope.find = function () {
      //Usar el método 'querry' de recurso, para enviar una petición GET apropiada
      $scope.recursos = Recursos.query();
    };

    //Método controller para recuperar una única recurso
    $scope.findOne = function () {
      //Usa el método 'get' de recurso para enviar una petición GET apropiada
      $scope.recurso = Recursos.get({
        recursoId: $routeParams.recursoId,
      });
    };

    //Método controller para actualizar una única obra
    $scope.update = function () {
      //Agregar vectores para que se actualicen, el  es porque si no se hace click en la carga, el vector queda vacío
      if ($scope.idObrasRelacionadas.length != 0) {
        $scope.recurso.obrasRelacionadas = $scope.idObrasRelacionadas;
      }

      if ($scope.idNormalizados.length != 0) {
        $scope.recurso.numeroNormalizado = $scope.idNormalizados;
      }

      if ($scope.idMenciones.length != 0) {
        $scope.recurso.mencionResponsabilidad = $scope.idMenciones;
      }

      if ($scope.idAnotacionesCartograficoTemporales.length != 0) {
        $scope.recurso.anotacionCartograficoTemporal =
          $scope.idAnotacionesCartograficoTemporales;
      }

      if ($scope.idContenedores.length != 0) {
        $scope.recurso.contenedores = $scope.idContenedores;
      }

      if ($scope.idFuentes.length != 0) {
        $scope.recurso.fuente = $scope.idFuentes;
      }
      //Usa el método $update de recurso para enviar la petición PUT adecuada
      $scope.recurso.$update(
        function () {
          //Si la actualización es correcta, redireccionar
          $location.path("recursos/" + $scope.recurso._id);
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
