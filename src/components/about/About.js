import React from "react";
import "./style.css";
import { Link } from "react-router-dom";

function About() {
  return (
    // <div>
    //     <h1>This is about us.</h1>
    // </div>

    <div>
      <section className="about" id="about">
        <h1 className="heading">
          {" "}
          <span> about </span> us{" "}
        </h1>

        <div className="row">
          <div className="video-container">
            <video src="images/home/about-vid.mp4" loop autoPlay muted></video>
            <h3>best flower sellers</h3>
          </div>

          <div className="content">
            <h3>why choose us?</h3>
            <ul>
              <li>
                💐 <strong>Fresh & Handpicked Blooms:</strong> We deliver only
                the freshest flowers sourced daily from trusted growers.
              </li>
              <li>
                🚚 <strong>Same-Day Delivery:</strong> Last-minute surprise?
                We've got you covered with fast and reliable delivery.
              </li>
              <li>
                🎁 <strong>Custom Arrangements:</strong> Tailored bouquets for
                birthdays, weddings, anniversaries, and special events.
              </li>
              <li>
                🌿 <strong>Eco-Friendly Packaging:</strong> Beautiful flowers,
                minimal impact. Sustainability is at our heart.
              </li>
              <li>
                💬 <strong>Excellent Customer Support:</strong> Friendly service
                that’s always here to help you make the perfect choice.
              </li>
            </ul>

            <Link to="/team" className="bttn-link">
              learn more
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
