module.exports = function(config) {
  config.set({
    mutator: 'typescript',
    packageManager: 'npm',
    reporters: ['html', 'clear-text', 'progress'],
    transpilers: [],
    coverageAnalysis: 'off',
    tsconfigFile: 'tsconfig.json',
    mutate: ['packages/reactivity/src/**/*.ts']
  })
}
