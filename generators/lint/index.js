'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.argument('generateInto', {
      type: String,
      required: false,
      default: '',
      description: 'Relocate the location of the generated files.'
    });
  }

  writing() {
    const pkgJson = {
      scripts: {
        precommit: 'lint-staged',
        lint: 'eslint --ext .js,.vue src'
      },
      'lint-staged': {
        'src/**/*.{js,vue}': ['eslint --fix', 'git add']
      },
      devDependencies: {
        'eslint-config-qlfe': '^0.1.6',
        eslint: '^4.15.0',
        'eslint-friendly-formatter': '^3.0.0',
        'eslint-loader': '^1.7.1',
        'eslint-plugin-vue': '^4.0.0',
        'babel-eslint': '^8.2.1',
        'eslint-plugin-import': '^2.8.0',
        husky: '^0.14.3',
        'lint-staged': '^6.0.0'
      }
    };

    this.fs.extendJSON(
      this.destinationPath(this.options.generateInto, 'package.json'),
      pkgJson
    );

    this.fs.copy(
      this.templatePath('eslintrc.js'),
      this.destinationPath(this.options.generateInto, '.eslintrc.js')
    );

    this.fs.copy(
      this.templatePath('eslintignore'),
      this.destinationPath(this.options.generateInto, '.eslintignore')
    );
  }

  install() {
    this.installDependencies({ bower: false });
  }

  end() {
    this.log('Lint added completely');
  }
};
