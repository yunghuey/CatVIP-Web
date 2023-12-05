// api-constants.js
const apiUrl = "http://192.168.137.1:7015/api/";

export const ApiConstant = {
  URL: apiUrl,
  // Authentication
  LoginURL: `${apiUrl}Auth/login`,
  RefreshURL: `${apiUrl}auth/refresh`,
  RegisterURL: `${apiUrl}auth/register`,
  ForgotPasswordURL: `${apiUrl}auth/forgot-password`,

  // Expert
  GetPendingExpertURL: `${apiUrl}expert/GetPendingApplications`,
  UpdateExpertURL: `${apiUrl}expert/UpdateExpertApplicationStatus`,
};
