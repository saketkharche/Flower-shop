import React from "react";
import "./style.css";
import { Link } from "react-router-dom";
import Contact from "../Contact";
import { Review } from "../Review";
import About from "../about/About";

function Home() {
  return (
    <div>
      {/* home section starts */}
      <section className="home" id="home">
        <div className="content">
          <h3>Fern & Petals</h3>
          <span> natural & beautiful flowers </span>
          <p>
            Welcome to Fern & Petals – where every bloom tells a story. We offer
            handpicked, fresh flowers crafted into beautiful arrangements for
            every occasion. Whether it's a birthday, anniversary, or just
            because, let your emotions blossom with us.
          </p>

          <Link to="/products" className="bttn-link">
            shop now
          </Link>
        </div>
      </section>
      {/* home section ends  */}

      {/* about section starts   */}
      <About />
      {/* about section ends  */}

      {/* icons section starts   */}
      <section className="icons-container">
        <div className="icons">
          <img src="images/home/icon-1.png" alt="" />
          <div className="info">
            <h3>free delivery</h3>
            <span>on all orders</span>
          </div>
        </div>

        <div className="icons">
          <img src="images/home/icon-2.png" alt="" />
          <div className="info">
            <h3>10 days returns</h3>
            <span>moneyback guarantee</span>
          </div>
        </div>

        <div className="icons">
          <img src="images/home/icon-3.png" alt="" />
          <div className="info">
            <h3>offer & gifts</h3>
            <span>on all orders</span>
          </div>
        </div>

        <div className="icons">
          <img src="images/home/icon-4.png" alt="" />
          <div className="info">
            <h3>secure paymens</h3>
            <span>protected by paypal</span>
          </div>
        </div>
      </section>
      {/* <!-- icons section ends --> */}

      {/* <!-- products section starts  --> */}

      <section className="products" id="products">
        <h1 className="heading">
          {" "}
          latest <span>products</span>{" "}
        </h1>
        <div className="box-container">
          <div className="box">
            {/* <span className="discount">-10%</span> */}
            <div className="image">
              <Link to="/products" className="cart-btn">
                <img src="images/home/img-1.jpg" alt="" />
              </Link>
            </div>
            <div className="content">
              <h3>Rose pot</h3>
              <div className="price">
                {" "}
                ₹750 <span>₹1500</span>{" "}
              </div>
            </div>
          </div>

          <div className="box">
            {/* <span className="discount">-15%</span> */}
            <div className="image">
              <Link to="/products" className="cart-btn">
                <img src="images/home/img-2.jpg" alt="" />
              </Link>
            </div>
            <div className="content">
              <h3>Lilly pot</h3>
              <div className="price">
                {" "}
                ₹1299 <span>₹1599</span>{" "}
              </div>
            </div>
          </div>

          <div className="box">
            {/* <span className="discount">-10%</span> */}
            <div className="image">
              <Link to="/products" className="cart-btn">
                <img src="images/home/img-8.jpg" alt="" />
              </Link>
            </div>
            <div className="content">
              <h3>Tulip pot</h3>
              <div className="price">
                {" "}
                ₹299 <span>₹599</span>{" "}
              </div>
            </div>
          </div>

          <div className="box">
            {/* <span className="discount">-5%</span> */}
            <div className="image">
              <Link to="/products" className="cart-btn">
                <img src="images/home/img-9.jpg" alt="" />
              </Link>
            </div>
            <div className="content">
              <h3>Lotus pot</h3>
              <div className="price">
                {" "}
                ₹399 <span>₹699</span>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <Link to="/products" className="bttn-link">
            More Products...
          </Link>
        </div>
      </section>
      {/* <!-- products section ends --> */}

      {/* <!-- review section starts  --> */}
      <Review />
      {/* <!-- review section ends --> */}

      {/* <!-- contact section starts  --> */}
      <Contact />
      {/* <!-- contact section ends --> */}
    </div>
  );
}

export default Home;
