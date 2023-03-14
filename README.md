<div align="center">
  <img alt="Logo" src="https://raw.githubusercontent.com/felipevogtf/Portfolio/main/public/favicon.svg" width="100" />
</div>
<h1 align="center">
  Felipe Vogt - Github Portfolio
</h1>

<div align="center">
Mi portafolio personal realizado en Vue.js, cargando mis proyectos en Github mediante GitHub GraphQL API.
</div>
</br>

<a href="https://felipevogtf.github.io/Github-Portfolio/" rel="noopener noreferrer" target="_blank">![demo](https://raw.githubusercontent.com/felipevogtf/Github-Portfolio/master/public/demo.jpg)</a>

## Instalación

### Install dependencies

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Configuración

### Variables de entorno
El proyecto está configurado para el funcionamiento con `Vite`, para ello existen dos archivos de variables de entorno:
`.env` que se usa en el despliegue local y `.env.production` para el despliegue a producción.

Ambos contienen la siguiente variable que se debe modificar para cada caso:
```
# .env
VITE_URL=/
VITE_GITHUB_TOKEN=""

# .env.production
VITE_URL=/Portfolio/
VITE_GITHUB_TOKEN=""
```
*En este caso `/Portfolio/` es el directorio donde se encuentra hosteado el proyecto en GitHub Pages*

#### Configurando GitHub GraphQL API
Para el correcto funcionamiento de la API de GitHub es necesario autenticarse, para ello es necesario crea un token de acceso con los permisos necesarios para que la API pueda acceder a los repositorios.

Para crear el token hay que dirigirse hacia:
```
settings/Developer settings/tokens (Classic)
``` 
 Y crear un token de acceso con los siguientes permisos 
 ```
 * public_repo
 * read:user
 ``` 

Luego, copiar el token y agregarlo en el archivo `.env y .env.production` codificado en base64. 
*( El tiempo de duración del token queda a criterio del usuario )*
```
# .env
VITE_URL=/
VITE_GITHUB_TOKEN="MTIzXzEyMzQ1Njc4OTAxMjM0NTY3ODkwMTIzNDU2Nzg5MC09MTIzNDU="
```
La configuración de **Apollo Client** se encuentra en el archivo: 
```
src\apolloProvider.ts
```

#### Usando GitHub GraphQL API

La sección de **Proyectos destacados** en el portfolio, corresponden a tus repositorios "pinneados" en tu perfil, donde se obtienen los 2 primeros".

La sección de **Otros proyectos** del portfolio, corresponden a todos tus repositorios de GitHub sin contar los que se encuentren en **Proyectos destacados**.

Las **cards** de cada repositorio cargan los primeros **4 Topics**, la **descripción**, el **nombre**, la **url del repositorio** y la **url del website** de tus repositorios.

Si deseas cambiar la información obtenida y algunas variables, las **queries** se encuentran en: 
```
src\queries\github.query.ts
```
Y su implementación en el archivo: 
```
src\views\HomeView.vue
```
### Información de la pagina

La información del portfolio se carga a partir del archivo `public\data\data.json` , lo que permite que una vez compilada la aplicación puedas cambiar la información de la página sin tener que volver a compilar. 
Por ejemplo, si quieres cambiar el título de la página o alguno de los textos de la página de inicio, basta con modificar algunos de los siguientes atributos.
```
{
"titulo_pagina": "Felipe Vogt",
"navbar": {...},
"inicio": {
	"id": "home",
	"titulo": "Felipe Vogt",
	"subtitulo": "Desarrollador Full-Stack",
	"descripcion": "Soy un ingeniero...",
	"background": "./imgs/background.png"
}
```
### Imágenes

Las imágenes deben almacenarse en la carpeta `public` para que se copien en el directorio raíz del proyecto compilado (ejem, dist o docs), luego en el archivo `data.json` deben ingresarse de la siguiente forma:
```
"background": "./carpeta/imagen.png"
```

Ejemplo, tenemos el archivo `imagen.png` para el logo del navbar, que se almacena en el directorio `public/imgs`. Al compilar, el archivo se copia y almacena en el directorio `dist/imgs/imagen.png`
```
| portfolio
| - public
| - - imgs
| - - - imagen.png
| - dist
| - - imgs
| - - - imagen.png
``` 
Modificamos el atributo correspondiente en el archivo `data.json`, quedando de esta forma
```
"navbar": {
	"logo": "./imgs/imagen.png".
	...
}
```

### Estilos

Las plantillas de estilos globales se encuentran en el directorio `src/assets/styles`, donde se encuentran los archivos:

```
variables.css 	=> Variables globales para los colores de la página
main.css 	=> Archivo para el css global de la página
animations.css 	=> Archivo para las animaciones css
```

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).


