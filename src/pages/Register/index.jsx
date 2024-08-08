import React, { useRef, useState } from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Register() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 
  const [showRePassword, setShowRePassword] = useState(false); 

  const navigate = useNavigate();
  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const repasswordRef = useRef("");

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
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    setLoading(true);
    fetch("https://auth-rg69.onrender.com/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Failed! Username is already in use!") {
          alert(data.message);
          nameRef.current.focus();
          return;
        }
        if (data.message === "Failed! Email is already in use!") {
          alert(data.message);
          emailRef.current.focus();
          return;
        }
        if (data.message === "User registered successfully!") {
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', 'your-token');
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.baseImage}>
          <img src="https://picsum.photos/id/170/1600/1000" alt="" srcSet="" />
        </div>
        <form className={styles.form}>
          <div className={styles.logo}>
            <img src="../../../public/Avatar-UI-Unicorn-V2.svg" alt="" />
            <p>UI Unikor</p>
          </div>
          <label htmlFor="Username">Username</label>
          <input className={styles.logininput} ref={nameRef} type="text" placeholder="User name" />
          <label htmlFor="Email">Email</label>
          <input className={styles.logininput} ref={emailRef} type="email" placeholder="User Email" />
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
          <label htmlFor="Reapet password">Reapet password</label>
          <div className={styles.passwordContainer}>
            <input
              className={styles.logininput}
              ref={repasswordRef}
              type={showRePassword ? "text" : "password"}
              placeholder="Repeat Password"
            />
            <button
              type="button"
              className={styles.toggleButton}
              onClick={() => setShowRePassword(!showRePassword)}
            >
              {showRePassword ? "🙈" : "👁"}
            </button>
          </div>

          {loading && <button className={styles.btn} disabled>Loading...</button>}
          {!loading && <button className={styles.btn} onClick={handleForm}>Register</button>}
          <Link to='/login'>Login</Link>
        </form>
      </div>
    </>
  );
}

export default Register;
