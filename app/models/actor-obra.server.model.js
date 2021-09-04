var mongoose=require('mongoose'),
	Schema=mongoose.Schema;

	var ActorObraSchema=new Schema({
		obra:{
		type:Schema.ObjectId,
		ref:'Obra'
		},

		actor:{
		type:Schema.ObjectId,
		ref:'Actor'
		},
		
		roll:{
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
ActorObraSchema.set('toJSON', {
  getters: true,
  virtuals: true
});
	mongoose.model('ActorObra',ActorObraSchema);