import { actionTypes } from "./actions/auth";

export const authDefaultState = { adminToken: null, admin: null };
// REDUCER
const auth = (state = authDefaultState, action) => {
  switch (action.type) {
    case actionTypes.adminLogIn:
      return {
        ...state,
        adminToken: action.payload.adminToken,
        admin: action.payload.admin,
      };
    default:
      return state;
  }
};

export default auth;
