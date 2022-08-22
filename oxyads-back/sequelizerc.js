const path = require('./src')

module.exports = {
  config: path.resolve('./config', 'config.js'),
  'models-path': path.resolve('../'),
  'seeders-path': path.resolve('./database/seeders'),
  'migrations-path': path.resolve('./database/migrations'),
}
