import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const username = localStorage.getItem("username") || "User";

  return (
    <div className="navbar">

      <div className="navbar-left">
        <div className="logo">FinTrack</div>

        <div className="nav-links">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/transactions">Transactions</Link>
          <Link to="/budgets">Budgets</Link>
        </div>
      </div>

      <div className="navbar-right">
        <span className="username">Hi {username}</span>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

    </div>
  );
}

export default Navbar;