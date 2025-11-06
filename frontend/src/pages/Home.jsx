import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0072ff, #00c6ff)",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          marginBottom: "10px",
          animation: "float 3s ease-in-out infinite",
        }}
      >
        🍽️ FoodieAI
      </h1>

      <p
        style={{
          fontSize: "1.2rem",
          maxWidth: "600px",
          marginBottom: "40px",
        }}
      >
        AI-powered restaurant assistant that helps customers decide what to eat
        and enables restaurant owners to create professional menu content in
        seconds.
      </p>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        <Link to="/chat">
          <button
            style={{
              background: "#fff",
              color: "#0072ff",
              padding: "12px 28px",
              borderRadius: "10px",
              fontWeight: "600",
              fontSize: "1rem",
              border: "none",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Customer Chat (QR)
          </button>
        </Link>

        <Link to="/admin">
          <button
            style={{
              background: "#fff",
              color: "#0072ff",
              padding: "12px 28px",
              borderRadius: "10px",
              fontWeight: "600",
              fontSize: "1rem",
              border: "none",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Admin Dashboard
          </button>
        </Link>
      </div>

      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
}


