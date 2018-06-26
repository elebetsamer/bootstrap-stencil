const sass = require('@stencil/sass');

exports.config = {
  namespace: 'bs-stencil',
  outputTargets: [
    { type: 'dist' }
  ],
  bundles: [
    { components: ['bs-alert'] },
    { components: ['bs-badge'] },
    { components: ['bs-breadcrumb', 'bs-breadcrumb-item'] },
    { components: ['bs-button', 'bs-button-group'] },
    { components: ['bs-carousel', 'bs-carousel-item'] },
    { components: ['bs-card', 'bs-card-body', 'bs-card-link', 'bs-card-footer', 'bs-card-header'] },
    { components: ['bs-list-group', 'bs-list-group-item'] }
  ],
  plugins: [
    sass()
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
