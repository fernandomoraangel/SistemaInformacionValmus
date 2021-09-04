'use strict';

//Cargar dependencias
var mongoose=require('mongoose'),
	ActorObra=mongoose.model('ActorObra');

//Método para el manejo de errores
	var getErrorMessage=function(err){
	if(err.errors){
		for(var errName in err.errors){
			if (err.errors[errName].message) return err.errors[errName].message;
		}
	}else{
		return 'Error desconocido del servidor';
	}
};

//Método para crear los actor-obra
exports.create=function(req,res){
	var actorObra = new ActorObra(req.body);
	//Configurar la propiedad 'creador'
	actorObra.creador=req.user;
	//Intentar salvar el actor
	actorObra.save(function(err){
		if(err){
			//Si ocurre algún error enviar el mensaje
			return res.status(400).send({
				message: getErrorMessage(err)
			});
		}else{
			//Enviar una representación JSON del actor
			res.json(actorObra);
		}
	});
};

// Método que recupera una lista de actores-obras
exports.list=function(req,res){
	//Usa el método model 'find' para obtener una lista de actores
	ActorObra.find().sort('-created').populate('creador', 'firstName lastName fullName').populate('obra').populate('actor','nombrePila apellidos fullname').exec(function(err, actorObra){
		if(err){
			return res.status(400).send({

				message: getErrorMessage(err)
			});
			}else{
				res.json(actorObra);
			}
		});
};

//Método que devuelve un actor existente
exports.read=function(req,res){
	res.json(req.actorObra);
};

//Método para actualizar un actor existente
exports.update=function(req,res){
	//Obtiene el actor usando el objeto 'request'
	var actorObra=req.actorObra;
	//Actualiza los campos
	actorObra.actor=req.boby.actor;
	actorObra.obra=req.boby.obra;
	actorObra.roll=req.boby.roll;
	
	//Intenta salvar
	actorObra.save(function(err){
		if (err){
		return res.status(400).send({
			message: getErrorMessage(err)
		});
	}else{
		res.json(actorObra);
		}
	});
	};
	//Método para borrar
	exports.delete=function(req,res){
		//Obtener el actor usando el objeto 'request'
		var actorObra=req.actorObra;
		//Usar el método model 'remove' para borrar
		actorObra.remove(function(err){
			if(err){
				return res.status(400).send({
					message: getErrorMessage(err)
				});
			}else{
				res.json(actorObra);
			}
		});
	};
	//Controller middleware para recuperar un actor existente
	exports.actorObraByID=function(req,res,next,id){
		ActorObra.findById(id).populate('creador obra actor', 'firstName lastName fullName').populate('obra').populate('actor').exec(function(err,actorObra){
			if (err) return next(err);
			if(!actorObra) return next(new Error('Fallo al cargar el actor'+ id));
			//Si el actor es encontrado, usar el objeto 'request' para pasarla al sgte middleware
			req.actorObra=actorObra;
			//Llamar al sgte middleware
			next();
		});
	};

	//Controller middleware para autorizar una operación sobre un actorObra
	exports.hasAuthorization=function(req,res,next){
		//Si el usuario actual, no es el creador, enviar el mensaje de error
		if(req.actorObra.creador.id !== req.user.id){
			return res.status(403).send({
				message:'Usuario no autorizado'
			});
		}
		//Llamar sgte middleware
		next();
	};