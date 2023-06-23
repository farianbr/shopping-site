import React, { useState } from "react";
import { Link } from "react-router-dom";
import ProductSummary from "../ProductSummary/ProductSummary";
import styles from "./Review.module.css";
import { getLocalCartLength, getLocalTotalPrice, getLocalTotalShippingCharge } from "../Shop/Shop";

const Review = () => {
  const [cart, setCart] = useState(getLocalCartLength());
  const [totalCartPrice, setTotalCartPrice] = useState(getLocalTotalPrice())
  const [totalCartShippingCharge, setTotalCartShippingCharge] = useState(getLocalTotalShippingCharge())
  console.log("this is from review", cart);

  const handleAddToCart = (props) => {
    const newCart = cart.filter((product) => product.id !== props.id);
    setCart(newCart);
    const totalPrice = newCart.reduce((total,price) => {return total = total+(price.quantity*price.price)},0)
    setTotalCartPrice(totalPrice)
    const shippingCharge = newCart.reduce((total,price) => {return total = total+(price.quantity*price.shipping)},0)
    setTotalCartShippingCharge(shippingCharge)
    localStorage.setItem("cartLength", JSON.stringify(newCart));
    localStorage.setItem("totalShippingCharge", shippingCharge);
    localStorage.setItem("totalPrice", totalPrice);
  };

  return (
    <div className={styles.shopContainer}>
      <div className={styles.reviewContainer}>
        {cart.length===0 && <h1 className={styles.noProducts}>No Products! Please shop <Link to="/shop">here</Link></h1>}
        {cart.map((product) => (
          <ProductSummary
            key={product.id}
            data={product}
            handleAddToCart={handleAddToCart}
          ></ProductSummary>
        ))}
      </div>
      <div className={styles.orderReview}>
        <h1>Order Review </h1>
        <p>Selected Products: {cart.length}</p>
        <p>Price: ${totalCartPrice}</p>
        <p>Total Shipping Charge: ${totalCartShippingCharge}</p>
        <h3>Grand Total: ${totalCartPrice+totalCartShippingCharge}</h3>
        <Link to="/shop"><button className="btn-review-order">Continue Shopping</button></Link>
        <Link to="/payment"><button className={styles.btnPayment}>Continue to Pay</button></Link>
      </div>
    </div>
  );
};

export default Review;
