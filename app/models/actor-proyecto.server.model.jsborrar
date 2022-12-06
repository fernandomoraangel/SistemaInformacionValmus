var mongoose=require('mongoose'),
	Schema=mongoose.Schema;

	var ActorProyectoSchema=new Schema({
		proyecto:{
		type:Schema.ObjectId,
		ref:'Proyecto'
		},

		actor:{
		type:Schema.ObjectId,
		ref:'Actor'
		},
		
		rol:{
		type:String,
		default:'',
		trim:true,
		required:'El rol no puede estar en blanco'
		},
		
		creador:{
			type:Schema.ObjectId,
			ref:'User'
		},
		creado:{
			type:Date,
			default:Date.now
		}
	});

	//Configura el 'UserSchema' para usar getters y virtuals cuando se transforme a JSON
ActorProyectoSchema.set('toJSON', {
  getters: true,
  virtuals: true
});
	mongoose.model('ActorObra',ActorObraSchema);