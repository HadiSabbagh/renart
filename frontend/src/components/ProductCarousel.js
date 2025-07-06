import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

const ProductCarousel = ({ products }) => {
  return (
    <div className="w-full max-w-6xl mx-auto overflow-x-auto">
      <div className="flex space-x-4 w-max px-4 py-2">
        {products.map((product) => (
          <div key={product.name} className="w-64 flex-shrink-0">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
