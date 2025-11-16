
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MOCK_SALES_DATA, MOCK_ORDERS, MOCK_PRODUCTS } from '../../constants';

const DashboardPage: React.FC = () => {
    const totalSales = MOCK_ORDERS.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = MOCK_ORDERS.length;
    const totalProducts = MOCK_PRODUCTS.length;
    const lowStockItems = MOCK_PRODUCTS.filter(p => p.stock < 20).length;

    const StatCard = ({ title, value, color }: { title: string; value: string | number; color: string }) => (
        <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
            <p className={`text-3xl font-bold ${color}`}>{value}</p>
        </div>
    );

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Sales" value={`$${totalSales.toFixed(2)}`} color="text-green-500" />
                <StatCard title="Total Orders" value={totalOrders} color="text-blue-500" />
                <StatCard title="Total Products" value={totalProducts} color="text-purple-500" />
                <StatCard title="Low Stock Items" value={lowStockItems} color="text-red-500" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Monthly Sales</h2>
                 <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={MOCK_SALES_DATA}
                        margin={{
                            top: 5, right: 30, left: 20, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="sales" fill="#1a237e" />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default DashboardPage;
