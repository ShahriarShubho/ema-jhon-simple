import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart} from '@fortawesome/free-solid-svg-icons'
import './Product.css';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name, img, seller, price, stock, key} = props.product
    return (
        <div className="product-information">
            <div>
            <img src={img} alt=""/> 
            </div>
            <div className="product">
                <h4 className="product-name"><Link to={"/product/"+key}>{name}</Link></h4>
                <p>By : {seller}</p>
                <strong>Price : ${price}</strong>
                <p>Available : {stock}</p>
                {props.showAddToCart && <button onClick={ () => props.handleAddProduct(props.product)} className="shopping-cart"><FontAwesomeIcon icon={faShoppingCart}/> add to card</button>}
            </div>

        </div>
    );
};

export default Product;