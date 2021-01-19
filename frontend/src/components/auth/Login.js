import React from "react";
import { useDispatch } from "react-redux";

import AuthForm from "../AuthForm";
import { signIn } from "../../actions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const flag = 1;

  return (
    <div>
      <AuthForm flag={flag} onPress={dispatch(signIn)} />
    </div>
  );
};

export default Login;
