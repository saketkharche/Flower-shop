import React, { useEffect, useState } from 'react';
import './Signup.css';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../actions/userActions';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';

function Signup() {
  const userRegister = useSelector(state => state.userRegister);
  const { userInfo } = userRegister;
  const dispatch = useDispatch();
  const history = useHistory();

  const [creds, setCreds] = useState({
    name: '',
    email: '',
    password: '',
    repassword: ''
  });

  const [errors, setErrors] = useState({});

  const handleOnChange = (e) => {
    setCreds({ ...creds, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

    if (!creds.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!emailRegex.test(creds.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!passwordRegex.test(creds.password)) {
      newErrors.password = "Password must be at least 6 characters and contain letters and numbers";
    }

    if (creds.password !== creds.repassword) {
      newErrors.repassword = "Passwords do not match";
    }

    return newErrors;
  };

  const submitForm = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const { name, email, password } = creds;
      dispatch(register(name, email, password));
      toast.success('Account Created Successfully!', {
        position: "top-right",
      });
      history.push('/login');
    }
  };

  return (
    <div className="Signup-box" style={{ marginTop: "120px" }}>
      <div className="form">
        <form onSubmit={submitForm}>
          <ul className="form-container">
            <li><h2>Create Account</h2></li>

            <li>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={creds.name}
                onChange={handleOnChange}
                className={errors.name ? "input-error" : ""}
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </li>

            <li>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                value={creds.email}
                onChange={handleOnChange}
                className={errors.email ? "input-error" : ""}
              />
              {errors.email && <span className="error">{errors.email}</span>}
            </li>

            <li>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={creds.password}
                onChange={handleOnChange}
                className={errors.password ? "input-error" : ""}
              />
              {errors.password && <span className="error">{errors.password}</span>}
            </li>

            <li>
              <label htmlFor="repassword">Re-Enter Password</label>
              <input
                type="password"
                id="repassword"
                name="repassword"
                value={creds.repassword}
                onChange={handleOnChange}
                className={errors.repassword ? "input-error" : ""}
              />
              {errors.repassword && <span className="error">{errors.repassword}</span>}
            </li>

            <li>
              <button type="submit" className="bttn primary">Register</button>
            </li>

            <li>Already have an account?</li>
            <li>
              <Link to="/login" className="bttn-link">Login</Link>
            </li>
          </ul>
        </form>
      </div>
    </div>
  );
}

export default Signup;
