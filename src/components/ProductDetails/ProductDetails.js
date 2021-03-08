import React from 'react';
import { useParams } from 'react-router-dom';
import fakeData from '../../fakeData';
import Product from '../Products/Product';

const ProductDetails = () => {
    const {productKey} = useParams()
    const product =fakeData.find(products => products.key === productKey)
    return (
        <div>
           <h1>{productKey} description is coming</h1> 
           <Product showAddToCart={false} product={product}></Product>
        </div>
    );
};

export default ProductDetails;