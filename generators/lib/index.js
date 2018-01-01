'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const _ = require('lodash')

require('pkginfo')(module)
const version = module.exports.version

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts)

    // Next, add your custom code
    this.option('projectName')
    this.option('desc')

    this.state = this.config.getAll()
    this.state.upToDate = this.state.version === _.get(this.state, 'prev.version')
    this.config.set('lib', true)
  }

  _is_install() {
    return !this._is_update()
  }

  _is_update() {
    return !_.isNil(this.state.lib)
  }

  initializing() {
    this.props = _.pick(this.options, ['projectName', 'desc'])

    if (this._is_install()) {
      console.log(`${chalk.underline('Installing:')} v${this.state.version}`)
      _.assignIn(this.props, {
        user: {
          username: 'unknown-git-user',
          name: this.user.git.name(),
          email: this.user.git.email(),
        },
      })
      return this.user.github.username().then(username => (this.props.user.username = username))
    } else if (this.state.upToDate) {
      console.log(
        `${chalk.underline('Updating:')} v${this.state.prev.version} => v${this.state.version}`
      )
    } else {
      console.log(
        `${chalk.underline('Updating:')} v${this.state.prev.version} => v${this.state.version}`
      )
    }
  }

  _prompt_install() {}

  prompting() {
    if (this._is_install()) {
      return this._prompt_install()
    }
  }

  configuring() {}

  _write_files() {
    const self = this
    const fs = this.fs
    ;[
      { s: 'package.ejs.json', d: 'package.json' },
      { s: 'README.ejs.md', d: 'README.md' },
      { s: 'src/index.ejs.js', d: 'src/index.js' },
      { s: 'src/main.ejs.js', d: `src/${self.props.projectName}.js` },
      { s: 'tests/example-spec.js', d: 'tests/example.spec.js' },
      { s: 'examples/runkit.example.ejs.js', d: 'examples/runkit.example.js' },
    ].forEach(({ s, d }) => fs.copyTpl(self.templatePath(s), self.destinationPath(d), self.props))
    ;['.babelrc', '.gitignore', 'LICENSE', '.travis.yml'].forEach(name =>
      fs.copy(self.templatePath(name), self.destinationPath(name))
    )
  }

  writing() {
    if (this._is_install()) {
      this._write_files()
    } else if (this.state.upToDate) {
      console.log(`${chalk.underline('Writing Files:')} ${chalk.green('up to date')}`)
    } else {
      console.log(`${chalk.underline('Writing Files:')} ${chalk.red('not implemented')}`)
    }
  }

  _install_initial() {
    this.npmInstall(['babel-plugin-transform-object-rest-spread', 'babel-polyfill'])
    this.npmInstall(
      [
        'babel-cli',
        'babel-core',
        'babel-preset-env',
        'chai',
        'coveralls',
        'isparta',
        'istanbul',
        'mocha',
        'rimraf',
      ],
      { 'save-dev': true }
    )
  }

  install() {
    if (this._is_install()) {
      this._install_initial()
    } else if (this.state.upToDate) {
      console.log(`${chalk.underline('Writing Files:')} ${chalk.green('up to date')}`)
    } else {
      console.log(`${chalk.underline('Writing Files:')} ${chalk.red('not implemented')}`)
    }
  }
}
