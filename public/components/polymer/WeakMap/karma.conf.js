module.exports = function(karma) {
  var common = require('../tools/test/karma-common.conf.js');
  karma.set(common.mixin_common_opts(karma, {
    // base path, that will be used to resolve files and exclude
    basePath: '',

    // list of files / patterns to load in the browser
    files: [
      'node_modules/chai/chai.js',
      'weakmap.js',
      'tests/*.js'
    ],
  }));
};
