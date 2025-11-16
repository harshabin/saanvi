import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getSalesData, getOrders, getProducts } from '../../services/mockApiService';
import { SalesData } from '../../types';
import toast from 'react-hot-toast';

const StatCard = ({ title, value, color }: { title: string; value: string | number; color: string }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </div>
);

const DashboardPage: React.FC = () => {
    const [stats, setStats] = useState({ totalSales: 0, totalOrders: 0, totalProducts: 0, lowStockItems: 0 });
    const [salesData, setSalesData] = useState<SalesData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const [orders, products, sales] = await Promise.all([getOrders(), getProducts(), getSalesData()]);
                const totalSales = orders.reduce((sum, order) => sum + order.total, 0);
                const totalOrders = orders.length;
                const totalProducts = products.length;
                const lowStockItems = products.filter(p => p.stock < 20).length;
                setStats({ totalSales, totalOrders, totalProducts, lowStockItems });
                setSalesData(sales);
            } catch (error) {
                toast.error("Failed to load dashboard data.");
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
             <div className="flex justify-center items-center h-full">
                <div className="w-10 h-10 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <StatCard title="Total Sales" value={`$${stats.totalSales.toFixed(2)}`} color="text-green-500" />
                <StatCard title="Total Orders" value={stats.totalOrders} color="text-blue-500" />
                <StatCard title="Total Products" value={stats.totalProducts} color="text-purple-500" />
                <StatCard title="Low Stock Items" value={stats.lowStockItems} color="text-red-500" />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">Monthly Sales</h2>
                 <ResponsiveContainer width="100%" height={400}>
                    <BarChart
                        data={salesData}
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
