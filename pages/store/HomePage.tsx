
import React, { useState, useMemo } from 'react';
import ProductCard from '../../components/ProductCard';
import { Product } from '../../types';

interface HomePageProps {
  products: Product[];
  addToCart: (product: Product, quantity: number) => void;
}

const HomePage: React.FC<HomePageProps> = ({ products, addToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = useMemo(() => ['All', ...new Set(products.map(p => p.category))], [products]);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') {
      return products;
    }
    return products.filter(p => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-primary">Our Collection</h1>
        <p className="text-lg text-gray-600 mt-2">Discover the latest trends from Sanvi Creation</p>
      </div>

      <div className="mb-8 flex justify-center space-x-2 md:space-x-4">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full font-semibold transition-colors text-sm md:text-base ${
              selectedCategory === category
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-primary hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
