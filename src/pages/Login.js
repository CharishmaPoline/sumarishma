import React, { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [showResetBox, setShowResetBox] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage({ text: "Please enter email and password", color: "#e53935" });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );
      console.log("User logged in:", userCredential.user);
      setMessage({ text: "Login successful ✅ Redirecting...", color: "#4caf50" });
      localStorage.setItem("isLoggedIn", "true");
      setTimeout(() => {
        navigate("/home");
      }, 1500);
    } catch (error) {
      console.error("Login error:", error);
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        setMessage({ text: "Invalid credentials ❌", color: "#e53935" });
      } else {
        setMessage({ text: "Login failed. Try again later.", color: "#e53935" });
      }
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail.trim()) {
      setMessage({ text: "Please enter your email to reset.", color: "#e53935" });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, resetEmail.trim());
      setMessage({ text: "Password reset link sent to your email 📧", color: "#4caf50" });
      setShowResetBox(false);
    } catch (error) {
      console.error("Reset password error:", error);
      setMessage({ text: "Failed to send reset email. Try again.", color: "#e53935" });
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "linear-gradient(to right, #fceabb, #f8b500)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'Poppins', sans-serif",
        padding: "40px",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          borderRadius: "15px",
          padding: "40px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          maxWidth: "420px",
          width: "100%",
          textAlign: "center",
          color: "#4b0082",
        }}
      >
        <h2 style={{ color: "#800080", marginBottom: "30px" }}>
          Login to <span style={{ color: "#6a1b9a" }}>SUMARISHMA</span> App
        </h2>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label style={{ fontWeight: "600", color: "#4b0082" }}>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                marginTop: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "16px",
                boxSizing: "border-box",
                outlineColor: "#6a1b9a",
              }}
            />
          </div>

          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <label style={{ fontWeight: "600", color: "#4b0082" }}>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "12px 15px",
                marginTop: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "16px",
                boxSizing: "border-box",
                outlineColor: "#6a1b9a",
              }}
            />
          </div>

          <div style={{ textAlign: "right", marginBottom: "20px" }}>
            <button
              type="button"
              onClick={() => setShowResetBox(!showResetBox)}
              style={{
                background: "none",
                border: "none",
                color: "#6a1b9a",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            style={{
              backgroundColor: "#6a1b9a",
              color: "white",
              border: "none",
              padding: "14px 0",
              borderRadius: "30px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "18px",
              width: "100%",
              transition: "background-color 0.3s, transform 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.backgroundColor = "#4a148c";
              e.currentTarget.style.transform = "scale(1.05)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#6a1b9a";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            Login
          </button>
        </form>

        {/* Forgot Password Box */}
        {showResetBox && (
          <div style={{ marginTop: "20px", textAlign: "left" }}>
            <label style={{ fontWeight: "600", color: "#4b0082" }}>Reset Email:</label>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter your email"
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "15px",
                outlineColor: "#6a1b9a",
              }}
            />
            <button
              onClick={handleResetPassword}
              style={{
                marginTop: "10px",
                backgroundColor: "#ff9800",
                color: "white",
                border: "none",
                padding: "10px",
                width: "100%",
                borderRadius: "8px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Send Reset Link
            </button>
          </div>
        )}

        {message && (
          <p style={{ marginTop: "25px", color: message.color, fontWeight: "600" }}>
            {message.text}
          </p>
        )}

        <p style={{ marginTop: "25px", fontSize: "16px" }}>
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#800080", fontWeight: "600" }}>
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
