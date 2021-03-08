import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import Product from '../Products/Product';
import './Shop.css'
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProduct] = useState(first10);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKey = Object.keys(saveCart);
        const previousCart = productKey.map(key => {
        const product = fakeData.find(pd => pd.key === key);
        product.quantity = saveCart[key];
        return product;
        })
        setCart(previousCart)
    }, [])

    const handleAddProduct =(product) =>{
        const sameProduct = cart.find(pd => pd.key === product.key);
        let count = 1
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== product.key);
            newCart= [...others, sameProduct]
        }else{
            product.quantity = 1;
             newCart = [...cart, product]
        }   
        setCart(newCart);
        addToDatabaseCart(product.key, count)
    }
    
    return (
        <div className="shop-container">
            <div className="product-container">

               {products.map(product =><Product
               key={product.key} 
               showAddToCart={true}
                handleAddProduct={handleAddProduct}
                 product= {product}></Product>)}

            </div>

           <div className="card-container">
                <Cart cart={cart}>
                <Link to="/review"><button>Order Review</button></Link>
                </Cart>
           </div>
        </div>
    );
};

export default Shop;