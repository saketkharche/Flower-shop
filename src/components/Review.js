import React from "react";

export const Review = () => {
  return (
    <div>
      <section className="review" id="review">
        <h1 className="heading">
          {" "}
          customer's <span> review</span>{" "}
        </h1>

        <div className="box-container">
          <div className="box">
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <p>
              Fern & Petals made my anniversary extra special. The custom floral
              design was stunning, and my wife loved it! Will definitely order
              again.
            </p>
            <div className="user">
              <img src="images/home/pic-1.png" alt="" />
              <div className="user-info">
                <h3>Prinyanka Chopra</h3>
                <span>happy customer</span>
              </div>
            </div>
            <span className="fas fa-quote-right"></span>
          </div>

          <div className="box">
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <p>
              Absolutely beautiful bouquet! The flowers were fresh and fragrant,
              and the arrangement looked exactly like the picture. Delivery was
              right on time too!
            </p>
            <div className="user">
              <img src="images/home/pic-2.png" alt="" />
              <div className="user-info">
                <h3>Hritik Roshan</h3>
                <span>happy customer</span>
              </div>
            </div>
            <span className="fas fa-quote-right"></span>
          </div>

          <div className="box">
            <div className="stars">
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
              <i className="fas fa-star"></i>
            </div>
            <p>
              Super impressed with their fast delivery and eco-friendly
              packaging. The flowers stayed fresh for over a week. Great
              customer service as well!
            </p>
            <div className="user">
              <img src="images/home/pic-3.png" alt="" />
              <div className="user-info">
                <h3>Allu Arjun</h3>
                <span>happy customer</span>
              </div>
            </div>
            <span className="fas fa-quote-right"></span>
          </div>
        </div>
      </section>
    </div>
  );
};
