import React, { useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [formData, setFormData] = useState({ year: "", make: "", model: "" });
  const [message, setMessage] = useState(null);

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/api/v1"
      : process.env.REACT_APP_BASE_URL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/cars`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to create car");
      }
      setMessage("Car created successfully!");
      setFormData({ year: "", make: "", model: "" }); // Reset form
    } catch (err) {
      setMessage(err.message || "Unexpected error occurred.");
    }
  };

  const styles = {
    container: {
      textAlign: "center",
      backgroundColor: "#282c34",
      minHeight: "100vh",
      color: "white",
      padding: "20px",
    },
    header: {
      fontSize: "2rem",
      marginBottom: "20px",
    },
    form: {
      margin: "20px 0",
      padding: "15px",
      backgroundColor: "#3b3f45",
      borderRadius: "5px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    input: {
      display: "block",
      width: "80%",
      margin: "10px auto",
      padding: "10px",
      fontSize: "1rem",
      borderRadius: "4px",
      border: "1px solid #ccc",
    },
    button: {
      padding: "10px 20px",
      fontSize: "1rem",
      backgroundColor: "#61dafb",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    message: {
      margin: "20px 0",
      color: "#61dafb",
    },
    link: {
      marginTop: "20px",
      fontSize: "1rem",
      color: "#61dafb",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <header>
        <h1 style={styles.header}>Add a New Car</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            name="year"
            placeholder="Year"
            value={formData.year}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="text"
            name="make"
            placeholder="Make"
            value={formData.make}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={formData.model}
            onChange={handleChange}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Add Car
          </button>
        </form>

        {message && <p style={styles.message}>{message}</p>}

        <Link to="/" style={styles.link}>
          Back to Car List
        </Link>
      </header>
    </div>
  );
}

export default Dashboard;
