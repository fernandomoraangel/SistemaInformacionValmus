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
2. Ayuda para cada tabla.
3. Editar, listar, borrar para todas las páginas.
4. Revisar funcionamiento íconos "Crear", quitar los que sobren.
5. Eliminar carpetas "relaciones" "descriptores"
6. Cambiar el nombre de la carpeta example
7. Unificar botón "crear"
8. Difundir cambios en "mostrar ayuda" (a partir de Medio Sonoro)
9. Cambiar alerts de creación, actualización, borrado y error.
10. Resolver problemas con las fechas (input date) en Fondos y colecciones
11. Organizar listas.js. y eliminar listas redundantes.
12. Eliminar variables redundantes.
13. Identificar las vista "ver"
14. Resolver cómo sera el manual wiki.
15. Copiar Enlaces y archivos de recursos en las otras páginas.
16. Logo en la página central.
17. Acerca de con version.
18. Rojo en eliminar (campos array).
19. Editar campos array (botón editar, copia en formulario y borra).
20. Exportar colección "diccionarios".
21. Resolver problemas con acentos y ñ al importar. UTF8