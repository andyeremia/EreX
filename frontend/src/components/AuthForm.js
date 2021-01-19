import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";

const AuthForm = ({ flag, onPress }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <Form>
        <Form.Field>
          <label>Username</label>
          <input
            placeholder="Username"
            value={username}
            onInput={(e) => setUsername(e.target.value)}
          />
        </Form.Field>
        {flag === 0 ? (
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email"
              value={email}
              onInput={(e) => setEmail(e.target.value)}
            />
          </Form.Field>
        ) : null}
        <Form.Field>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onInput={(e) => setPassword(e.target.value)}
          />
        </Form.Field>
        <Button
          type="submit"
          onClick={() => {
            flag === 0
              ? onPress({ username, email, password })
              : onPress({ username, password });
          }}
        >
          Submit
        </Button>
      </Form>
      {flag === 0 ? (
        <Link to="/login" className="item">
          Already have an account? Log In!
        </Link>
      ) : (
        <Link to="/register" className="item">
          Don't have an account? Register!
        </Link>
      )}
    </div>
  );
};

export default AuthForm;
