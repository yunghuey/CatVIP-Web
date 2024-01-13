// api-constants.js
const apiUrl = "http://172.16.88.19:7015/api/";
// const apiUrl = "http://192.168.137.1:7015/api/";

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
  DeletePostURL: `${apiUrl}post/deletepost/`,

  // Analysis
  GetUsersProductCountURL: `${apiUrl}Analysis/GetUsersAndProductsCount`,
  GetExpertTipsCountURL: `${apiUrl}Analysis/GetPostsAndExpertTipsCount?query=`,
  GetCatCountURL: `${apiUrl}Analysis/GetMissingCatsCount?query=`,

  // Product
  GetAllProductURL: `${apiUrl}Product/GetProducts`,
  DeleteProductURL: `${apiUrl}Product/Delete/`,
  AddProductURL: `${apiUrl}Product/Store`,
  GetProductTypesURL: `${apiUrl}Product/GetProductTypes`,
  EditProductURL: `${apiUrl}Product/Edit/`,
  GetProductURL: `${apiUrl}Product/GetProduct/`,
};