exports.config = {
  namespace: 'bsstencil',
  generateDistribution: true,
  bundles: [
    { components: ['bs-alert'] },
    { components: ['bs-badge'] },
    { components: ['bs-breadcrumb', 'bs-breadcrumb-item'] },
    { components: ['bs-button'] },
    { components: ['bs-card', 'bs-card-body', 'bs-card-link', 'bs-card-footer', 'bs-card-header'] },
    { components: ['bs-list-group', 'bs-list-group-item'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
