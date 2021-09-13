const { dependencies: deps } = require('../package.json');

module.exports = {
  exposes: {
    './Button': './src/components/Button.tsx'
  },
  remotes: {},
  shared: {
    ...deps,
    react: {
      singleton: true,
      // eager: true,
      // requiredVersion: deps.react
    },
    'react-dom': {
      singleton: true,
      // eager: true,
      // requiredVersion: deps['react-dom']
    },
    'react-router-dom': {
      singleton: true,
      // eager: true,
      // requiredVersion: deps['react-router-dom']
    }
  }
};
