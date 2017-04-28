#!/usr/bin/env node --harmony

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

//program
//  .command('create', { isDefault: true });

function createModule() {
  createDirs();
  createConfigFiles();
  createPackageJsonFile();
};

function createConfigFiles() {
  copy('babelrc', '.babelrc');
  copy('eslintrc', '.eslintrc');
  copy('gitignore', '.gitignore');
  copy('npmignore', '.npmignore');
  copy('editorconfig', '.editorconfig');
}

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


// Execution
promptUser();

