# Sam G command line tool

A simple command-line tool to generate es6 boilerplate npm packages. I've lately been creating a lot of npm packages and having to go through the process of installing eslint, babel and the likes became very frustrating so decided to build this simple tool.

# Install

```bash
> npm install -g samm
```


## Usage

```

samm [command] <generator>

Commands:

  g     generate boilerplate configuration files for es6, meteorjs, etc...
  help  display help for a specific command

Options:

  -h   help

```


## Exmaple

Here's an example for creating an npm package

```bash
> samm g es6
```

## Generators

**es6** - This option generates a boilerplate npm package either in your current working directory or in a directory you specify. It also generates `.npmignore`, `.eslintrc`, `.gitignore`, `.editorconfig` files in the project directory.

**basic** - Generates `.eslintrc`, `.gitignore`, `.editorconfig` for a project.

**npmignore** - adds a `.npmignore` file to your project directory.

**gitignore** - adds a `.gitignore` file to your project directory.
