import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductSummary from "../ProductSummary/ProductSummary";
import "./Review.css";

const Review = () => {
  const [cart, setCart] = useState(useLoaderData());

//   const key = "id";

//   const uniqueCart = [
//     ...new Map(cart.map((item) => [item[key], item])).values(),
//   ];
// //   setCart(uniqueCart)

  console.log("this is cart", cart);

  const handleAddToCart = (props) => {
    // console.log("this is props", props);
    const newCart = cart.filter((product) => product.id !== props.id);
    // console.log("this is newCart", newCart);
    setCart(newCart);
    localStorage.setItem("cartLength", JSON.stringify(newCart));
    // console.log("this is after set cart", cart);
    // console.log("this is after set newCart", newCart);
  };

  return (
    <div className="shop-container">
      <div className="review-container">
        {cart.map((product) => (
          <ProductSummary
            key={product.id}
            data={product}
            handleAddToCart={handleAddToCart}
          ></ProductSummary>
        ))}
      </div>
      <div className="order-review">
        <h1>Order Summary </h1>
        <p>Selected items: {cart.length}</p>
        <p>Price: ${ cart.reduce((total,item)=>total = total+(item.price*item.quantity),0) }</p>
        <p>Total Shipping Charge: ${cart.reduce((total,item)=>total = total + (item.shipping*item.quantity),0)}</p>
        <h3>Grand Total: ${ }</h3>
        {/* <button onClick={clearCart} className="clear-cart">
          Clear Cart
        </button> */}
      </div>
    </div>
  );
};

export default Review;
