
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../../types';

interface ProductDetailPageProps {
  products: Product[];
  addToCart: (product: Product, quantity: number) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ products, addToCart }) => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-8 text-center">
        <h2 className="text-2xl font-bold">Product not found</h2>
        <Link to="/" className="text-primary hover:underline mt-4 inline-block">
          &larr; Back to shop
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (quantity > 0) {
      addToCart(product, quantity);
    }
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <img src={product.imageUrl} alt={product.name} className="w-full h-auto rounded-lg shadow-2xl" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-primary mb-2">{product.name}</h1>
          <p className="text-gray-500 text-lg mb-4">{product.category}</p>
          <p className="text-3xl font-light text-neutral-dark mb-6">${product.price.toFixed(2)}</p>
          <p className="text-gray-700 leading-relaxed mb-8">{product.description}</p>
          
          <div className="flex items-center space-x-4 mb-8">
            <label htmlFor="quantity" className="font-semibold">Quantity:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              max={product.stock}
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              className="w-20 p-2 border border-gray-300 rounded-md text-center"
            />
             <span className="text-gray-500">({product.stock} in stock)</span>
          </div>
          
          <button
            onClick={handleAddToCart}
            className="w-full bg-secondary text-primary-dark font-bold py-3 px-6 rounded-lg hover:bg-yellow-500 transition-transform transform hover:scale-105 shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
