import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import {
  FaBriefcase,
  FaLaptopCode,
  FaBuilding,
  FaHome,
  FaFacebook,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { signOut } from "firebase/auth";   // Firebase signOut import
import { auth } from "./firebase";         // Firebase auth instance import
import logo from "./assets/logo.png.png";

// Pages
import Business from "./pages/Business";
import ITSkills from "./pages/ITSkills";
import Jobs from "./pages/Jobs";
import Music from "./pages/Music";
import Cooking from "./pages/Cooking";
import Fashion from "./pages/Fashion";
import Entertainment from "./pages/Entertainment";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Welcome from "./pages/Welcome";

// Sections data
const sections = [
  { name: "Business", route: "/Business", icon: <FaBriefcase size={26} /> },
  { name: "IT Skills", route: "/it-skills", icon: <FaLaptopCode size={26} /> },
  { name: "Jobs", route: "/jobs", icon: <FaBuilding size={26} /> },
  { name: "Music", route: "/music" },
  { name: "Cooking", route: "/cooking" },
  { name: "Fashion", route: "/fashion" },
  { name: "Entertainment", route: "/entertainment" },
];

// Home component inside App.js
const Home = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const match = sections.find((sec) =>
      sec.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );

    if (match && match.route) {
      navigate(match.route);
    } else {
      const randomIndex = Math.floor(Math.random() * sections.length);
      const randomSection = sections[randomIndex];
      alert(`No exact match found. Redirecting to: ${randomSection.name}`);
      navigate(randomSection.route);
    }
  };

  // Logout handler function
  const handleLogout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("isLoggedIn");
      navigate("/login"); // redirect to login page after logout
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed, please try again.");
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        background: "linear-gradient(to bottom right, #e0f7fa, #f0f4f8)",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      {/* Header with logo, title, nav links & logout button */}
      <header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "30px",
          paddingBottom: "10px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={logo} alt="logo" style={{ height: "80px", marginRight: "20px" }} />
          <h1 style={{ color: "indigo", fontSize: "28px", margin: 0 }}>
            WELCOME TO SUMARISHMA
          </h1>
        </div>

        <nav>
          <Link to="/" style={navStyle}>
            <FaHome style={{ marginRight: "5px" }} /> Welcome
          </Link>
          {sections.map((sec) => (
            <Link key={sec.route} to={sec.route} style={navStyle}>
              {sec.name}
            </Link>
          ))}
          {/* Logout button */}
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: "#6a1b9a",
              color: "white",
              border: "none",
              padding: "8px 16px",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "bold",
              marginLeft: "20px",
              transition: "background-color 0.3s ease",
            }}
            onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4a0d72")}
            onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#6a1b9a")}
          >
            Logout
          </button>
        </nav>
      </header>

      <section style={{ textAlign: "center", marginBottom: "40px" }}>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search any category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              padding: "10px",
              width: "300px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              color: "indigo",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "10px 15px",
              marginLeft: "10px",
              borderRadius: "5px",
              backgroundColor: "indigo",
              color: "white",
              border: "none",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Search
          </button>
        </form>
      </section>

      <section>
        <h2 style={{ color: "indigo", textAlign: "center", marginBottom: "20px" }}>
          Explore Categories
        </h2>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "20px",
            justifyContent: "center",
          }}
        >
          {sections.map((sec, idx) => (
            <Link
              key={idx}
              to={sec.route}
              style={{
                padding: "20px",
                width: "160px",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                border: "1px solid #ddd",
                boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                textAlign: "center",
                color: "indigo",
                textDecoration: "none",
                transition: "0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.05)";
                e.currentTarget.style.backgroundColor = "#e3f2fd";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "#ffffff";
              }}
            >
              {sec.icon && <div style={{ marginBottom: "8px" }}>{sec.icon}</div>}
              {sec.name}
            </Link>
          ))}
        </div>
      </section>

      <footer
        style={{
          marginTop: "60px",
          padding: "20px",
          backgroundColor: "#f0f4f8",
          textAlign: "center",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        <p style={{ fontWeight: "bold", color: "indigo" }}>
          © 2025 SUMARISHMA | All rights reserved.
        </p>
        <div style={{ marginTop: "10px", fontSize: "24px" }}>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: "0 10px", color: "#3b5998" }}
          >
            <FaFacebook />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: "0 10px", color: "#1DA1F2" }}
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ margin: "0 10px", color: "#E1306C" }}
          >
            <FaInstagram />
          </a>
        </div>
      </footer>
    </div>
  );
};

const navStyle = {
  marginRight: "15px",
  textDecoration: "none",
  color: "indigo",
  fontWeight: "bold",
  fontSize: "16px",
  transition: "0.2s",
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/business" element={<Business />} />
        <Route path="/it-skills" element={<ITSkills />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/music" element={<Music />} />
        <Route path="/cooking" element={<Cooking />} />
        <Route path="/fashion" element={<Fashion />} />
        <Route path="/entertainment" element={<Entertainment />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
