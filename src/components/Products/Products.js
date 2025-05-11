import "./Product.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  searchProducts,
  filterProducts,
  listProducts,
} from "../../actions/productActions";

export const Products = () => {
  const [filter, setFilter] = useState("");
  const [search, setSearch] = useState("");

  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(search);
    dispatch(searchProducts(search));
  };
  // useEffect(() => {
  //     dispatch(listProducts());

  // }, [])

  useEffect(() => {
    // eslint-disable-next-line
  }, [filter, search]);

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>{error}</div>
  ) : (
    <div style={{ marginTop: "120px" }}>
      <div>
        <h2 className="text-center m-4">Products Page</h2>
        <div className="search-filter">
          <div className="mx-4">
            <form className="form-inline form" onSubmit={handleSearch}>
              <div className="form-group mx-sm-3 mb-2">
                <label htmlFor="search" className="sr-only">
                  Search
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="search"
                  name="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="search"
                />
              </div>
              <button
                type="button"
                className="btn btn-primary rounded-pill mb-2"
              >
                Search
              </button>
            </form>
          </div>

          <div className="mx-2">
            <select
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                dispatch(filterProducts(e.target.value));
              }}
            >
              <option>Select Filters..</option>
              <option value="oldProduct"> Old Products</option>
              <option value="newProduct"> New Products</option>
              <option value="lowPrice"> Price Low To High</option>
              <option value="highPrice"> Price High To Low</option>
            </select>
          </div>
        </div>
      </div>
      <section className="products" id="products">
        {/* <h1 className="heading"> latest <span>products</span> </h1> */}

        <div className="box-container">
          {products.map((ele) => {
            return (
              <div className="box" key={ele._id}>
                <span className="discount">-10%</span>
                <div className="image">
                  <Link to={`/product/${ele._id}`} className="cart-btn">
                    <img src={ele.image} alt="" />
                  </Link>

                  {/* <div className="icons">
                                            <Link to="/" className="fas fa-heart">{ele.price}</Link >
                                            <Link to={`/product/${ele._id}`} className="cart-btn">Detail...</Link >
                                            <Link to="/" className="fas fa-share"></Link >
                                        </div> */}
                </div>
                <div className="content">
                  <h3>{ele.name}</h3>
                  <div className="price">
                    {" "}
                    ₹{ele.price} <span>₹250</span>{" "}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
