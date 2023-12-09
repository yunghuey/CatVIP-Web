// api-constants.js
const apiUrl = "http://172.16.88.4:7015/api/";

export const ApiConstant = {
  URL: apiUrl,
  // Authentication
  LoginURL: `${apiUrl}Auth/login`,
  RefreshURL: `${apiUrl}auth/refresh`,
  RegisterURL: `${apiUrl}auth/register`,
  ForgotPasswordURL: `${apiUrl}auth/forgot-password`,

  // Expert
  GetPendingExpertURL: `${apiUrl}expert/GetPendingApplications`,
  GetApplicationByIdURL: `${apiUrl}expert/GetApplicationById/`,
  GetAllApplicationURL: `${apiUrl}expert/GetApplications`,
  UpdateExpertURL: `${apiUrl}Expert/UpateExpertApplicationStatus`,

  // User
  GetUserByIdURL: `${apiUrl}user/GetUserInfoById/`,

};