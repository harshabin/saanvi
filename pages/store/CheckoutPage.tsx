import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem } from '../../types';
import toast from 'react-hot-toast';
import { addOrder } from '../../services/mockApiService';

interface CheckoutPageProps {
  cart: CartItem[];
  clearCart: () => void;
  onOrderPlaced: () => Promise<void>;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ cart, clearCart, onOrderPlaced }) => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [customerName, setCustomerName] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim()) {
        toast.error("Please enter your full name.");
        return;
    }
    
    setIsProcessing(true);
    try {
      await addOrder(customerName, cart);
      toast.success('Order placed successfully! A confirmation has been sent.');
      clearCart();
      await onOrderPlaced(); // Refetch products to update stock globally
      navigate('/');
    } catch (error) {
      toast.error("There was an issue placing your order. Please try again.");
      console.error("Checkout error:", error);
    } finally {
        setIsProcessing(false);
    }
  };
  
  if(cart.length === 0 && !isProcessing) {
      navigate('/');
      return null;
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <form onSubmit={handleCheckout}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Full Name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full p-3 border rounded-md" required />
              <input type="email" placeholder="Email Address" className="w-full p-3 border rounded-md" required />
              <input type="text" placeholder="Shipping Address" className="w-full p-3 border rounded-md" required />
              <div className="flex space-x-4">
                <input type="text" placeholder="City" className="w-1/2 p-3 border rounded-md" required />
                <input type="text" placeholder="Postal Code" className="w-1/2 p-3 border rounded-md" required />
              </div>
            </div>
            
            <h2 className="text-xl font-bold mt-8 mb-6">Payment Details</h2>
            <div className="space-y-4">
              <input type="text" placeholder="Card Number" className="w-full p-3 border rounded-md" required />
              <div className="flex space-x-4">
                <input type="text" placeholder="MM / YY" className="w-1/2 p-3 border rounded-md" required />
                <input type="text" placeholder="CVC" className="w-1/2 p-3 border rounded-md" required />
              </div>
            </div>
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
              type="submit"
              disabled={isProcessing}
              className="w-full mt-6 bg-secondary text-primary-dark font-bold py-3 rounded-lg hover:bg-yellow-500 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isProcessing ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
