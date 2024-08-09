import React, { useState, useEffect } from 'react';
import styles from './index.module.css';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [cars, setCars] = useState([]);
  const [newCar, setNewCar] = useState({ model: '', year: '', color: '' });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const savedCars = JSON.parse(localStorage.getItem('cars')) || [];
      setCars(savedCars);

      const userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
    }
  }, [navigate]);

  function handleLogout(event) {
    event.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewCar((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddCar(event) {
    event.preventDefault();
    if (newCar.model || newCar.year || newCar.color) {
      const updatedCars = [...cars, newCar];
      setCars(updatedCars);
      localStorage.setItem('cars', JSON.stringify(updatedCars));
      setNewCar({ model: '', year: '', color: '' });
    }
  }

  function handleRemoveCar(index) {
    const updatedCars = cars.filter((_, i) => i !== index);
    setCars(updatedCars);
    localStorage.setItem('cars', JSON.stringify(updatedCars));
  }

  return (
    <div className={styles.container}>
      <h1>Home Page</h1>
      <button className={styles.btn} onClick={handleLogout}>Logout</button>

      {user && (
        <div className={styles.profile}>
          <h2>User Profile</h2>
          {user.imagePath && (
            <img
              src={user.imagePath}
              alt="Profile"
              className={styles.profileImage}
            />
          )}
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      )}

      <h2>Car Survey</h2>
      <form onSubmit={handleAddCar} className={styles.form}>
        <input
          type="text"
          name="model"
          value={newCar.model}
          placeholder="Car Model"
          onChange={handleChange}
        />
        <input
          type="number"
          name="year"
          value={newCar.year}
          placeholder="Car Year"
          onChange={handleChange}
        />
        <input
          type="text"
          name="color"
          value={newCar.color}
          placeholder="Car Color"
          onChange={handleChange}
        />
        <button className={styles.btn} type="submit">Add Car</button>
      </form>

      <div className={styles.cardsContainer}>
        {cars.map((car, index) => (
          <div key={index} className={styles.card}>
            <h3>{car.model}</h3>
            <p>Year: {car.year}</p>
            <p>Color: {car.color}</p>
            <button className={styles.btn} onClick={() => handleRemoveCar(index)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
