import React from 'react';
import '../Products/Product.css'

const Products = (props) => {
    const {handleAddToCart} = props
    const {name,img,price,seller,ratings, quantity} = props.data

    return (
        <div className='product-container'>
            <img alt="" src={img}/>
            <div className="product-info">
                <p className="product-name">{name}</p>
                <p className="product-price">Price: ${price}</p>
                <p className='manufacturer'><small>Manufacturer: {seller}</small></p>
                <p className='rating'><small>Rating: {ratings}</small></p>
                <p><small>Quantity: {quantity}</small></p>
            </div>
            <button onClick={() => handleAddToCart(props.data)} className="remove-from-cart">Remove From Cart</button>
        </div>
    );
};

export default Products;