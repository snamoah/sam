#!/usr/bin/env node

var program = require('commander');

// commander prompt
program
  .command('g', 'generate boilerplate configuration files for es6, meteorjs, etc...')
  .parse(process.argv);



