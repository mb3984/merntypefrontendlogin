import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Import the CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://merntypebackendlogin.onrender.com/api/auth/login",
        { email, password }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      alert("Login successful!");
      navigate("/home");
    } catch (error) {
      alert("Login failed.");
      console.error(error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>

      <span>
        Not registered? <Link to="/register">Please register first</Link>
      </span>
    </div>
  );
};

export default Login;
