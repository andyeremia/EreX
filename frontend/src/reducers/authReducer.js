import { SIGN_UP, SIGN_IN, SIGN_OUT, AUTH_ERROR } from "../actions/types";

const INITIAL_STATE = {
  isSignedIn: null,
  token: null,
  message: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGN_UP:
      return { ...state, message: action.payload };
    case SIGN_IN:
      return {
        ...state,
        isSignedIn: true,
        token: action.payload.accessToken,
        message: null,
      };
    case SIGN_OUT:
      return { ...state, isSignedIn: false, token: null, message: null };
    default:
      return state;
  }
};

export default authReducer;
