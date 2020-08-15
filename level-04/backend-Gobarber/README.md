# Commads to create this project

Initialize server
`yarn init -D`
`yarn add express`
`yarn add @types/express -D`
`yarn add typescript -D`
Create typescript configuration file
`yarn tsc --init`

Add in tsconfig.json

```json
"outDir": "./dist",                        /* Redirect output structure to the directory. */
"rootDir": "./src",                        /* Specify the root directory of input files. Use to control the

```

Run: `yarn tsc`
this is convert the typescript file to javascript

For hot reload server, like nodemon we can use:
`yarn add ts-node-dev -D`

On package.json file we add:

```json
"scripts": {
    "build": "tsc",
    "dev:server": "ts-node-dev --transpileOnly --ignore-watch node_modules src/server.ts"
  },
```

Run the `yarn dev:server` to run development ambience using ts-node-dev. The flag `--transpileOnly`
this is ignore buil correction on typescipt, and `--ignore-watch` to igonre files on build.

Configure design patterns:

`yarn add eslint@6.8.0 -D`
`yarn eslint --init`
