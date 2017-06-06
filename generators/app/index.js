'use strict';
const _ = require('lodash');
const extend = _.merge;
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  constructor(args, opts) {
    // Calling the super constructor is important so our generator is correctly set up
    super(args, opts);

    this.argument('name', {
      type: String,
      required: false,
      description: 'Project name'
    });
  }

  initializing() {
    this.props = {};

    if (this.options.name) {
      this.destinationRoot(this.options.name);
    }
  }

  prompting() {
    const prompts = [{
      name: 'name',
      message: 'Project Name'
    }, {
      name: 'description',
      message: 'Description'
    }, {
      name: 'authorName',
      message: 'Author\'s Name',
      default: this.user.git.name()
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email',
      default: this.user.git.email()
    }, {
      type: 'confirm',
      name: 'hybrid',
      message: 'Do you need hybrid libary?'
    }, {
      type: 'confirm',
      name: 'encrypt',
      message: 'Do you need encrypt libary'
    }];

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }

  _writingEncrypt() {
    const tplPaths = ['src/config/encrypt.js', 'src/libs/http/interceptors/encrypt.js'];
    if (!this.props.encrypt) {
      tplPaths.forEach(tplPath => {
        this.fs.delete(tplPath);
      });
    }
  }

  _writingHybrid() {
    const tplPaths = ['src/libs/hybrid'];
    if (!this.props.hybrid) {
      tplPaths.forEach(tplPath => {
        this.fs.delete(tplPath);
      });
    }
  }

  _copyTpl(tplPath) {
    this.fs.delete(this.destinationPath(tplPath));

    this.fs.copyTpl(
      this.templatePath(tplPath),
      this.destinationPath(tplPath),
      {
        title: this.options.name,
        name: _.kebabCase(this.props.name),
        description: this.props.description,
        author: {
          name: this.props.authorName,
          email: this.props.authorEmail
        },
        hybrid: this.props.hybrid,
        encrypt: this.props.encrypt
      }
    );
  }

  writing() {
    const tplPaths = ['index.html', 'package.json', 'static/js/config.js', 'src/libs/http/index.js', 'src/config/index.js'];

    this.fs.copy(
      this.templatePath('**'),
      this.destinationPath(),
      {
        globOptions: {
          dot: true
        }
      }
    );

    tplPaths.forEach(tplPath => {
      this._copyTpl(tplPath);
    });

    this._writingEncrypt();
    this._writingHybrid();
  }

  install() {
    this.installDependencies({ bower: false });
  }

  end() {
    this.log('Project created completely');
  }
};
