#!/usr/bin/env node

var program = require('commander'),
  $ = require('shelljs'),
  path = require('path'),
  co = require('co'),
  prompt = require('co-prompt'),
  ejs = require('ejs'),
  fs = require('fs');


var defaultModuleName = path.basename(process.cwd()),
  moduleName = '',
  author = '',
  description = '',
  modulePath = '';


function createModule() {
  createDirs();
  createConfigFiles();
  createPackageJsonFile();

  console.log('Running `npm install` in directory ...');
  runNpmInstall();
};

function createConfigFiles() {
  generateBasicConfig();
  copy('babelrc', '.babelrc');
  copy('npmignore', '.npmignore');
}

function generateBasicConfig() {
  copy('eslintrc', '.eslintrc');
  copy('editorconfig', '.editorconfig');
  copy('gitignore', '.gitignore');
}

function generateNpmIgnore() {
  copy('npmignore', '.npmignore');
}

function generateGitIgnore() {
  copy('gitignore', '.gitignore');
}

function runNpmInstall() {
  if (modulePath != process.cwd()) {
    $.cd(modulePath);
  }

  $.exec('npm install');
};

function copy(source, destination) {
  var sourcePath = path.join(__dirname, 'files/' + source);
  var destinationPath = path.join(modulePath, destination);
  fs.writeFileSync(destinationPath, fs.readFileSync(sourcePath));
}

function template(file, data) {
  var source = path.join(__dirname, file);
  var sourceFile = fs.readFileSync(source, 'utf-8');
  return ejs.render(sourceFile, data);
}


function createPackageJsonFile() {
  var pkgJsonFile = template('files/_package.json', {
    modulename: moduleName,
    description: description,
    author: author
  });

  var destinationPath = path.join(modulePath, 'package.json');
  fs.writeFileSync(destinationPath, pkgJsonFile);
}

function createDirs() {
  $.mkdir('-p', path.join(modulePath, 'lib'));
  $.cp(path.join(__dirname, 'files/index.js'), path.join(modulePath, 'lib'));
}

function promptUser() {
  co(function *() {
    moduleName = yield prompt('name(' + defaultModuleName + '): ');
    description = yield prompt('description: ');
    author = yield prompt('author: ');


    moduleName = moduleName || defaultModuleName;
    modulePath = path.basename(process.cwd())  == moduleName ? process.cwd() : path.join(process.cwd(), moduleName);

    //create directory if user doesn't want to use current directory
    if (process.cwd() !== modulePath) {
      $.mkdir('-p', modulePath);
      $.cd(modulePath);
    }

    createModule();

    //end when done
    process.exit();
  });

};

Generator = {
  es6: function es6() {
    promptUser();
  },

  basic: function basic() {
    generateBasicConfig();
    process.exit();
  },

  npmignore: function npmignore() {
    generateNpmIgnore();
    process.exit();
  },

  gitignore: function gitignore() {
    generateGitIgnore();
    process.exit();
  }
};

program
  .usage('<generator>')
  .arguments('<generator>', 'generator type [ es6, basic ]')
  .action(function(type) {
    Generator[type] && Generator[type]();
  });

program.on('--help', function() {
  console.log('  Generators:');
  console.log('');
  console.log('     es6         Use this to generate an es6 npm module');
  console.log('     basic       Use this to generate gitignore, npmignore, \
eslintrc config files');
  console.log('     gitignore   Use this to generate a gitignore config file');
  console.log('     npmignore   Use this to generate a npmignore config file');
  console.log('');
  console.log('  Examples:');
  console.log('');
  console.log('     $ sam g es6');
  console.log('     $ sam g basic');
  console.log('');
});

program.parse(process.argv);

