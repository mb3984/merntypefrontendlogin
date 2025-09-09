// import React, { useState } from "react";
// import axios, { AxiosError } from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import "./Register.css";

// const Register: React.FC = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "https://merntypebackendlogin.onrender.com/api/auth/register",
//         {
//           email,
//           password,
//         }
//       );
//       alert("Registered successfully!");
//       navigate("/login");
//     } catch (err) {
//       // Type the error as an AxiosError with a data shape { error: string }
//       const error = err as AxiosError<{ error: string }>;

//       if (
//         error.response?.status === 400 &&
//         error.response.data?.error === "Email already exists"
//       ) {
//         alert("Email already exists. Please use another email.");
//       } else {
//         alert("Registration failed. Please try again.");
//       }
//       console.error(error);
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       <form onSubmit={handleRegister}>
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
//         <button type="submit">Register</button>
//       </form>

//       <span>
//         Already signed up? <Link to="/login">Login here</Link>
//       </span>
//     </div>
//   );
// };

// export default Register;

import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Register.css";

const Register: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // loader state
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // show loader before fetch
    try {
      await axios.post(
        "https://merntypebackendlogin.onrender.com/api/auth/register",
        {
          email,
          password,
        }
      );
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      if (
        error.response?.status === 400 &&
        error.response.data?.error === "Email already exists"
      ) {
        alert("Email already exists. Please use another email.");
      } else {
        alert("Registration failed. Please try again.");
      }
      console.error(error);
    } finally {
      setLoading(false); // hide loader after response
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
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
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {loading && (
        <div className="loader"></div> // loader shown while fetching
      )}

      <span>
        Already signed up? <Link to="/login">Login here</Link>
      </span>
    </div>
  );
};

export default Register;
