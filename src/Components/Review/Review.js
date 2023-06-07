import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import ProductSummary from "../ProductSummary/ProductSummary";
import "./Review.css";

const Review = () => {
  const [cart, setCart] = useState(useLoaderData());

//   const key = "id";

//   const uniqueCart = [
//     ...new Map(cart.map((item) => [item[key], item])).values(),
//   ];
// //   setCart(uniqueCart)


  const handleAddToCart = (props) => {
    const newCart = cart.filter((product) => product.id !== props.id);
    setCart(newCart);
    const totalPrice = newCart.reduce((total,price) => {return total = total+(price.quantity*price.price)},0)
    const shippingCharge = newCart.reduce((total,price) => {return total = total+(price.quantity*price.shipping)},0)
    localStorage.setItem("cartLength", JSON.stringify(newCart));
    localStorage.setItem("totalPrice", totalPrice)
    localStorage.setItem("totalShippingCharge",shippingCharge)
  };

  return (
    <div className="shop-container">
      <div className="review-container">
        {cart.length===0 && <h1 className="no-products">No Products! Please shop <Link to="/shop">here</Link></h1>}
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
