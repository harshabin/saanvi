
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 group">
      <Link to={`/product/${product.id}`} className="block">
        <img src={product.imageUrl} alt={product.name} className="w-full h-80 object-cover" />
      </Link>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-neutral-dark truncate group-hover:text-primary transition-colors">
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="text-gray-500 text-sm mt-1">{product.category}</p>
        <div className="flex justify-between items-center mt-4">
          <span className="text-xl font-bold text-primary">${product.price.toFixed(2)}</span>
          <button
            onClick={() => onAddToCart(product, 1)}
            className="bg-secondary text-primary-dark font-semibold px-4 py-2 rounded-full hover:bg-yellow-500 transition-colors transform hover:scale-105"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
