import React, {useState, useEffect} from 'react';
import './Login.css';
import { Link } from "react-router-dom";
import {useHistory} from 'react-router';
import {useDispatch, useSelector} from 'react-redux';
import { login } from '../../actions/userActions';
import { toast } from 'react-toastify';

// import { clearErrors } from '../../actions/errorActions';


function Login(props){

  const [creds, setCreds] = useState({email:'',password:'', isAdmin:false});

  let history = useHistory()

  const handleOnChange = (e)=>{
    setCreds({...creds, [e.target.name] : e.target.value})
  }

  const userSignin = useSelector(state => state.userSignin);
  const {userInfo, isLoggedIn, error, loading} = userSignin
  const dispatch = useDispatch();


  // useEffect(() => {
  //   if(isLoggedIn && userInfo.isAdmin){
  //     toast(`Welcome Admin!`, {
  //       position: "top-right",
  //     })
  //     history.push('/adminDash')
  //   }
  //   else if(isLoggedIn && !userInfo.isAdmin ){
  //     toast.success(`Login SuccessFul!`, {
  //       position: "top-right",
  //     });
  //     history.push('/')
      
  //   }
  //   else{
  //     history.push('/login')
  //   }
  //   //eslint-disable-next-line
  //   return () => {
      
  //   }
  // }, [isLoggedIn])

  // useEffect(() => {
  //   if(localStorage.getItem('token')){
      
  //       history.push('/profile')
  //   }
  //   else{
  //     history.push('/login')
  //   }
  // }, [])
  const handleSubmit = (e)=>{
    e.preventDefault();

    const {email, password} = creds;
    dispatch(login(email, password));

    // const response = await fetch("http://localhost:8080/auth/login",
    // {
    // method:'POST',
    // headers:{
    //   'Content-Type':'application/json'
    // },
    // body:JSON.stringify({email : creds.email,password: creds.password})
    // });
    // const json = await response.json()
    // console.log(json);

    if(userInfo){
      //Save the auth-token and redirect
     
      history.push('/');
    }
    else{
      // alert("Invalid Credentials");
    }

  }


    return (
        <div className="login-box" style={{marginTop:"100px"}}>
            <div className="form">
            <form onSubmit={handleSubmit}>
              <ul className="form-container">
                <li>
                  <h1 className="Signin">Sign-In</h1>
                </li>
                {loading && <li>Loading</li>}
                {error && <li>please enter valid credentials</li>}
                <li>
                  <label htmlFor="email">
                   <b>Email</b> 
                  </label>
                  <input type="email" name="email" id="email" value={creds.email} onChange={handleOnChange} />
                </li>
                <li>
                  <label htmlFor="password"><b>Password</b></label>
                  <input type="password" id="password" name="password" value={creds.password} onChange={handleOnChange} />
                </li>
                <li>
                  <button type="submit" className="bttn" >Sign In</button>
                </li>
                <li>
                  <b>New to Flower website ?</b>
                </li>
                <li>
                    <Link to="/signup" className="bttn-link">Create New Account </Link >
                
                </li>
                <li>{creds.isAuth && <div>Authenticatd</div>}
                </li>
               
              </ul>
            </form>
          </div>
        </div>
    )
}

export default Login