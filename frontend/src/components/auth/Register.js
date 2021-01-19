import React from "react";
import { useDispatch } from "react-redux";

import AuthForm from "../AuthForm";
import { signUp } from "../../actions/auth";

const Register = () => {
  const dispatch = useDispatch();
  const flag = 0;

  return (
    <div>
      <AuthForm flag={flag} onPress={dispatch(signUp)} />
    </div>
  );
};

export default Register;
