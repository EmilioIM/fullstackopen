import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { LOGIN } from "../queries";
import { useMutation } from "@apollo/client";

const LoginForm = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem("user-token", token);
    }
  }, [result.data]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      login({ variables: { username, password } });
      setUsername("");
      setPassword("");
    } catch (error) {
      props.setError("Error al iniciar sesión");
    }
  };

  if (!props.show) {
    return null;
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

LoginForm.propTypes = {
  setToken: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
};

export default LoginForm;
