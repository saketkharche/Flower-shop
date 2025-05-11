import React, {useEffect, useState} from 'react'
import './Signup.css';
import { Link } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { register } from '../../actions/userActions';
import {useHistory} from 'react-router';
import { toast } from 'react-toastify';

function Signup(props) {


    const userRegister = useSelector(state => state.userRegister);
    const {userInfo} = userRegister
    const dispatch = useDispatch();

    // useEffect(() => {
    //     if(userInfo){
    //         history.push('/login');
    //         // eslint-disable-next-line
    //     }
    // }, [userInfo])

    const [creds, setCreds] = useState({name:'', email:'',password:'', repassword:''});
    // const [isAuth, setIsAuth] = useState(false);
  
    let history = useHistory()
  
    const handleOnChange = (e)=>{
      setCreds({...creds, [e.target.name] : e.target.value})
    }

    const submitForm = (e)=>{
        e.preventDefault();
        const {name, email, password} = creds;
        dispatch(register(name, email, password))
        toast.success(`Account Created Successfully!`, {
            position: "top-right",
          })
    }
    return (
        <div className="Signup-box" style={{ marginTop: "120px" }}>
            <div className="form" onSubmit={submitForm}>
                <form>
                    <ul className="form-container">
                        <li><h2>Create Account</h2></li>
                        <li><label htmlFor="name">Name</label>
                            <input type="name" name="name" id="name" value={creds.name} onChange={handleOnChange} />
                        </li>
                        <li><label htmlFor="email">Email</label>
                            <input type="email" name="email" id="email" value={creds.email} onChange={handleOnChange} />
                        </li>

                        <li><label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" value={creds.password} onChange={handleOnChange} />
                        </li>

                        <li><label htmlFor="rePassword">Re-Enter Password</label>
                            <input type="password" id="repassword" name="repassword" value={creds.repassword} onChange={handleOnChange} />
                        </li>
                        <li><button type="submit" className="bttn primary">Register</button>
                        </li>
                        <li>Already have an account?</li>
                        <li> <Link to="/login" className="bttn-link">Login</Link ></li>
                    </ul>
                </form>
            </div>
        </div>
    )
}

export default Signup;
