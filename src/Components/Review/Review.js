import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import ProductSummary from "../ProductSummary/ProductSummary";
import styles from "./Review.module.css";
import { getLocalTotalPrice, getLocalTotalShippingCharge } from "../Shop/Shop";

const Review = () => {
  const [cart, setCart] = useState(useLoaderData());
  const [totalCartPrice, setTotalCartPrice] = useState(getLocalTotalPrice())
  const [totalCartShippingCharge, setTotalCartShippingCharge] = useState(getLocalTotalShippingCharge())
  console.log("this is from review", cart);

//   const key = "id";

//   const uniqueCart = [
//     ...new Map(cart.map((item) => [item[key], item])).values(),
//   ];
// //   setCart(uniqueCart)

  console.log("this is cart", cart);

  const handleAddToCart = (props) => {
<<<<<<< Updated upstream
    // console.log("this is props", props);
=======

>>>>>>> Stashed changes
    const newCart = cart.filter((product) => product.id !== props.id);
    // console.log("this is newCart", newCart);
    setCart(newCart);
<<<<<<< Updated upstream
=======
    const totalPrice = newCart.reduce((total,price) => {return total = total+(price.quantity*price.price)},0)
    setTotalCartPrice(totalPrice)
    const shippingCharge = newCart.reduce((total,price) => {return total = total+(price.quantity*price.shipping)},0)
    setTotalCartShippingCharge(shippingCharge)
>>>>>>> Stashed changes
    localStorage.setItem("cartLength", JSON.stringify(newCart));
    // console.log("this is after set cart", cart);
    // console.log("this is after set newCart", newCart);
  };

  const handlePayment = () => {

  }

  return (
<<<<<<< Updated upstream
    <div className="shop-container">
      <div className="review-container">
=======
    <div className={styles.shopContainer}>
      <div className={styles.reviewContainer}>
        {cart.length===0 && <h1 className={styles.noProducts}>No Products! Please shop <Link to="/shop">here</Link></h1>}
>>>>>>> Stashed changes
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
        {/* <button onClick={handlePayment} className={styles.btnPayment}>
          Continue to Pay
        </button> */}
      </div>
    </div>
  );
};

export default Review;
