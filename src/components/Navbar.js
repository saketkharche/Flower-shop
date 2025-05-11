import React, {useEffect} from 'react'
import { Link, useHistory } from "react-router-dom";
import {Link as ScrollLink} from 'react-scroll'
import {useSelector, useDispatch} from 'react-redux';
import { logout } from '../actions/userActions';


function Navbar(props) {
    
    const userSignin = useSelector(state => state.userSignin);
    // const {userInfo} = userSignin;

    // console.log(userInfo); 
    let history = useHistory();
    const dispatch = useDispatch()
    const handleLogout = ()=>{
        
        dispatch(logout());
        history.push('/login')
    }
    
    // useEffect(() => {
    //    if(!userSignin){
    //        history.push('/login')
    //    }
    // },[userSignin]);

    return (
        <div>
            <header>

                <input type="checkbox" name="" id="toggler" />
                <label htmlFor="toggler" className="fas fa-bars"></label>

                <Link to="/" className="logo">Fern & Petals<span>.</span></Link >

                <nav className="navbar">
                <ScrollLink  to="home" spy={true} smooth={false} duration={500}>Home</ScrollLink>
                <ScrollLink  to="about" spy={true} smooth={false} duration={500}>About</ScrollLink>
                <ScrollLink  to="products" spy={true} smooth={false} duration={500}>Products</ScrollLink>
                <ScrollLink  to="review" spy={true} smooth={false} duration={500} >Review</ScrollLink>
                <ScrollLink  to="contact" spy={true} smooth={false} duration={500}>Contact</ScrollLink>
                </nav>

                <div className="icons" style={{textDecoration:'none'}}>
         
                    <Link to="/cart" className="fas fa-shopping-cart"></Link>
                    
                  
                    
                    {!localStorage.getItem('token') ? <Link to="/login" className="fas fa-user"></Link >
                    :
                    (<>
                    <Link to="/profile" className="fas fa-user"></Link >
                    <i className="fa fa-sign-out fa-3x" style={{marginLeft:'1rem', cursor:'pointer'}} onClick={handleLogout}></i>
                    </>)}
                 
                    
                 
                </div>

            </header>


        </div>
    )
}

export default Navbar

