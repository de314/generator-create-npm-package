'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')
const _ = require('lodash')

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Welcome to the fine ' + chalk.red('generator-create-npm-package') + ' generator!')
    )

    const prompts = [
      {
        type: 'input',
        name: 'projectName',
        message: 'Your project name',
        default: this.appname, // Default to current folder name
      },
      {
        type: 'input',
        name: 'desc',
        message: 'Project description',
        default: 'A new NPM package.',
      },
      {
        type: 'input',
        name: 'ghUsername',
        message: 'Your Github username',
        default: this.user.github.username(),
        store: true,
      },
      {
        type: 'input',
        name: 'authorName',
        message: 'Your first and last name',
        default: this.user.git.name(),
        store: true,
      },
      {
        type: 'input',
        name: 'email',
        message: 'Your email address',
        default: this.user.git.email(),
        store: true,
      },
    ]

    return this.prompt(prompts).then(props => {
      this.props = props
    })
  }

  configuring() {
    this.config.save()
    this.composeWith(
      'git-init',
      {},
      {
        local: require.resolve('generator-git-init'),
      }
    )
  }

  writing() {
    const self = this
    const fs = this.fs
    ;[
      { s: '_package.json', d: 'package.json' },
      { s: 'src/index.js', d: 'src/index.js' },
      { s: 'src/_projectName.js', d: `src/${self.props.projectName}.js` },
    ].forEach(({ s, d }) => fs.copyTpl(self.templatePath(s), self.destinationPath(d), self.props))
    ;['.babelrc', '.gitignore', 'LICENSE', 'test/example.spec.js'].forEach(name =>
      fs.copy(self.templatePath(name), self.destinationPath(name))
    )
  }

  install() {
    this.npmInstall(['babel-plugin-transform-object-rest-spread', 'babel-polyfill', 'lodash'])
    this.npmInstall(
      [
        'babel-cli',
        'babel-core',
        'babel-preset-env',
        'chai',
        'isparta',
        'istanbul',
        'mocha',
        'rimraf',
      ],
      { 'save-dev': true }
    )
  }
}
