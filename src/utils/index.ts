export const clearLoginInfo = () => {
  localStorage.removeItem("userName");
  localStorage.removeItem("authorization");
};
