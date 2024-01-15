export const actionTypes = {
  adminLogIn: "SAVE_ADMIN_LOG_IN_INFO",
};

export const saveAdminLogInInfo = (adminToken, admin) => ({
  type: actionTypes.adminLogIn,
  payload: { adminToken, admin },
});
