import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css';

const Product = (props) => {
    const {name, img, seller, price, stock} = props.product
    return (
        <div className="product-information">
            <div>
            <img src={img} alt=""/> 
            </div>
            <div className="product">
                <h4 className="product-name">{name}</h4>
                <p>By : {seller}</p>
                <strong>Price : ${price}</strong>
                <p>Available : {stock}</p>
                <button onClick={ () => props.handleAddProduct(props.product)} className="shopping-cart"><FontAwesomeIcon icon={faShoppingCart}/> add to card</button>
            </div>

        </div>
    );
};

export default Product;