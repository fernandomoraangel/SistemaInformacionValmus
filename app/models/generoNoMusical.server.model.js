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

var vinculoRelacionado = new Schema({
  etiqueta: {},
  url: {},
});

var proyectoAsociado = new Schema({
  proyecto: {
    type: Schema.ObjectId,
    ref: "Proyecto",
  },
});

var sistemaAsociado = new Schema({
  sistema: {
    type: Schema.ObjectId,
    ref: "Sistema",
  },
});

var medioAsociado = new Schema({
  medio: {
    type: Schema.ObjectId,
    ref: "Medio",
  },
});

var anotacionCartograficoTemporal = new Schema({
  lugar: {},
  coordenadas: {
    type: [Number],
    index: "2dsphere",
  },
  evento: {},
  coberturaAmplitud: {},
  fechaInicio: {},
  fechaFin: {},
  evidencias: {},
});

var descriptorLibre = new Schema({
  etiqueta: {
    type: String,
    trim: true,
    require: true,
  },
  contenido: {
    type: String,
    require: true,
  },
});
var GeneroRelacionado = new Schema({
  generorelacionadoid: {
    type: Schema.ObjectId,
    ref: "Genero",
  },
});
var GeneroNoMusicalSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    unique: true,
    require: true,
  },
  alias: [GeneroRelacionado],
  padres: [GeneroRelacionado],
  hijos: [GeneroRelacionado],
  descripcion: {
    type: String,
  },
  anotacionCartograficoTemporal: [anotacionCartograficoTemporal],
  idioma: {
    type: String,
  },
  proyectosAsociados: [proyectoAsociado],
  descriptorLibre: [descriptorLibre],
  vinculoRelacionado: [vinculoRelacionado],
  creador: {
    type: Schema.ObjectId,
    ref: "User",
  },
  creado: {
    type: Date,
    default: Date.now,
  },
});

//Configura el 'UserSchema' para usar getters y virtuals cuando se transforme a JSON
GeneroNoMusicalSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});
mongoose.model("GeneroNoMusical", GeneroNoMusicalSchema);
