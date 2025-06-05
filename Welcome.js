import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.gif"; // Make sure the path is correct

const Welcome = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to right, #fceabb, #f8b500)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
        padding: "40px",
        color: "#4b0082",
      }}
    >
      <img
        src={logo}
        alt="Welcome Logo"
        style={{
          width: "160px",
          height: "160px",
          borderRadius: "50%",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
          marginBottom: "20px",
        }}
      />

      <h1 style={{ fontSize: "48px", marginBottom: "10px" }}>
        Welcome to <span style={{ color: "#800080" }}>SUMARISHMA</span> 🌟
      </h1>

      <p style={{ fontSize: "20px", maxWidth: "600px", marginBottom: "40px" }}>
        A colorful world of knowledge & creativity! Dive into Business, IT,
        Jobs, Music, Cooking, Fashion, and more.
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {/* Explore (goes to login first) */}
        <Link
          to="/login"
          style={buttonStyle("#6a1b9a", "#4a148c")}
        >
          🌐 Explore
        </Link>

        {/* Register */}
        <Link
          to="/register"
          style={buttonStyle("#ff4081", "#c2185b")}
        >
          ✍️ Register
        </Link>

        {/* Login */}
        <Link
          to="/login"
          style={buttonStyle("#00bcd4", "#008ba3")}
        >
          🔐 Login
        </Link>
      </div>

      <footer style={{ marginTop: "60px", fontSize: "14px", color: "#333" }}>
        <p>© 2025 SUMARISHMA | Crafted with ❤️</p>
      </footer>
    </div>
  );
};

// 🔧 Button Style Helper Function
function buttonStyle(baseColor, hoverColor) {
  return {
    backgroundColor: baseColor,
    color: "white",
    padding: "12px 24px",
    borderRadius: "30px",
    textDecoration: "none",
    fontWeight: "bold",
    boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
    transition: "all 0.3s",
    display: "inline-block",
    onMouseOver: (e) => {
      e.currentTarget.style.backgroundColor = hoverColor;
      e.currentTarget.style.transform = "scale(1.05)";
    },
    onMouseOut: (e) => {
      e.currentTarget.style.backgroundColor = baseColor;
      e.currentTarget.style.transform = "scale(1)";
    },
  };
}

export default Welcome;
