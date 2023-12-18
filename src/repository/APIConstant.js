// api-constants.js
const apiUrl = "http://192.168.0.126:7015/api/";

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
  
  // Reported post
  GetReportedPostsURL: `${apiUrl}post/getreportedposts`,
  GetReportedPostDetailsURL: `${apiUrl}post/getreportedpostdetails/`,


};