var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

//Auditoría (borrado o edición de algún campo o registro completo)
var registroOperacion = new Schema({
  tipoDeOperacion: {
    type: String,
    //A partir de lista
  },
  registroBorrado: {
    type: Boolean,
    default: false,
  },
  campo: {
    //Uno o varios
  },
  fecha: {
    type: Date,
    default: Date.now,
  },
  usuario: {
    type: Schema.ObjectId,
    ref: "User",
  },
});

var FondoSchema = new Schema({
  nombre: {
    type: String,
    required: "El campo es requerido",
  },
  tipo: {
    type: String,
    default: "",
  },
  propiedadComodato: {
    type: String,
    default: "",
  },
  fechaDeCreacion: {
    type: Date,
    default: "",
  },
  //Precisión de la fecha de creacion
  precision: {
    type: String,
    //Año Mes Día Hora
  },
  creador: {
    type: Schema.ObjectId,
    ref: "User",
  },
  creado: {
    type: Date,
    default: Date.now,
  },
  registroOperacion: [registroOperacion],
});

FondoSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});
mongoose.model("Fondo", FondoSchema);
