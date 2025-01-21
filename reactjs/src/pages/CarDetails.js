import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ year: "", make: "", model: "" });

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/api/v1"
      : process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchCar = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE}/cars/${id}`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setCar(data);
        setFormData({ year: data.year, make: data.make, model: data.model });
      } catch (err) {
        setError(err.message || "Unexpected Error");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id, API_BASE]);

  const handleDelete = async () => {
    try {
      const response = await fetch(`${API_BASE}/cars/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete car");
      }
      navigate("/dashboard"); // Redirect to the dashboard after deletion
    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE}/cars/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Failed to update car");
      }
      const updatedCar = await response.json();
      setCar(updatedCar);
      alert("Car updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    carInfo: {
      marginBottom: "20px",
      padding: "10px",
      backgroundColor: "#3b3f45",
      borderRadius: "5px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
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
      margin: "10px 5px",
      cursor: "pointer",
      border: "none",
      borderRadius: "5px",
    },
    updateButton: {
      backgroundColor: "#61dafb",
      color: "white",
    },
    deleteButton: {
      backgroundColor: "#dc3545",
      color: "white",
    },
    link: {
      marginTop: "20px",
      display: "block",
      textDecoration: "none",
      color: "#61dafb",
    },
  };

  return (
    <div style={styles.container}>
      <header>
        <h1 style={styles.header}>Car Details</h1>
        {loading && <p>Loading car details...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {car && (
          <div style={styles.carInfo}>
            <h2>
              {car.year} {car.make} {car.model}
            </h2>
            <p>Year: {car.year}</p>
            <p>Make: {car.make}</p>
            <p>Model: {car.model}</p>
          </div>
        )}

        {/* Update Form */}
        <form onSubmit={handleUpdate} style={styles.form}>
          <h2>Update Car</h2>
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
          <button
            type="submit"
            style={{ ...styles.button, ...styles.updateButton }}
          >
            Update Car
          </button>
        </form>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          style={{ ...styles.button, ...styles.deleteButton }}
        >
          Delete Car
        </button>

        {/* Navigation Back */}
        <Link to="/dashboard" style={styles.link}>
          Back to Dashboard
        </Link>
      </header>
    </div>
  );
}

export default CarDetails;
