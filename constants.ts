
import { Product, Order, Supplier, SalesData } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { id: 1, name: 'Classic Blue T-Shirt', description: 'A comfortable and stylish 100% cotton t-shirt.', price: 25.00, imageUrl: 'https://picsum.photos/seed/product1/600/800', category: 'Tops', stock: 50 },
  { id: 2, name: 'Slim Fit Denim Jeans', description: 'Modern slim fit jeans, perfect for any casual occasion.', price: 75.00, imageUrl: 'https://picsum.photos/seed/product2/600/800', category: 'Bottoms', stock: 30 },
  { id: 3, name: 'Leather Biker Jacket', description: 'A timeless piece, this genuine leather jacket adds an edge to any outfit.', price: 250.00, imageUrl: 'https://picsum.photos/seed/product3/600/800', category: 'Outerwear', stock: 15 },
  { id: 4, name: 'V-Neck Cashmere Sweater', description: 'Luxuriously soft and warm, made from 100% pure cashmere.', price: 120.00, imageUrl: 'https://picsum.photos/seed/product4/600/800', category: 'Tops', stock: 25 },
  { id: 5, name: 'Chino Shorts', description: 'Breathable and versatile chino shorts for warm weather.', price: 45.00, imageUrl: 'https://picsum.photos/seed/product5/600/800', category: 'Bottoms', stock: 40 },
  { id: 6, name: 'Wool Peacoat', description: 'A classic double-breasted peacoat to keep you warm in style.', price: 180.00, imageUrl: 'https://picsum.photos/seed/product6/600/800', category: 'Outerwear', stock: 20 },
  { id: 7, name: 'Linen Button-Up Shirt', description: 'Lightweight and airy, perfect for summer days or vacation.', price: 60.00, imageUrl: 'https://picsum.photos/seed/product7/600/800', category: 'Tops', stock: 35 },
  { id: 8, name: 'Cargo Pants', description: 'Durable and functional cargo pants with plenty of pocket space.', price: 65.00, imageUrl: 'https://picsum.photos/seed/product8/600/800', category: 'Bottoms', stock: 28 },
];

export const MOCK_ORDERS: Order[] = [
  { id: 'ORD-001', customerName: 'Harsha vardhan N', date: '2024-08-01', total: 100.00, status: 'Delivered', items: [{ product: MOCK_PRODUCTS[0], quantity: 1 }, { product: MOCK_PRODUCTS[1], quantity: 1 }] },
  { id: 'ORD-002', customerName: 'Twinkle Tanya Britto', date: '2024-08-02', total: 250.00, status: 'Shipped', items: [{ product: MOCK_PRODUCTS[2], quantity: 1 }] },
  { id: 'ORD-003', customerName: 'Amar K', date: '2024-08-03', total: 90.00, status: 'Pending', items: [{ product: MOCK_PRODUCTS[4], quantity: 2 }] },
  { id: 'ORD-004', customerName: 'Jane Smith', date: '2024-08-04', total: 180.00, status: 'Delivered', items: [{ product: MOCK_PRODUCTS[3], quantity: 1 }, { product: MOCK_PRODUCTS[6], quantity: 1 }] },
];

export const MOCK_SUPPLIERS: Supplier[] = [
    { id: 1, name: 'Bangalore Textiles Co.', contactPerson: 'Ravi Kumar', email: 'ravi@bangaloretextiles.com', phone: '987-654-3210' },
    { id: 2, name: 'Karnataka Garments', contactPerson: 'Priya Singh', email: 'priya@karnatakagarments.com', phone: '876-543-2109' },
    { id: 3, name: 'Deccan Apparel', contactPerson: 'Anil Desai', email: 'anil@deccanapparel.net', phone: '765-432-1098' },
];

export const MOCK_SALES_DATA: SalesData[] = [
    { month: 'Mar', sales: 2400 },
    { month: 'Apr', sales: 1398 },
    { month: 'May', sales: 9800 },
    { month: 'Jun', sales: 3908 },
    { month: 'Jul', sales: 4800 },
    { month: 'Aug', sales: 3800 },
];
