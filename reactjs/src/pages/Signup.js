import React, { useState, useEffect } from "react";

import { useParams, Link, useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      await AuthService.signup(email, password).then(
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
        <h1>Signup Screen</h1>
        <Link to="/">Home</Link>
      </header>
      <section>
        <form onSubmit={handleSignUp}>
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
          <button type="submit">Sign Up</button>
        </form>
      </section>
    </div>
  );
}

export default SignUp;
