
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../types';
import toast from 'react-hot-toast';

interface CheckoutPageProps {
  cart: CartItem[];
  clearCart: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing and invoice generation
    setTimeout(() => {
      toast.success('Order placed successfully! A confirmation has been sent.');
      clearCart();
      setIsProcessing(false);
      navigate('/');
    }, 2000);
  };
  
  if(cart.length === 0 && !isProcessing) {
      navigate('/');
      return null;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
          <form className="space-y-4">
            <input type="text" placeholder="Full Name" className="w-full p-3 border rounded-md" required />
            <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-md" required />
            <input type="text" placeholder="Shipping Address" className="w-full p-3 border rounded-md" required />
            <div className="flex space-x-4">
              <input type="text" placeholder="City" className="w-1/2 p-3 border rounded-md" required />
              <input type="text" placeholder="Postal Code" className="w-1/2 p-3 border rounded-md" required />
            </div>
          </form>
          
          <h2 className="text-xl font-bold mt-8 mb-6">Payment Details</h2>
           <form className="space-y-4">
            <input type="text" placeholder="Card Number" className="w-full p-3 border rounded-md" required />
            <div className="flex space-x-4">
              <input type="text" placeholder="MM / YY" className="w-1/2 p-3 border rounded-md" required />
              <input type="text" placeholder="CVC" className="w-1/2 p-3 border rounded-md" required />
            </div>
           </form>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md h-fit">
          <h2 className="text-xl font-bold mb-6">Your Order</h2>
          <div className="space-y-4">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="flex justify-between items-center">
                <div className="flex items-center space-x-3">
                  <img src={product.imageUrl} alt={product.name} className="w-12 h-14 object-cover rounded"/>
                  <div>
                    <p className="font-semibold">{product.name}</p>
                    <p className="text-sm text-gray-500">Qty: {quantity}</p>
                  </div>
                </div>
                <span className="font-medium">${(product.price * quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t space-y-2">
            <div className="flex justify-between"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="flex justify-between"><span>Shipping</span><span>Free</span></div>
            <div className="flex justify-between font-bold text-lg mt-2"><span>Total</span><span>${subtotal.toFixed(2)}</span></div>
          </div>
          <button
            onClick={handleCheckout}
            disabled={isProcessing}
            className="w-full mt-6 bg-secondary text-primary-dark font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
