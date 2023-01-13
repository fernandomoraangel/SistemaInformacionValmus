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
1. Difundir Ayuda al nivel de tabla.
2. Cambiar el nombre de la carpeta "example"
3.  Eliminar variables redundantes y funciones no utilizadas.
4.  Preparar y definir colaboradores parala Wiki del proyecto.
5.  Exportar colección "diccionarios".
6.  Resolver problemas con acentos y ñ al importar. UTF8
7.  Construir sistema de roles y permisos.
8.  Construir sistema de auditoría. Revisar el modelo de datos de la auditoría.
9.  Verificar existencia de URL en campo enlaces.
10. Subir archivos.
11. Versionado semántico.

## Bugs conocidos
1. Problemas con los borrados de vectores.