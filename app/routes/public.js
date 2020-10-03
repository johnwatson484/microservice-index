module.exports = [{
  method: 'GET',
  path: '/assets/{path*}',
  handler: {
    directory: {
      path: [
        'app/public/stylesheets',
        'app/public/scripts',
        'node_modules/govuk-frontend/govuk/assets',
        'node_modules/govuk-frontend/govuk'
      ]
    }
  }
}]
