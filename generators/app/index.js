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

    this.config.save()
    this.state = this.config.getAll()

    if (this.state && this.state.genTime && this.state.version) {
      this.config.set('prev', {
        genTime: this.state.genTime,
        version: this.state.version,
      })
    }
    this.config.set('genTime', new Date().getTime())
    this.config.set('version', version)
    this.state = this.config.getAll()

    this.log(yosay('Starting ' + chalk.red('create-npm-package') + ' generator!'))
  }

  _is_install() {
    return !this._is_update()
  }

  _is_update() {
    return (
      _.isNumber(_.get(this.state, 'prev.genTime')) && !_.isNil(_.get(this.state, 'prev.version'))
    )
  }

  initializing() {
    this.props = {}
  }

  _prompt_install() {
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
        type: 'list',
        name: 'type',
        message: 'What kind of package should be generated?',
        choices: [
          { name: 'Library', value: 'lib' },
          { name: 'CLI Tool', value: 'cli' },
          { name: 'React Component(s)', value: 'react' },
        ],
      },
    ]

    return this.prompt(prompts).then(props => {
      _.merge(this.props, props)
    })
  }

  prompting() {
    if (this._is_install()) {
      return this._prompt_install()
        .then(() => {
          if (this._is_install()) {
            this.config.set('props', this.props)
            this.composeWith(
              'git-init',
              {},
              {
                local: require.resolve('generator-git-init'),
              }
            )
          }
        })
        .then(() => {
          this.composeWith(`create-npm-package:${this.props.type}`, this.props)
        })
    } else {
      this.composeWith(`create-npm-package:${this.state.props.type}`, this.state.props)
    }
  }
}
