import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";
import CarsService from "../services/cars.service";

function Home() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user && user.token) {
      CarsService.getAllPrivateCars().then(
        (response) => {
          console.log("API Response:", response.data);
          setCars(response.data);
        },
        (error) => {
          console.error("Secured Page Error: ", error.response);

          if (error.response && error.response.status === 401) {
            AuthService.logout();
            navigate("/signup");
          }
        }
      );
    } else {
      console.warn("No user token found, redirecting to login.");
      navigate("/signup");
    }
  }, []);

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
        {!loading && !error && Array.isArray(cars) && cars.length > 0 ? (
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
        <Link to="/login" style={styles.dashboardLink}>
          Log in
        </Link>
        <Link to="/signup" style={styles.dashboardLink}>
          Sign Up
        </Link>
      </header>
    </div>
  );
}

export default Home;
