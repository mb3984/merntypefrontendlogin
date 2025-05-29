import { useNavigate } from "react-router-dom";
import "./Home.css"; // Import the styles

const Home = () => {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/login");
  };

  if (!token) {
    navigate("/login");
    return null;
  }

  return (
    <div className="home-container">
      <h2>Welcome, {email}</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
