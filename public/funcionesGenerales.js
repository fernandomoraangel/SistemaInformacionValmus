validarFecha = function (fecha, id) {
  const regex = /^(\d{4}|0)\/([0-9][0-9]|0)\/([0-9][0-9]|0)/;
  if (regex.test(fecha)) {
    document.getElementById(id).style = "color:black";
  } else {
    Swal.fire({
      title: "Formato de fecha incorrecto",
      text: "El formato correcto es YYYY/MM/DD, si desea no incluir alguno de estos datos, reemplacelo con 0, ej. 2012/20/0",
      icon: "error",
      confirmButtonText: "ok",
    });
    document.getElementById(id).style = "color:red";
  }
};

//Validar número
esEnteroPositivo=function(n,id){
const regex =/^[0-9]+$/;
  if (regex.test(n)) {
    document.getElementById(id).style = "color:black";
  } else {
    Swal.fire({
      title: "Entrada incorrecta",
      text: "La cantidad debe ser un entero positivo",
      icon: "error",
      confirmButtonText: "ok",
    });
    document.getElementById(id).style = "color:red";
  }
}
//Función para calcular la precisión de una fecha

precisionFecha = function (fecha = "") {
  if (fecha == "") {
    return "";
  }
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


//Función para mostrar las fechas con una precisión dada
formatDate = function (date, precision = "AMD") {
    const fechaActual = new Date(date);
    //var opciones = {month: 'long', day: 'numeric' };
    var opciones = new Object();

    if (precision.indexOf("A") != -1) {
      opciones["year"] = "numeric";
    }

    if (precision.indexOf("M") != -1) {
      opciones["month"] = "long";
    }

    if (precision.indexOf("D") != -1) {
      opciones["day"] = "numeric";
    }
    return fechaActual.toLocaleDateString("es-MX", opciones);
  };

nombrarSi = function (nombre, x) {
    if (x === "undefined" || x === "" || x === undefined) {
      return;
    } else {
      if (nombre != "") {
        return " " + nombre + ": " + x;
      } else {
        return " " + x;
      }
    }
  };

  