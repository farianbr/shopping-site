import React, { useEffect, useState } from "react";
import "./Shop.css";
import Products from "../Products/Products";

const getLocalCartLength = () => {
  let cartLengthDb = localStorage.getItem("cartLength");

  if (cartLengthDb) {
    return JSON.parse(localStorage.getItem("cartLength"));
  } else {
    return [];
  }
};
const getLocalTotalPrice = () => {
  let LocalTotalPrice = localStorage.getItem("totalPrice");

  if (LocalTotalPrice) {
    return JSON.parse(localStorage.getItem("totalPrice"));
  } else {
    return 0;
  }
};
const getLocalTotalShippingCharge = () => {
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
  );

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json"
    )
      .then((data) => data.json())
      .then((res) => setProducts(res));
  }, []);

  const handleAddToCart = (props) => {
    // console.log(props);
    const newCart = [...cart, props];
    setCart(newCart);
    // console.log(props.price);
    // console.log(totalPrice);
    setTotalPrice(totalPrice + props.price);
    setTotalShippingCharge(totalShippingCharge + props.shipping);
  };

  //   localStorage.setItem("price", 2333);

  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
    setTotalShippingCharge(0);
  };

  useEffect(() => {
    console.log("hello from local storage");
    localStorage.setItem("cartLength", JSON.stringify(cart));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    localStorage.setItem(
      "totalShippingCharge",
      JSON.stringify(totalShippingCharge)
    );
  }, [cart, totalPrice, totalShippingCharge]);

  //   useEffect(() => {
  //     // const cartLengthDb = JSON.parse(localStorage.getItem("cartLength"));
  //     // setCart(cartLengthDb);
  //     const totalPriceDb = JSON.parse(localStorage.getItem("totalPrice"));
  //     setTotalPrice(totalPriceDb);
  //     const totalShippingChargeDb = JSON.parse(
  //       localStorage.getItem("totalShippingCharge")
  //     );
  //     setTotalShippingCharge(totalShippingChargeDb);
  //   }, []);

  return (
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
        <p>Selected items: {cart.length}</p>
        <p>Price: ${totalPrice}</p>
        <p>Total Shipping Charge: ${totalShippingCharge}</p>
        <h3>Grand Total: ${totalPrice + totalShippingCharge}</h3>
        <button onClick={clearCart} className="clear-cart">
          Clear Cart
        </button>
      </div>
    </div>
  );
};

export default Shop;
