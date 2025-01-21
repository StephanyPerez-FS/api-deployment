import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_BASE =
    process.env.NODE_ENV === "development"
      ? "http://localhost:8000/api/v1"
      : process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const fetchCars = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE}/cars`);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.json();
        setCars(data);
      } catch (err) {
        setError(err.message || "Unexpected Error");
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [API_BASE]);

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
    carList: {
      listStyleType: "none",
      padding: "0",
      margin: "20px auto",
      width: "80%",
      maxWidth: "600px",
    },
    carItem: {
      backgroundColor: "#3b3f45",
      margin: "10px 0",
      padding: "15px",
      borderRadius: "5px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    carLink: {
      color: "#61dafb",
      textDecoration: "none",
    },
    dashboardLink: {
      display: "block",
      marginTop: "20px",
      fontSize: "1rem",
      color: "#61dafb",
      textDecoration: "none",
    },
  };

  return (
    <div style={styles.container}>
      <header>
        <h1 style={styles.header}>Car List</h1>

        {/* Loading and Error Messages */}
        {loading && <p>Loading cars...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Display Car List */}
        {!loading && !error && cars.length > 0 ? (
          <ul style={styles.carList}>
            {cars.map((car) => (
              <li key={car._id} style={styles.carItem}>
                <Link to={`/car/${car._id}`} style={styles.carLink}>
                  {car.year} {car.make} {car.model}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          !loading && <p>No cars available</p>
        )}

        {/* Link to Dashboard */}
        <Link to="/dashboard" style={styles.dashboardLink}>
          Add a New Car
        </Link>
      </header>
    </div>
  );
}

export default Home;
