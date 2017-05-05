#!/usr/bin/node --harmony

var program = require('commander');

// commander prompt
program
  .command('g', 'generate boilerplate configuration files for es6, meteorjs, etc...')
  .parse(process.argv);



