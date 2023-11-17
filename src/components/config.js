// config.js
const environments = {
  development: {
    apiBaseUrl: 'http://localhost:3000',
  },
  production: {
    apiBaseUrl: 'http://35.188.6.67',
  },
};

const environment = process.env.REACT_APP_ENV || 'production';
const config = environments[environment];

export default config;
