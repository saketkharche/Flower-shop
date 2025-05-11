import React, { useState, useEffect } from 'react';
import './Login.css';
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/userActions';
import { toast } from 'react-toastify';

function Login() {
  const [creds, setCreds] = useState({ email: '', password: '', isAdmin: false });
  const history = useHistory();
  
  const handleOnChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo, isLoggedIn, error, loading } = userSignin;
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = creds;
    dispatch(login(email, password)); // Dispatch login action
  };

  useEffect(() => {
    if (userInfo) {
      // Successful login, redirect based on user role
      toast.success('Login Successful!', {
        position: "top-right",
      });
      if (userInfo.isAdmin) {
        history.push('/adminDash');
      } else {
        history.push('/');
      }
    } else if (error) {
      // Invalid credentials, show error toast
      toast.error('Invalid Credentials', {
        position: "top-right",
      });
    }
  }, [userInfo, error, history]);

  return (
    <div className="login-box" style={{ marginTop: "100px" }}>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <ul className="form-container">
            <li>
              <h1 className="Signin">Sign-In</h1>
            </li>
            {loading && <li>Loading</li>}
            {error && <li>Please enter valid credentials</li>}
            <li>
              <label htmlFor="email"><b>Email</b></label>
              <input type="email" name="email" id="email" value={creds.email} onChange={handleOnChange} />
            </li>
            <li>
              <label htmlFor="password"><b>Password</b></label>
              <input type="password" id="password" name="password" value={creds.password} onChange={handleOnChange} />
            </li>
            <li>
              <button type="submit" className="bttn">Sign In</button>
            </li>
            <li>
              <b>New to Flower website?</b>
            </li>
            <li>
              <Link to="/signup" className="bttn-link">Create New Account</Link>
            </li>
            <li>{creds.isAuth && <div>Authenticated</div>}</li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default Login;
