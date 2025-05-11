import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function Team() {
  return (
    <div className="my-4">
      <div className="team-section">
        <div className="container">
          <div className="row">
            <div className="section-title">
              <h1>Our Team</h1>
              <p>
                <b>"We deliver the Best."</b>
              </p>
            </div>
          </div>
          <div className="row">
            <div className="team-items">
              <div className="item">
                <img src="images/about/team-1.jpg" alt="team" />
                <div className="inner">
                  <div className="info">
                    <h5>Saket Kharche</h5>
                    <p>Backend</p>
                    <div className="social-links">
                      <Link to="/">
                        <span className="fa fa-facebook"></span>
                      </Link>
                      <Link to="/">
                        <span className="fa fa-twitter"></span>
                      </Link>
                      <Link to="/">
                        <span className="fa fa-linkedin"></span>
                      </Link>
                      <Link to="/">
                        <span className="fa fa-youtube"></span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <img src="images/about/team-4.jpg" alt="team" />
                <div className="inner">
                  <div className="info">
                    <h5>Rohini Borwadkar</h5>
                    <p>FrontEnd</p>
                    <div className="social-links">
                      <Link to="/">
                        <span className="fa fa-facebook"></span>
                      </Link>
                      <Link to="/">
                        <span className="fa fa-twitter"></span>
                      </Link>
                      <Link to="/">
                        <span className="fa fa-linkedin"></span>
                      </Link>
                      <Link to="/">
                        <span className="fa fa-youtube"></span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <img src="images/about/team-3.jpg" alt="team" />
                <div className="inner">
                  <div className="info">
                    <h5>Sheetal Aslekar</h5>
                    <p>Database</p>
                    <div className="social-links">
                      <Link to="/">
                        <span className="fa fa-facebook"></span>
                      </Link>
                      <Link to="/">
                        <span className="fa fa-twitter"></span>
                      </Link>
                      <Link to="/">
                        <span className="fa fa-linkedin"></span>
                      </Link>
                      <Link to="/">
                        <span className="fa fa-youtube"></span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="item">
                <img src="images/about/team-2.jpg" alt="team" />
                <div className="inner">
                  <div className="info">
                    <h5>God Father of Problem Solving</h5>
                    <p>Problem Solver</p>
                    <div className="social-links">
                      <Link to="/">
                        <span className="fa fa-facebook"></span>
                      </Link>
                      <Link to="/">
                        <span className="fa fa-twitter"></span>
                      </Link>
                      <Link to="/">
                        <span className="fa fa-linkedin"></span>
                      </Link>
                      <Link to="/">
                        <span className="fa fa-youtube"></span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Team;
