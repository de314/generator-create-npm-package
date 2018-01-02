#!/usr/bin/env node

/**
 * Require dependencies
 *
 */
import program from 'commander'
import pjson from '../package.json'

program
  .version(pjson.version)
  .description('<%= desc %>')
  .option('-f, --foo', 'enable some foo')
  .option('-b, --bar', 'enable some bar')
  .option('-B, --baz', 'enable some baz')
  // :::OPTION NEEDLE :::
  // .command('install [name]', 'install one or more packages')
  // .alias('i')
  // .command('search [query]', 'search with optional query')
  // .alias('s')
  // .command('list', 'list packages installed', { default: true })
  // .command('publish', 'publish the package')
  // .alias('p')
  // :::COMMAND NEEDLE :::
  .parse(process.argv)

console.log(program.args)
