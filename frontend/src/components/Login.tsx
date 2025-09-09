// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import "./Login.css"; // Import the CSS

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "https://merntypebackendlogin.onrender.com/api/auth/login",
//         { email, password }
//       );
//       const token = response.data.token;
//       localStorage.setItem("token", token);
//       localStorage.setItem("email", email);
//       alert("Login successful!");
//       navigate("/home");
//     } catch (error) {
//       alert("Login failed.");
//       console.error(error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//           required
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//           required
//         />
//         <button type="submit">Login</button>
//       </form>

//       <span>
//         Not registered? <Link to="/register">Please register first</Link>
//       </span>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Import the CSS

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // loader state
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // show loader before fetch
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
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      if (error.response?.status === 401) {
        alert("Invalid credentials. Please try again.");
      } else {
        alert("Login failed. Please try again.");
      }
      console.error(error);
    } finally {
      setLoading(false); // hide loader after response
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

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      {loading && <div className="loader"></div>}

      <span>
        Not registered? <Link to="/register">Please register first</Link>
      </span>
    </div>
  );
};

export default Login;
