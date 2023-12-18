// api-constants.js
const apiUrl = "http://10.131.78.121:7015/api/";

export const ApiConstant = {
  URL: apiUrl,
  // Authentication
  LoginURL: `${apiUrl}Auth/login`,
  RefreshURL: `${apiUrl}auth/refresh`,
  RegisterURL: `${apiUrl}auth/register`,
  ForgotPasswordURL: `${apiUrl}auth/forgot-password`,
  UpdateProfileURL: `${apiUrl}auth/editProfile`,
  GetProfileURL: `${apiUrl}auth/GetUserInfo`,

  // Expert
  GetPendingExpertURL: `${apiUrl}expert/GetPendingApplications`,
  GetApplicationByIdURL: `${apiUrl}expert/GetApplicationById/`,
  GetAllApplicationURL: `${apiUrl}expert/GetApplications`,
  UpdateExpertURL: `${apiUrl}Expert/UpateExpertApplicationStatus`,

  // User
  GetUserByIdURL: `${apiUrl}user/GetUserInfoById/`,

  // Analysis
  GetUsersCountURL: `${apiUrl}Analysis/GetUsersCount`,
  GetExpertTipsCountURL: `${apiUrl}Analysis/GetExpertTipsCount?query=`,
  GetCatCountURL: `${apiUrl}Analysis/GetMissingCatsCount?query=`,
};