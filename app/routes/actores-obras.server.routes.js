'use strict';

//Cargar dependencias

var users=require('../../app/controllers/users.server.controller'),
	actoresObras=require('../../app/controllers/actores-obras.server.controller');

//Definir el método routes del módulo
module.exports=function(app){
	//Configurar ruta base a 'actores'
	app.route('/api/actoresObras')
	.get(actoresObras.list)
	.post(users.requiresLogin,actoresObras.create);

	//Configurar las rutas a 'actores' parametrizadas
	app.route('/api/actoresObras/:actorObraId')
	.get(actoresObras.read)
	.put(users.requiresLogin,actoresObras.hasAuthorization,actoresObras.update)
	.delete(users.requiresLogin,actoresObras.hasAuthorization,actoresObras.delete);

	//Configurar el parámetro middleware obraId
	app.param('actorObraId',actoresObras.actorObraByID);
};