import streams from "../apis/streams";
import history from "../history";
import { SIGN_UP, SIGN_IN, SIGN_OUT, AUTH_ERROR } from "./types";

export const signUp = (dispatch) => async (user) => {
  try {
    const response = await streams.post("/api/auth/signup", user);
    console.log(response);
    dispatch({ type: SIGN_UP, payload: response.data });
    history.push("/login");
  } catch {
    dispatch({
      type: AUTH_ERROR,
      payload: "Something went wrong while creating your account",
    });
  }
};

export const signIn = (dispatch) => async (user) => {
  try {
    const response = await streams.post("/api/auth/signin", user);
    console.log("response", response.data);
    dispatch({ type: SIGN_IN, payload: response.data });
    localStorage.setItem("user", response.data.username);
    history.push("/");
  } catch {
    dispatch({
      type: AUTH_ERROR,
      payload: "Something went wrong while logging in",
    });
  }
};

export const signOut = () => {
  localStorage.removeItem("user");
  return {
    type: SIGN_OUT,
  };
};
