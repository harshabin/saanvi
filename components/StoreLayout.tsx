
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { ShoppingBagIcon, SparklesIcon } from './icons/Icons';

interface StoreLayoutProps {
  cartItemCount: number;
}

const StoreLayout: React.FC<StoreLayoutProps> = ({ cartItemCount }) => {
  const activeLinkStyle = {
    color: '#ffab40',
    textDecoration: 'underline',
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-primary shadow-lg sticky top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <NavLink to="/" className="text-2xl font-bold text-white tracking-wider">
            Sanvi Creation
          </NavLink>
          <div className="flex items-center space-x-6">
            <NavLink
              to="/"
              className="text-white hover:text-secondary transition-colors"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              Home
            </NavLink>
            <NavLink
              to="/style-advisor"
              className="text-white hover:text-secondary transition-colors flex items-center gap-1"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              <SparklesIcon /> AI Stylist
            </NavLink>
             <NavLink
              to="/admin"
              className="text-white hover:text-secondary transition-colors"
            >
              Admin
            </NavLink>
            <NavLink to="/cart" className="relative text-white hover:text-secondary transition-colors">
              <ShoppingBagIcon />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-secondary text-primary-dark text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </NavLink>
          </div>
        </nav>
      </header>
      <main className="flex-grow">
        <Outlet />
      </main>
      <footer className="bg-neutral-dark text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <p>&copy; {new Date().getFullYear()} Sanvi Creation. All rights reserved.</p>
          <p className="text-sm text-gray-400">#61, 2nd Floor, Karekallu, Kamakshipalya, Near Shardha Colony Bus Stop, Banglore, Karnataka</p>
        </div>
      </footer>
    </div>
  );
};

export default StoreLayout;
