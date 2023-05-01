import React, { useEffect, useState } from 'react';
import './Shop.css'
import Products from '../Products/Products';

const Shop = () => {
    const [products,setProducts] = useState([])
    const [cart,setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalShippingCharge,setTotalShippingCharge] = useState(0)

    useEffect(() => {
        fetch('https://raw.githubusercontent.com/ProgrammingHero1/ema-john-resources/main/fakeData/products.json')
        .then(data => data.json())
        .then(res => setProducts(res))
    },[])

    const handleAddToCart = (props) => {
        console.log(props);
        const newCart = [...cart, props]
        setCart(newCart)
        // console.log(props.price);
        // console.log(totalPrice);
        setTotalPrice(totalPrice + props.price)
        setTotalShippingCharge(totalShippingCharge + props.shipping)
    }

    localStorage.setItem('price',23)

    const clearCart = () => {
        setCart([])
        setTotalPrice(0)
        setTotalShippingCharge(0)
    }

    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Products 
                        key = {product.id}
                        data = {product}
                        handleAddToCart = {handleAddToCart}
                        ></Products>)
                }
            </div>
            <div className='order-summary'>
                <h1>Order Summary </h1>
                <p>Selected items: {cart.length}</p>
                <p>Price: ${totalPrice}</p>
                <p>Total Shipping Charge: ${totalShippingCharge}</p>
                <h3>Grand Total: ${totalPrice + totalShippingCharge}</h3>
                <button onClick={clearCart} className='clear-cart'>Clear Cart</button>
            </div>
            
        </div>
    );
};

export default Shop;