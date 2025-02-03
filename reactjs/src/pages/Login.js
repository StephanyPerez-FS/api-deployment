import React, { useState, useEffect } from "react";

import { useParams, Link, useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await AuthService.login(email, password).then(
        (response) => {
          navigate("/");
        },
        (error) => {
          console.error(error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <h1>Login Screen</h1>
        <Link to="/">Home</Link>
      </header>
      <section>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Log In</button>
        </form>
      </section>
    </div>
  );
}

export default Login;
