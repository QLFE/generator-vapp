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
      required: true,
      description: 'Project name'
    });
  }

  initializing() {
    this.props = {};

    this.destinationRoot(this.options.name);
  }

  prompting() {
    const prompts = [{
      type: 'input',
      name: 'platform',
      message: 'This Project run on PC or mobile?(pc/mob)',
      default: 'mob'
    }, {
      type: 'confirm',
      name: 'hybrid',
      message: 'Do you need hybrid libary?'
    }, {
      type: 'confirm',
      name: 'encrypt',
      message: 'Do you need encrypt libary'
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
    }];

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }

  writing() {
    const tplPaths = ['index.html', 'package.json', '.postcssrc.js', 'src/main.js'];

    this.fs.copy(
      this.templatePath('**'),
      this.destinationPath(),
      {
        globOptions: {
          dot: true
        }
      }
    );

    // this._writingPKG();

    tplPaths.forEach(tplPath => {
      this.fs.copyTpl(
        this.templatePath(tplPath),
        this.destinationPath(tplPath),
        {
          title: this.options.name,
          platform: this.props.platform,
          name: _.kebabCase(this.options.name),
          description: this.props.description,
          author: {
            name: this.props.authorName,
            email: this.props.authorEmail
          }
        }
      );
    });

  }

  install() {
    // this.installDependencies({ bower: false });
  }
};
