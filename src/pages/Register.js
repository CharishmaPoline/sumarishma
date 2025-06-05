// src/pages/Register.js
import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      setMessage("Verification email sent! Redirecting to login...");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to right, #fceabb, #f8b500)",  // from Welcome.js
        overflow: "hidden",
        fontFamily: "'Poppins', sans-serif",
        color: "#4b0082",  // deep purple color from Welcome.js
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px",
        textAlign: "center",
      }}
    >
      {/* Blinking background texts */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignContent: "space-around",
          padding: "40px",
          gap: "30px",
          userSelect: "none",
        }}
      >
        {[...Array(30)].map((_, i) => (
          <span
            key={i}
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "rgba(75, 0, 130, 0.07)", // subtle deep purple from Welcome.js color (#4b0082)
              animation: `blink 4s ease-in-out infinite`,
              animationDelay: `${(i % 10) * 0.5}s`,
              textShadow: "0 0 6px rgba(255,255,255,0.5)",
            }}
          >
            SUMARISHMA
          </span>
        ))}
      </div>

      {/* Form container with warm pastel background */}
      <div
        style={{
          position: "relative",
          maxWidth: "420px",
          width: "100%",
          padding: "40px",
          borderRadius: "20px",
          backgroundColor: "rgba(252, 234, 187, 0.85)", // light warm pastel with opacity, from background base
          boxShadow: "0 8px 30px rgba(248, 181, 0, 0.35)", // warm yellow shadow, matching background
          backdropFilter: "blur(15px)",
          zIndex: 1,
          color: "#4b0082",
        }}
      >
        <h2 style={{ marginBottom: "30px", fontWeight: "800", fontSize: "2.4rem" }}>
          Register
        </h2>
        <form onSubmit={handleRegister}>
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "25px",
              borderRadius: "12px",
              border: "1.8px solid #d1b3e0",
              fontSize: "18px",
              outline: "none",
              backgroundColor: "#fff8e1", // soft warm cream
              color: "#4b0082",
              boxShadow: "inset 0 0 8px rgba(248, 181, 0, 0.3)",
            }}
          />
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "15px",
              marginBottom: "35px",
              borderRadius: "12px",
              border: "1.8px solid #d1b3e0",
              fontSize: "18px",
              outline: "none",
              backgroundColor: "#fff8e1",
              color: "#4b0082",
              boxShadow: "inset 0 0 8px rgba(248, 181, 0, 0.3)",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "16px",
              backgroundColor: "#6a1b9a", // purple button from Welcome.js Explore button
              border: "none",
              borderRadius: "30px",
              fontSize: "20px",
              fontWeight: "700",
              color: "white",
              cursor: "pointer",
              transition: "background-color 0.3s ease, transform 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#4a148c"; // hover color from Welcome.js
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#6a1b9a";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Register
          </button>
        </form>
        {message && (
          <p style={{ marginTop: "20px", fontWeight: "600", color: "#b54887" }}>
            {message}
          </p>
        )}
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.1; }
        }
      `}</style>
    </div>
  );
};

export default Register;
