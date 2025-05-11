import React from 'react'
import './style.css';
import { Link } from "react-router-dom";
import Contact from '../Contact';
import { Review } from '../Review';
import About from '../about/About';


function Home() {
    return (
        <div>

            {/* home section starts */}
            <section className="home" id="home">
                <div className="content">
                    <h3>fresh flowers</h3>
                    <span> natural & beautiful flowers </span>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae laborum ut minus corrupti dolorum dolore assumenda iste voluptate dolorem pariatur.</p>
                    <Link to="/products" className="bttn-link">shop now</Link >
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
                <h1 className="heading"> latest <span>products</span> </h1>
                <div className="box-container">

                    <div className="box">
                        {/* <span className="discount">-10%</span> */}
                        <div className="image">
                            <Link to='/products' className="cart-btn">
                                <img src="images/home/img-1.jpg" alt="" />
                            </Link >
                        </div>
                        <div className="content">
                            <h3>flower pot</h3>
                            <div className="price"> $12.99 <span>$15.99</span> </div>
                        </div>
                    </div>

                    <div className="box">
                        {/* <span className="discount">-15%</span> */}
                        <div className="image">
                            <Link to='/products' className="cart-btn">
                                <img src="images/home/img-2.jpg" alt="" />
                            </Link >
                        </div>
                        <div className="content">
                            <h3>flower pot</h3>
                            <div className="price"> $12.99 <span>$15.99</span> </div>
                        </div>
                    </div>

                    <div className="box">
                        {/* <span className="discount">-10%</span> */}
                        <div className="image">
                            <Link to='/products' className="cart-btn">
                                <img src="images/home/img-8.jpg" alt="" />
                            </Link >
                        </div>
                        <div className="content">
                            <h3>flower pot</h3>
                            <div className="price"> $12.99 <span>$15.99</span> </div>
                        </div>
                    </div>

                    <div className="box">
                        {/* <span className="discount">-5%</span> */}
                        <div className="image">
                            <Link to='/products' className="cart-btn">
                                <img src="images/home/img-9.jpg" alt="" />
                            </Link >
                        </div>
                        <div className="content">
                            <h3>flower pot</h3>
                            <div className="price"> $12.99 <span>$15.99</span> </div>
                        </div>
                    </div>

                </div>
                <div className="">
                    <Link to="/products" className="bttn-link">More Products...</Link >
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
    )
}

export default Home;
