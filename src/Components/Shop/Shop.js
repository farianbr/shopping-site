import React, { useEffect, useState } from "react";
import "./Shop.css";
import Products from "../Products/Products";
import { Link } from "react-router-dom";

export const getLocalCartLength = () => {
  let cartLengthDb = localStorage.getItem("cartLength");

  if (cartLengthDb) {
    return JSON.parse(localStorage.getItem("cartLength"));
  } else {
    return [];
  }
};
export const getLocalTotalPrice = () => {
  let LocalTotalPrice = localStorage.getItem("totalPrice");

  if (LocalTotalPrice) {
    return JSON.parse(localStorage.getItem("totalPrice"));
  } else {
    return 0;
  }
};
export const getLocalTotalShippingCharge = () => {
  let LocalTotalShippingCharge = localStorage.getItem("totalShippingCharge");

  if (LocalTotalShippingCharge) {
    return JSON.parse(localStorage.getItem("totalShippingCharge"));
  } else {
    return 0;
  }
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(getLocalCartLength());
  const [totalPrice, setTotalPrice] = useState(getLocalTotalPrice());
  const [totalShippingCharge, setTotalShippingCharge] = useState(
    getLocalTotalShippingCharge()
  )
  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json"
    )
      .then((data) => data.json())
      .then((res) => {
        for(let i=0;i < cart.length;i++){
          res.map(item => {
            if(item.id === cart[i].id){
              item.quantity = cart[i].quantity
            }
          })
        }
        setProducts(res)
      });
  }, [cart]);

  const handleAddToCart = (props) => {
    
    let newCart = []

    const exists = cart.find(item => item.id ===  props.id)

    if(!exists){
      props.quantity = 1
      newCart = [...cart, props]
    }
    else{
      const rest = cart.filter(item => item.id !== props.id)
      exists.quantity = exists.quantity + 1
      newCart = [...rest,exists]
    }
    
    
    const price = newCart.reduce((total,price) => {return total = total+(price.quantity*price.price)},0)
    
    setCart(newCart)
    setTotalPrice(price);
    setTotalShippingCharge(totalShippingCharge + props.shipping);

    console.log(newCart);

  };

  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
    setTotalShippingCharge(0);
  };

  useEffect(() => {
    localStorage.setItem("cartLength", JSON.stringify(cart));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    localStorage.setItem(
      "totalShippingCharge",
      JSON.stringify(totalShippingCharge)
    );
  }, [cart, totalPrice, totalShippingCharge])
  

  return (
    <>
      <div className="shop-container">
        <div className="products-container">
          {products.map((product) => (
            <Products
              key={product.id}
              data={product}
              handleAddToCart={handleAddToCart}
            ></Products>
          ))}
        </div>
        <div className="order-summary">
          <h1>Order Summary </h1>
          {/* <p>Selected items: {cart.length}</p> */}
          {/* {    console.log("this is from shop", cart)} */}
          <p>Selected items: {cart.reduce((prev,curr) => {return prev = curr.quantity+prev},0)}</p>
          <p>Price: ${totalPrice}</p>
          <p>Total Shipping Charge: ${totalShippingCharge}</p>
          <h3>Grand Total: ${totalPrice + totalShippingCharge}</h3>
          <button onClick={clearCart} className="clear-cart">
            Clear Cart
          </button>
          <Link to="/orders"><button className="btn-review-order">Order Review</button></Link>
        </div>
      </div>
    </>
  );
};

export default Shop;
