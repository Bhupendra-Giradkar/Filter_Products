import React from 'react';

const ProductDetail = ({ product }) => {
    if (!product) return null;

    return (
        <div className="modal">
            <h2>{product.title}</h2>
            <p>Price: {product.price}</p>
            <p>Popularity: {product.popularity}</p>
            <p>Description: {product.description || 'No description available.'}</p>
        </div>
    );
};

export default ProductDetail;
