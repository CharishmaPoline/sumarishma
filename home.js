import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaBriefcase, FaLaptopCode, FaBuilding } from "react-icons/fa"; // icons
import logo from "./assets/logo.png.png";

const sections = [
  {
    name: "Business",
    route: "/business",
    icon: <FaBriefcase size={26} />,
  },
  {
    name: "IT Skills",
    route: "/it-skills",
    icon: <FaLaptopCode size={26} />,
  },
  {
    name: "Jobs",
    route: "/jobs",
    icon: <FaBuilding size={26} />,
  },
  {
    name: "Music",
    route: "/music",
    icon: null, // Add icons if you want
  },
  {
    name: "Cooking",
    route: "/cooking",
    icon: null,
  },
  {
    name: "Fashion",
    route: "/fashion",
    icon: null,
  },
  {
    name: "Entertainment",
    route: "/entertainment",
    icon: null,
  },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const lower = searchTerm.toLowerCase();
    const match = sections.find((sec) =>
      sec.name.toLowerCase().includes(lower)
    );

    if (match) {
      navigate(match.route);
    } else {
      alert(`No results found for "${searchTerm}"`);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        background: "linear-gradient(to bottom right, #e0f7fa, #f0f4f8)",
        minHeight: "100vh",
        padding: "20px",
        textAlign: "center",
      }}
    >
      <header style={{ marginBottom: "30px" }}>
        <h1 style={{ fontSize: "36px", fontWeight: "bold", color: "indigo" }}>
          WELCOME TO SUMARISHMA
        </h1>
      </header>

      <form onSubmit={handleSearch} style={{ marginBottom: "30px" }}>
        <input
          type="text"
          placeholder="Search all topics..."
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
            transition: "background-color 0.3s, transform 0.2s",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#4b0082";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "indigo";
            e.currentTarget.style.transform = "scale(1)";
          }}
        >
          Search
        </button>
      </form>

      <section>
        <h2
          style={{
            color: "indigo",
            marginBottom: "20px",
            fontSize: "24px",
          }}
        >
          Explore Categories
        </h2>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {sections.map((sec, index) => (
            <div
              key={index}
              onClick={() => navigate(sec.route)}
              style={{
                border: "1px solid #ddd",
                borderRadius: "12px",
                padding: "20px",
                width: "160px",
                textAlign: "center",
                cursor: "pointer",
                color: "indigo",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                transition: "transform 0.2s, background-color 0.3s, box-shadow 0.3s",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = "scale(1.07)";
                e.currentTarget.style.backgroundColor = "#e3f2fd";
                e.currentTarget.style.boxShadow =
                  "0 6px 12px rgba(0, 0, 0, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.boxShadow =
                  "0 4px 8px rgba(0, 0, 0, 0.1)";
              }}
            >
              <div style={{ fontSize: "28px", marginBottom: "8px" }}>
                {sec.icon}
              </div>
              {sec.name}
            </div>
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
          color: "indigo",
        }}
      >
        <p style={{ fontWeight: "bold" }}>
          © 2025 SUMARISHMA | All rights reserved.
        </p>
        <p>
          Follow us on{" "}
          <a href="#" style={{ color: "indigo", textDecoration: "underline" }}>
            Facebook
          </a>{" "}
          |{" "}
          <a href="#" style={{ color: "indigo", textDecoration: "underline" }}>
            Twitter
          </a>{" "}
          |{" "}
          <a href="#" style={{ color: "indigo", textDecoration: "underline" }}>
            Instagram
          </a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
