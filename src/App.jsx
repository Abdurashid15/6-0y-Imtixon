import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import './App.css';

// Компонент для защиты маршрутов
function ProtectedRoute({ isAuthenticated, children }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? children : null;
}

function App() {
  const [token, setToken] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Проверяем наличие токена и обновляем состояние
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuth(true); // Устанавливаем состояние аутентификации
    } else {
      setIsAuth(false); // Устанавливаем состояние аутентификации, если токена нет
    }
  }, []);

  // Навигация в зависимости от состояния аутентификации и пути
  useEffect(() => {
    if (!isAuth && location.pathname !== '/register') {
      navigate('/login');
    }
  }, [isAuth, location.pathname, navigate]);

  return (
    <div className='container'>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/'
          element={
            <ProtectedRoute isAuthenticated={isAuth}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Error/>} />
      </Routes>
    </div>
  );
}

export default App;
