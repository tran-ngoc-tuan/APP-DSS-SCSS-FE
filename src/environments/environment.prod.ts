const packageInfo = require('../../package.json');  // Sử dụng require thay vì import
export const environment = {
  appVersion: packageInfo.version,
  production: true,
  apiUrl: 'http://localhost:4200'
};
