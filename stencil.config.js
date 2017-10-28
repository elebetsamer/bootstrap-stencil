exports.config = {
  namespace: 'bsstencil',
  generateDistribution: true,
  bundles: [
    { components: ['bs-alert'] },
    { components: ['bs-badge'] },
    { components: ['bs-breadcrumb', 'bs-breadcrumb-item'] },
    { components: ['bs-button'] },
    { components: ['bs-card', 'bs-card-link'] }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
