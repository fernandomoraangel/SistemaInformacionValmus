# SIMR
El Sistema de información de músicas regionales (simr) es una aplicación CRUD elaborada para administrar el catálogo del grupo de investigación de Músicas Regionales de la Universidad de Antioquia, bajo la arquitectura MEAN stack.

## Instrucciones
1. Instalar Mongodb, Nodejs
2. Incluir el directorio de Mongodb en el path
3. Crear directorio para la base de datos en C:\data\db
4. npm install -g npm-check-updates
5. npm start

## Para reiniciar servidor automáticamente:
1. npm install nodemon -g
2. npm install -g sassSet-ExecutionPolicy Unrestricted
3. Iniciar con nodemon --inspect server.js 
4. Debug: Atack to node process

### Tutorial:
https://www.digitalocean.com/community/tutorials/workflow-nodemon-es

Usar ctrl+shift+v para visualizar Markdown

TODO: Funcionalidad nuevos campos en Obras

## Útiles

1. https://code.visualstudio.com/docs/nodejs/nodejs-debugging
2. https://es.wikipedia.org/wiki/Markdown
3. Usar npm version para manejar versionado automático npm version minor --force
   https://docs.npmjs.com/cli/v9/commands/npm-version?v=true
   
## GIT
https://rogerdudler.github.io/git-guide/index.es.html
1. cd C:\Users\ferna\Documents\Desarrollo\SIMR
2. git add .
3. git commit -m "Commit message"
4. git push origin main

## Pendiente

1. Organizar ayuda.
2. Editar, listar, borrar para todas las páginas.
3. Botón "crear"
4. Cambiar alerts de creación y error.
5. Organizar listas.js.
6. Identificar las vista "ver"
7. Resolver cómo sera el manual wiki.
8. Hacer que funcionen los enlaces en el campo enlaces. https://www.cursoangularjs.es/doku.php?id=unidades:04_masdirectivas:03_nghref
9. Logo en la página central.
10. Ícono
11. Acerca de con version.
12. Rojo en eliminar (campos array).
13. Editar campos array (botón editar, copia en formulario y borra).
14. Exportar colección "diccionarios".
15. Resolver problemas con acentos y ñ al importar. UTF8