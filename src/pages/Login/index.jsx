import React, { useState, useRef } from 'react';
import styles from "./index.module.css";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FormControlLabel, FormGroup } from '@mui/material';
import IOSSwitch from '../../components/IosStyle';

function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // Добавляем состояние для видимости пароля
  const navigate = useNavigate();
  const nameRef = useRef("");
  const passwordRef = useRef("");

  function validate() {
    return true;
  }

  function handleForm(event) {
    event.preventDefault();

    const isValid = validate();
    if (!isValid) {
      return;
    }

    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };

    setLoading(true);
    fetch("https://auth-rg69.onrender.com/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message === "User Not found.") {
          alert(data.message);
          nameRef.current.focus();
          return;
        }
        if (data.message === "Invalid Password!") {
          alert(data.message);
          passwordRef.current.focus();
          return;
        }
        if (data.accessToken) {
          alert('Success');
          localStorage.setItem('user', JSON.stringify(data));
          localStorage.setItem('token', data.accessToken);
          navigate('/');
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <FormGroup>
      <div className={styles.container}>
        <div className={styles.baseImage}>
          <img src="https://picsum.photos/id/43/1600/1000" alt="" />
        </div>
        <form className={styles.form}>
          <div className={styles.logo}>
            <img src="../../../public/Avatar-UI-Unicorn-V2.svg" alt="" />
            <p>UI Unikor</p>
          </div>
          <h2>Nice to see you again</h2>
          <label htmlFor="Login">Login</label>
          <input className={styles.logininput} ref={nameRef} type="text" placeholder="User name" />
          <label htmlFor="Password">Password</label>
          <div className={styles.passwordContainer}>
            <input
              className={styles.logininput}
              ref={passwordRef}
              type={showPassword ? "text" : "password"}
              placeholder="User Password"
            />
            <button
              type="button"
              className={styles.toggleButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "🙈" : "👁"} 
            </button>
          </div>
          <div className={styles.remember}>
            <FormControlLabel
              control={<IOSSwitch sx={{ m: 1 }} />}
              label="Remember me"
            />
            <Link to='#'>Forgot password?</Link>
          </div>
          {
            loading && <button className={styles.btn} disabled>Loading...</button>
          }
          {
            !loading && <button className={styles.btn} onClick={handleForm}>Login</button>
          }
          <button className={`${styles.btn} ${styles.google}`}><img src="./../../../public/Other-Pay-Method.svg" alt="" />Or sign in with Google</button>
          <div className={styles.account}>
            <span>Don't have an account?</span> <Link to='/register'>Sign up now</Link>
          </div>
        </form>
      </div>
    </FormGroup>
  );
}

export default Login;
