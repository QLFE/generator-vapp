'use strict';
const _ = require('lodash');
const extend = _.merge;
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const path = require('path');

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

    this.projectRoot = this.destinationPath(this.options.name);
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ace ' + chalk.red('generator-vapp') + ' generator!'
    ));

    const prompts = [{
      type: 'input',
      name: 'platform',
      message: 'This Project run on PC or mobile?(pc/mob)',
      default: 'mob'
    }, {
      name: 'description',
      message: 'Description'
    }, {
      name: 'authorName',
      message: 'Author\'s Name',
      default: this.user.git.name(),
      store: true
    }, {
      name: 'authorEmail',
      message: 'Author\'s Email',
      default: this.user.git.email(),
      store: true
    }, {
      name: 'authorUrl',
      message: 'Author\'s Homepage',
      store: true
    }, {
      name: 'keywords',
      message: 'Package keywords (comma to split)',
      filter(words) {
        return words.split(/\s*,\s*/g);
      }
    }];

    return this.prompt(prompts).then(props => {
      this.props = extend(this.props, props);
    });
  }

  _path(subPath){
    return this.destinationPath(path.join(this.options.name, subPath));
  }

  _writingPKG() {
    // Re-read the content at this point because a composed generator might modify it.
    const currentPkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    const pkg = extend({
      name: _.kebabCase(this.props.name),
      version: '0.0.0',
      description: this.props.description,
      author: {
        name: this.props.authorName,
        email: this.props.authorEmail,
        url: this.props.authorUrl
      },
      keywords: [],
      devDependencies: {}
    }, currentPkg);

    // Combine the keywords
    if (this.props.keywords && this.props.keywords.length) {
      pkg.keywords = _.uniq(this.props.keywords.concat(pkg.keywords));
    }

    // Let's extend package.json so we're not overwriting user previous fields
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);
  }

  writing() {
    this.fs.copy(
      this.templatePath('**'),
      this.destinationPath(this.options.name)
    );
  }

  install() {
    this.installDependencies({ bower: false });
  }
};
