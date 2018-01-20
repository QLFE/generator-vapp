'use strict';
const _ = require('lodash');
const extend = _.merge;
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.option('generateInto', {
      type: String,
      required: false,
      default: '',
      desc: 'Relocate the location of the generated files.'
    });
  }

  writing() {
    const pkgJson = {
      scripts: {
        precommit: 'lint-staged'
      },
      'lint-staged': {
        'src/**/*.js': ['eslint --fix', 'git add']
      }
    };

    this.fs.extendJSON(
      this.destinationPath(this.options.generateInto, 'package.json'),
      pkgJson
    );

    this.fs.copy(
      this.templatePath('eslint.js'),
      this.destinationPath(this.options.generateInto, '.eslint.js')
    );

    this.fs.copy(
      this.templatePath('eslintignore'),
      this.destinationPath(this.options.generateInto, '.eslintignore')
    );
  }

  install() {
    this.npmInstall(['eslint', 'eslint-plugin-vue', 'babel-eslint', 'eslint-config-qlfe', 'husky', 'lint-staged'], { 'save-dev': true });
  }

  end() {
    this.log('Lint added completely');
  }
};
