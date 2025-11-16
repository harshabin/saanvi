
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { DashboardIcon, InventoryIcon, OrdersIcon, SuppliersIcon } from '../../components/icons/Icons';

const AdminLayout: React.FC = () => {
    const navLinks = [
        { to: '/admin/dashboard', icon: <DashboardIcon />, label: 'Dashboard' },
        { to: '/admin/inventory', icon: <InventoryIcon />, label: 'Inventory' },
        { to: '/admin/orders', icon: <OrdersIcon />, label: 'Orders' },
        { to: '/admin/suppliers', icon: <SuppliersIcon />, label: 'Suppliers' },
        { to: '/', icon: null, label: '← Back to Store' },
    ];

    const activeStyle = {
        backgroundColor: '#1a237e',
        color: 'white',
    };

    return (
        <div className="flex h-screen bg-gray-100">
            <aside className="w-64 bg-neutral-dark text-gray-200 flex flex-col">
                <div className="h-16 flex items-center justify-center bg-black/20">
                    <h1 className="text-xl font-bold tracking-wider">Admin Panel</h1>
                </div>
                <nav className="flex-1 px-4 py-4 space-y-2">
                    {navLinks.map(({ to, icon, label }) => (
                         <NavLink
                            key={to}
                            to={to}
                            end={to === "/admin/dashboard"}
                            className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-primary-dark hover:text-white transition-colors"
                            style={({ isActive }) => isActive ? activeStyle : undefined}
                         >
                            {icon}
                            <span>{label}</span>
                        </NavLink>
                    ))}
                </nav>
            </aside>
            <div className="flex-1 flex flex-col overflow-hidden">
                <header className="bg-white shadow-sm h-16 flex items-center px-6 justify-between">
                     <h2 className="text-xl font-semibold text-gray-700">Sanvi Creation Management</h2>
                </header>
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
