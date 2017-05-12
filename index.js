#!/usr/bin/env node --harmony

var program = require('commander');

// commander prompt
program
  .version('1.0.8')
  .usage('g [command]')
  .command('g', 'generate boilerplate configuration files for es6, meteorjs, etc...')
  .parse(process.argv);



