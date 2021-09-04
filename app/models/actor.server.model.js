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

	var contenedorAsociado=new Schema({
 	id:{
 		type:Schema.ObjectId,
		ref:'Actor'
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
	evidencias:{

	}
	});


	var vinculoRelacionado=new Schema({
		etiqueta:{

		},
		url:{
		}
	});

	var descriptorLibre=new Schema({
		etiqueta:{
			type:String,
			trim:true,
			require:true
		},
		contenido:{
			type:String,
			require:true
		}
	});

	var ActorSchema=new Schema({
		nombres:{
		type:String,
		required:'El nombre no puede estar en blanco'
		},
		apellidos:{
			type:String,
			required:'El campo apellidos no puede estar en blanco'
		},
		nombreReunion:{
			type:String,
			default:''
		},
		contenedor:[contenedorAsociado],
		anotacionCartograficoTemporal:[anotacionCartograficoTemporal],
		descriptores:[descriptorLibre],
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
ActorSchema.virtual('fullName').get(function(){
	return this.nombres+' '+this.apellidos;
}).set(function(fullName){
	var splitName=fullName.split('');
	this.nombres=splitName[0]||'';
	this.apellidos=splitName[1]||'';
});
	//Configura el 'UserSchema' para usar getters y virtuals cuando se transforme a JSON
ActorSchema.set('toJSON', {
  getters: true,
  virtuals: true
});

	mongoose.model('Actor',ActorSchema);