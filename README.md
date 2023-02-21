<div align="center">
  <img alt="Logo" src="https://raw.githubusercontent.com/felipevogtf/Portfolio/main/public/favicon.svg" width="100" />
</div>
<h1 align="center">
  Felipe Vogt - Portfolio
</h1>

![demo](https://raw.githubusercontent.com/felipevogtf/Portfolio/main/public/demo.png)

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


