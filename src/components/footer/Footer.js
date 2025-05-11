import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="container2">
      <section className="footer">
        <div className="box-container">
          <div className="box">
            <h3>quick links</h3>
            <Link to="/">home</Link>
            <Link to="/">about</Link>
            <Link to="/">products</Link>
            <Link to="/">review</Link>
            <Link to="/">contact</Link>
          </div>

          <div className="box">
            <h3>extra links</h3>
            <Link to="/">my account</Link>
            <Link to="/">my order</Link>
            <Link to="/">my favorite</Link>
          </div>

          <div className="box">
            <h3>locations</h3>
            <Link to="/">Mumbai</Link>
            <Link to="/">Pune</Link>
            <Link to="/">Nagpur</Link>
            <Link to="/">Buldhana</Link>
          </div>

          <div className="box">
            <h3>contact info</h3>
            <Link to="/">+91 1234567890</Link>
            <Link to="/">Fern&Petals@gmail.com</Link>
            <Link to="/">mumbai, india - 400104</Link>
            {/* <img src="images/home/payment.png" alt="" /> */}
          </div>
        </div>

        <div className="credit">
          {" "}
          created by <span> WPT Team 43 </span> | all rights reserved{" "}
        </div>
      </section>
    </div>
  );
}

export default Footer;
