const path = require('path');

module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    path.resolve(__dirname, '../../config/jest/setupTests.js')
  ]
};
