import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImg from '../../images/giphy.gif'

const Review = () => {
    const [cart, setCart] = useState([]);
    const [order, setOrder] = useState([false]);

    const handleOrder = () => {
        setCart([]);
        setOrder(true)
        processOrder()
        
    }

    const handleRemoveItem = (productKey) => {
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    useEffect(() =>{

        const saveData = getDatabaseCart();
        const productKey = Object.keys(saveData);
        const cartProduct =  productKey.map(key =>{
            const product = fakeData.find(pd => pd.key === key)
            product.quantity = saveData[key]
            return product
        })
        setCart(cartProduct);

    }, [])

    let thanks;
    if(order === true) {
        thanks = <img src={happyImg} alt=""/>
    }

    return (
        <div className="shop-container">
             <div className="product-container">
            <h1>Order review</h1>
            {cart.map(pd =><ReviewItem
                handleRemoveItem={handleRemoveItem}
                product={pd}
                key={pd.key}
            ></ReviewItem>)}
            {thanks}
        </div>
        <div className="card-container">
                <Cart cart={cart}>
                    <button onClick={handleOrder}>Placed Order</button>
                </Cart>
           </div>
        </div>
    );
};

export default Review;