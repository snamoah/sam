#!/usr/bin/env node --harmony

var program = require('commander');

program
  .arguments('<module_name>')
  .action(createES6Module)
  .parse(process.argv);

function createES6Module(moduleName) {
  console.log('Module name', moduleName);
};
