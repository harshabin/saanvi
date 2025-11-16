
import React from 'react';
import { Link } from 'react-router-dom';
import { CartItem } from '../../types';
import { TrashIcon } from '../../components/icons/Icons';

interface CartPageProps {
  cart: CartItem[];
  updateCartQuantity: (productId: number, quantity: number) => void;
}

const CartPage: React.FC<CartPageProps> = ({ cart, updateCartQuantity }) => {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-6 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link to="/" className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary-dark transition-colors">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
          {cart.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center justify-between py-4 border-b last:border-b-0">
              <div className="flex items-center space-x-4">
                <img src={product.imageUrl} alt={product.name} className="w-20 h-24 object-cover rounded-md" />
                <div>
                  <h3 className="font-semibold">{product.name}</h3>
                  <p className="text-gray-500 text-sm">${product.price.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => updateCartQuantity(product.id, Number(e.target.value))}
                  className="w-16 p-2 border border-gray-300 rounded-md text-center"
                />
                <button
                  onClick={() => updateCartQuantity(product.id, 0)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon />
                </button>
              </div>
              <div className="font-semibold w-24 text-right">
                ${(product.price * quantity).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-bold mb-4 border-b pb-2">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Shipping</span>
            <span className="font-semibold">Free</span>
          </div>
          <div className="flex justify-between font-bold text-lg pt-2 border-t mt-2">
            <span>Total</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <Link to="/checkout">
            <button className="w-full mt-6 bg-secondary text-primary-dark font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
