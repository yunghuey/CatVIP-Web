// api-constants.js
const apiUrl = "http://10.131.76.184:7015/api/";

export const ApiConstant = {
  URL: apiUrl,
  LoginURL: `${apiUrl}Auth/login`,
  RefreshURL: `${apiUrl}auth/refresh`,
  RegisterURL: `${apiUrl}auth/register`,
  ForgotPasswordURL: `${apiUrl}auth/forgot-password`
};
