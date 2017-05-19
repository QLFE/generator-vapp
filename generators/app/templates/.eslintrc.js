// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

    'indent': ['error', 2],
    'comma-dangle': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'no-unused-vars': ['error', {
      'vars': 'all',
      'args': 'none'
    }],
    'no-use-before-define': ['error', {
      'functions': false,
      'classes': true
    }],
    'func-names': 'off',
    'no-shadow': 'off',
    'no-mixed-operators': ['error', {'allowSamePrecedence': true}],
    'space-before-function-paren': ['error', 'never'],
    'no-bitwise': 'off',
    'no-underscore-dangle': 'off',
    'no-console': ["error", { allow: ["warn", "error"] }],
    'no-multi-assign': 'off',
    'linebreak-style': 'off',
    'global-require': 'off',
    'import/no-dynamic-require': 'off'
  }
}
