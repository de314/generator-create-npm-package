#!/usr/bin/env node

/**
 * Require dependencies
 *
 */
import program from 'commander'

program.option('-f, --force', 'force installation').parse(process.argv)

var pkgs = program.args
