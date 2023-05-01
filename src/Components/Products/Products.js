import React from 'react';
import './Product.css'

const Products = (props) => {
    const {handleAddToCart} = props
    const {name,img,price,seller,ratings} = props.data

    return (
        <div className='product-container'>
            <img src={img}/>
            <div className="product-info">
                <p className="product-name">{name}</p>
                <p className="product-price">Price: ${price}</p>
                <p className='manufacturer'><small>Manufacturer: {seller}</small></p>
                <p className='rating'><small>Rating: {ratings}</small></p>
            </div>
            <button onClick={() => handleAddToCart(props.data)} className="add-to-cart">Add to Cart</button>
        </div>
    );
};

export default Products;