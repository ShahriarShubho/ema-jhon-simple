import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total, product) => total + product.price, 0)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const element = cart[i];
        total = total + element.price       
    }

    let shipping = 0;
    if(total <= 0){
        shipping = 0;
    }
    else if(total < 35){
        shipping = 50;
    }else if( total < 200){
        shipping = 100;
    }else{
        shipping = 0;
    }
   const tex = Math.round(total * .10)
   const grandTotal = Math.round(total + shipping + tex)
    return (
        <div>
            <h3>Order Summary</h3>
            <p>Order Items : {cart.length}</p>
            <p>Product Price : {total}</p>
            <p>Shipping Charge : {shipping}</p>
            <p>tex + vat : {tex}</p>
            <strong>Grand Total : {grandTotal}</strong>
        </div>
    );
};

export default Cart;