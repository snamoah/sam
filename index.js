#!/usr/bin/env node

var program = require('commander');

// commander prompt
program
  .version('v1.0.13')
  .usage('g [command]')
  .command('g', 'generate boilerplate configuration files for es6, meteorjs, etc...')
  .parse(process.argv);



