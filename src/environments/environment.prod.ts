const packageInfo = require('../../package.json');  // Sử dụng require thay vì import
export const environment = {
  appVersion: packageInfo.version,
  production: true,
  // Ở môi trường production, bạn cần URL tuyệt đối
  apiBaseUrl: 'https://ebill.khpc.vn:7777'
};
