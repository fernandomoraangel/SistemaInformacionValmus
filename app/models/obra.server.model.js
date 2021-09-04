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

	var idiomas=new Schema({
		idioma:{
			type:String,
		}
		});

	var contenedorAsociado=new Schema({
 	id:{
 		type:Schema.ObjectId,
		ref:'Obra'
 	}
 	});

 	var actorAsociado=new Schema({
 	id:{
 		type:Schema.ObjectId,
		ref:'Actor'
 	},
 	rol:{
 		type:String
 	}
 	});

 	var materiaAsociada=new Schema({
 	id:{
 		type:Schema.ObjectId,
		ref:'Materia'
 	}
 	});

 	var vinculoRelacionado=new Schema({
		etiqueta:{

		},
		url:{
		}
	});
	
	var proyectoAsociado=new Schema({
 	id:{
 		type:Schema.ObjectId,
		ref:'Proyecto'
 	}
 	});

 	var sistemaAsociado=new Schema({
 	id:{
 		type:Schema.ObjectId,
		ref:'Sistema'
 	},
 	centro:{
 		type:String
 	}
 	});

 	var medioAsociado=new Schema({
 	id:{
 		type:Schema.ObjectId,
		ref:'Medio'
 	}
 	});

 	var generoFormaAsociado=new Schema({
 	id:{
 		type:Schema.ObjectId,
		ref:'Genero'
 	}
 	});

	 var generoFormaNoMusical=new Schema({
		id:{
			type:Schema.ObjectId,
		   ref:'GeneroNoMusical'
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

	var ObraSchema=new Schema({
		titulo:{
			type:String,
			trim:true,
			required:'El título no puede estar en blanco'
		},
		descripcion:{
			type:String,
			default:''
		},
		tipo:{
			type:String,
			default:''
		},
		contenedores:[contenedorAsociado],
		generosFormas:[generoFormaAsociado],
		GeneroFormaNoMusical:[generoFormaNoMusical],
		materias:[materiaAsociada],
		mediosSonoros:[medioAsociado],
		sistemasSonoros:[sistemaAsociado],
		idiomas:[idiomas],
		actores:[actorAsociado],
		anotacionCartograficoTemporal:[anotacionCartograficoTemporal],
		descriptores:[descriptorLibre],
		proyectos:[proyectoAsociado],
		vinculosRelacionados:[vinculoRelacionado],
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

ObraSchema.set('toJSON', {
  getters: true,
  virtuals: true
});
	mongoose.model('Obra',ObraSchema);

