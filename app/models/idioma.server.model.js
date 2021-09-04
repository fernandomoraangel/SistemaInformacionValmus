var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

var IdiomasSchema = mongoose.Schema({
  idioma: String,
  creador:{
    type:Schema.ObjectId,
    ref:'User'
  },
  creado:{
    type:Date,
    default:Date.now
  },
});

IdiomasSchema.set("toJSON", {
  getters: true,
  virtuals: true,
});
mongoose.model("Idioma", IdiomasSchema);
