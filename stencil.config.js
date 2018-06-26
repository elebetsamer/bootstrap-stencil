const sass = require('@stencil/sass');

exports.config = {
  namespace: 'bs-stencil',
  outputTargets: [
    { type: 'dist' }
  ],
  plugins: [
    sass()
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
