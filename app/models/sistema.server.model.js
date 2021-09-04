var mongoose=require('mongoose'),
	Schema=mongoose.Schema;

	//Auditoría (borrado o edición de algún campo o registro completo)
	var registroOperacion=new Schema({
		tipoDeOperacion:{
			type:String,
			//A partir de lista
		},
		registroBorrado:{
			type:Boolean,
			default:false
		},
		campo:{
			//Uno o varios
		},
		fecha:{
			type:Date,
			default:Date.now
		},
		usuario:{
			type:Schema.ObjectId,
			ref:'User'
		}

	});

	var anotacionCartograficoTemporal=new Schema({
		lugar:{

		},
		coordenadas:{
			type:[Number],
			index:'2dsphere'
		},
		evento:{

		},
		coberturaAmplitud:{

		},
		fechaInicio:{

		},
		fechaFin:{

		},
		//fente de los datos
		evidencias:{

		}
});
 var proyectoAsociado=new Schema({
 	proyecto:{
 		type:Schema.ObjectId,
		ref:'Proyecto'
 	}
 });

 var SistemaRelacionado=new Schema({
			id:{
				type:Schema.ObjectId,
				ref:'Materia'
			}
	});

var descriptorLibre=new Schema({
	etiqueta:{
		type:String,
		trim:true,
		required:'El campo es requerido'
	},
	contenido:{
		type:String,
		required:'El campo es requerido'
	}
});

	var vinculoRelacionado=new Schema({
		etiqueta:{

		},
		url:{
		}
	});

	var SistemaSchema=new Schema({
		nombre:{
			type:String,
			required:'El campo no puede estar en blanco'
		},
		descripcion:{
			type:String
		},
		alias:[SistemaRelacionado],
		padres:[SistemaRelacionado],
		hijos:[SistemaRelacionado],
		proyectosAsociados:[proyectoAsociado],
		anotacionCartograficoTemporal:[anotacionCartograficoTemporal],
		descriptorLibre:[descriptorLibre],
		vinculoRelacionado:[vinculoRelacionado],
		creador:{
			type:Schema.ObjectId,
			ref:'User'
		},
		creado:{
			type:Date,
			default:Date.now
		},
		registroOperacion:[registroOperacion]
	});

SistemaSchema.set('toJSON', {
  getters: true,
  virtuals: true
});
mongoose.model('Sistema',SistemaSchema);

