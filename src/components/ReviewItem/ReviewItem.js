import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price} = props.product
    return (
        <div>
            <h1>this is review product item</h1>
            <h4>{name}</h4>
            <p>Price {price}</p>
            <p>Quantity : {quantity}</p>
            <button onClick={() =>props.handleRemoveItem(key)}>Remove Item</button>
        </div>
    );
};

export default ReviewItem;